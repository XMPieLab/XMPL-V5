/* eslint-disable no-restricted-syntax */
const { JSDOM } = require('jsdom')
const fs = require('fs-extra')
const path = require('path')
const fg = require('fast-glob')
const {
  controllers,
  directives,
  version,
  libUrl,
} = require('./config')

const errorOutput = (error) => console.log(`ERROR :: ${error}`)

const LIST_OF_NOT_SUPPORTED_ATTR = []

function expressionTest(str) {
  const expressionsRe = /{{(.*?)}}/gm
  return expressionsRe.test(str)
}

function wrapTemplate(template) {
  return expressionTest(template) ? template : `{{${template}}}`
}

function insertComments(document) {
  const adors = /xmp-(([a-zA-Z0-9-$]*))/ig
  const derectivesList = document.body.outerHTML.match(adors)
  const xmpAttr = derectivesList
    .filter(item => !directives.includes(item))
    .filter((it, i, arr) => arr.indexOf(it) === i)

  const notSupportedAttr = []
  if (xmpAttr.length > 0) {
    xmpAttr.forEach(attr => {
      const elements = document.querySelectorAll(`[${attr}]`)

      elements.forEach(el => {
        const parent = el.parentElement
        const commentBeforeAttr = document.createComment(`${attr} not yet supported in version ${version}`)
        parent.insertBefore(commentBeforeAttr, el)
        notSupportedAttr.push(attr)
      })
    })
  }

  return notSupportedAttr
}

