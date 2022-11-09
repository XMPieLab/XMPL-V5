const { JSDOM } = require('jsdom')
const fs = require('fs')
const path = require('path')
const {
  controllers,
  directives,
  version,
  libUrl,
} = require('./config')
const fsPromises = fs.promises;

const errorOutput = (error) => console.log(`ERROR :: ${error}`)

const removeFilePart = dirname => path.parse(dirname).dir;

const baseName = filename => path.parse(filename).base;

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
          const span = document.createElement('span');
          span.setAttribute('xmp-text', inner.textContent)
          const parent = inner.parentNode
          inner.remove()
          parent.appendChild(span)
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
  const file = fs.createWriteStream(`${baseDir}/log.txt`);
  file.on('error', (error) => { console.log(error) });
  LIST_OF_NOT_SUPPORTED_ATTR.forEach(value => {
    file.write('Path ::\n')
    file.write(`${value.path}\r\n\n`)
    file.write('Attributes ::\n')
    value.attr.forEach(item => {
      file.write(`${item}\r\n`)
    })
    file.write('-------------------------------------------------------------------------------\n\n')
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
      return `<span xmp-repeat-value="${m}"></span>`
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

async function main(file, baseDir) {
  const html = await fs.readFileSync(file.path, 'utf8')
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
  const base = path.join(baseDir, file.absolutePath)
  const htmlDoc = document.documentElement.outerHTML
  const newHTML = addFileComment(notSupportedAttr, htmlDoc)

  try {
    if (!fs.existsSync(base)) {
      fs.mkdirSync(base);
    }
    fs.writeFileSync(`${base}/${file.name}`, newHTML)
  } catch (error) {
    errorOutput(error)
  }
  LIST_OF_NOT_SUPPORTED_ATTR.push({
    attr: notSupportedAttr,
    path: file.path,
  })
}

if (process.argv.length < 3) {
  errorOutput('please provide file name')
  process.exit(0)
}

const fileName = path.resolve(__filename, process.argv[2])

if (!fs.existsSync(fileName)) {
  errorOutput('file name doesn\'t exists')
  process.exit(0)
}

const filesArr = []
async function walk(dir) {
  const files = await fsPromises.readdir(dir)
  await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file)
    const stats = await fsPromises.lstat(filePath)

    if (stats.isDirectory()) {
      return walk(filePath)
    }
    if (stats.isFile()) {
      filesArr.push({
        name: file,
        absolutePath: removeFilePart(path.relative(fileName, filePath)),
        path: filePath,
      })
      return filePath
    }
  }))
}

// eslint-disable-next-line consistent-return
fs.lstat(fileName, async (err, stats) => {
  if (err) {
    errorOutput(err)
    process.exit(0)
  }

  const base = path.join(process.argv[2], '..', 'xmplNG');
  await fsPromises.mkdir(base, { recursive: true });

  if (stats.isDirectory()) {
    await walk(fileName)
    const getFileExtension = (name) => path.parse(name).ext;
    const onlyHtmlFiles = filesArr.filter(item => {
      const extension = getFileExtension(item.path)
      return extension.indexOf('html') > -1
    })

    if (onlyHtmlFiles.length === 0) {
      errorOutput('HTML files doesn\'t exists')
      process.exit(0)
    }

    await onlyHtmlFiles.forEach(async item => {
      await main(item, base)
    })

    addLogs(base)
  }

  if (stats.isFile()) {
    const fileConfig = {
      name: baseName(fileName),
      absolutePath: '',
      path: fileName,
    }
    await main(fileConfig, base)
  }
});