function convertSyntaxText(document, node, includeWhitespaceNodes) {
  const textNodes = []
  const whitespace = /^\s*$/

  function getTextNodes(inner) {
    if (inner.nodeType === 3) {
      if (includeWhitespaceNodes || !whitespace.test(inner.nodeValue)) {
        const reCollectAdors = /xmp((\['r']\.?)|(\.r\.?))(([a-zA-Z0-9-$ ]+[["'}]?)|(\[['"].*?['"]]))/ig
        const match = wrapTemplate(inner.textContent).match(reCollectAdors)
        if (match && match.length) {
          const newEl = inner.parentNode.innerHTML.replace(/(\{{+|\}}+)/g, '').replace(reCollectAdors, '<span xmp-text="$&"></span>')
          // eslint-disable-next-line no-param-reassign
          inner.parentNode.innerHTML = newEl
        }
      }
    } else {
      Array.prototype.slice.call(inner.childNodes).forEach(el => {
        getTextNodes(el)
      })
    }
  }

  getTextNodes(node)

  return textNodes;
}

function unsupportedComment(notSupportedAttr) {
  return '<!-- ==========================================================\n'
  + `Not yet supported attributes in version ${version}:\n`
  + `${notSupportedAttr.join('\n')}\n`
  + '* ==========================================================  -->\n\n';
}

function addFileComment(notSupportedAttr, htmlDoc) {
  if (notSupportedAttr.length === 0) {
    return htmlDoc
  }

  const unsupported = unsupportedComment(notSupportedAttr)
  return unsupported + htmlDoc
}

function addLogs(baseDir) {
  if (LIST_OF_NOT_SUPPORTED_ATTR.length === 0) {
    return
  }
  const file = fs.createWriteStream(`${baseDir}/log.txt`);
  file.on('error', errorOutput)
  file.write(`[${new Date()}]\n`)
  LIST_OF_NOT_SUPPORTED_ATTR.forEach(value => {
    file.write(`Path :: ${value.path}\r\n`)
    file.write(`Attributes :: [${value.attr.join(', ')}]\r\n`)
    file.write('-------------------------------------------------------------------------------\n')
  });
  file.on('finish', () => {
    console.log('Logs were added')
  })
  file.end();
}

function convertRepeatValue(document) {
  const xmpRepeat = document.querySelectorAll('[xmp-repeat]')
  const expressionsRe = /{{(.*?)}}/gm
  xmpRepeat.forEach(item => {
    function callback(match) {
      const m = match.substring(2, match.length - 2)
      return `<span xmp-repeat-value="${m.replace(/"/g, "'")}"></span>`
    }

    // eslint-disable-next-line no-param-reassign
    item.innerHTML = item.outerHTML.replace(expressionsRe, callback)
  })
}

function updateVideoAdor(document) {
  const videos = document.querySelectorAll('video')
  videos.forEach(video => {
    const videoAdor = video.getAttribute('ng-if')

    if (videoAdor) {
      video.setAttribute('xmp-video', videoAdor)

      const source = video.querySelector('source')
      if (source) {
        source.removeAttribute('ng-src')
        source.setAttribute('xmp-src', videoAdor)
      }
    }
  })
}

async function main(currentPath) {
  const html = await fs.readFileSync(currentPath, 'utf8')
  const { window } = new JSDOM(html)
  const { document } = window

  const scriptTagLibrary = document.querySelector('[src$="/xmp/js/xmp.min.js"]')
  if (scriptTagLibrary) {
    scriptTagLibrary.setAttribute('src', libUrl)
  }

  const xmplConfig = document.querySelector('[src$="xmpcfg.js"]')
  if (xmplConfig) {
    const linkToConfig = xmplConfig.getAttribute('src')
    xmplConfig.remove()
    const parent = scriptTagLibrary.parentElement
    const newElement = document.createElement('script')
    newElement.setAttribute('src', linkToConfig)
    parent.insertBefore(newElement, scriptTagLibrary)
  }

  const scriptTagXMDesign = document.querySelector('[src$="/xmp/js/ucreateXMDesign.js"]')
  if (scriptTagXMDesign) {
    scriptTagXMDesign.remove()
  }

  const cssTagXMDesign = document.querySelector('[href$="/xmp/css/ucreateXMDesign.css"]')
  if (cssTagXMDesign) {
    cssTagXMDesign.remove()
  }

  const cssTagXmp = document.querySelector('[href$="/xmp/css/xmp.css"]')
  if (cssTagXmp) {
    cssTagXmp.remove()
  }

  const ngControllerAttr = document.body.getAttribute('ng-controller')
  controllers
    .forEach(({ ngController, controller }) => ngController === ngControllerAttr && document.body.setAttribute(controller, ''))

  const ngAppController = document.querySelector('[ng-app="xmp.app"]')
  if (ngAppController) {
    ngAppController.removeAttribute('ng-app')
  }

  document.body.removeAttribute('ng-controller')

  updateVideoAdor(document)

  const nodes = document.body

  /**
   * Insert comments for not supported xmp attribute
   */
  const notSupportedAttr = insertComments(document, nodes)

  /**
   * Convert Angular syntax {{template}} to xmp-text directives
   */
  convertSyntaxText(document, nodes)
  convertRepeatValue(document)
  const htmlDoc = document.documentElement.outerHTML.replace(/&quot;/g, "'")
  const newHTML = addFileComment(notSupportedAttr, htmlDoc)

  if (notSupportedAttr.length > 0) {
    LIST_OF_NOT_SUPPORTED_ATTR.push({
      attr: notSupportedAttr,
      path: currentPath,
    })
  }

  return newHTML
}

async function copyAndUpdateFile(src, dist, filename) {
  try {
    await fs.copy(src, filename ? `${dist}/${filename}` : dist)
    const entryPath = path.join(dist, '**/*.html').replace(/\\/g, '/')
    const entries = await fg([entryPath])
    for await (const entry of entries) {
      const newHTML = await main(entry)
      fs.writeFileSync(entry, newHTML)
    }
    await addLogs(dist)
  } catch (err) {
    console.error(err)
  }
}

function init() {
  const inputIndex = process.argv.indexOf('--input')
  let input = '';
  if (inputIndex === -1) {
    errorOutput('please provide input folder url')
    process.exit(0)
  }

  input = process.argv[inputIndex + 1]

  if (!input) {
    errorOutput('please provide input folder url')
    process.exit(0)
  }

  const outputIndex = process.argv.indexOf('--output');
  let outputSrcValue;
  if (outputIndex > -1) {
    outputSrcValue = process.argv[outputIndex + 1]
  }
  const output = outputSrcValue || path.join(input, '..', 'xmplNG')

  fs.lstat(input, async (err, stats) => {
    if (err) {
      errorOutput(err)
      process.exit(0)
    }

    if (stats.isFile()) {
      const filename = path.basename(input)
      copyAndUpdateFile(input, output, filename)
    } else {
      copyAndUpdateFile(input, output)
    }
  })
}

init()
