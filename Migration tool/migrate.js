/*!
 * ==========================================================
 * Migration tool 1.0.0, build 1
 * ==========================================================
 * Copyright 2021 XMPie, LTD.
 * ==========================================================
 */
const { JSDOM } = require('jsdom')
const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const { controllers, directives, version } = require('./config')
const fsPromises = fs.promises;

const errorOutput = (error) => console.log(`ERROR :: ${error}`)

const removeFilePart = dirname => path.parse(dirname).dir;

const baseName = filename => path.parse(filename).base;

const OLD_NAME_LIB = 'xmp.min.js'
const NEW_NAME_LIB = 'xmpl.min.js'

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
      const elements = document.body.querySelectorAll(`[${attr}]`)
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
  + `${notSupportedAttr.join('\n')}\n`
  + `not yet supported in version ${version}\n`
  + '* ==========================================================  -->\n\n';
}

function addFileComment(notSupportedAttr, htmlDoc) {
  const unsupported = unsupportedComment(notSupportedAttr)
  return unsupported + htmlDoc
}

function updateVersion(string) {
  const reBuild = /xmpl\/([a-zA-Z0-9-. ]*)\/xmp\/js/ig
  return string.replace(reBuild, `XMPL-NG/${version}`).replace(OLD_NAME_LIB, NEW_NAME_LIB)
}

async function addLogs(baseDir, file, notSupportedAttr) {
  const base = path.join(baseDir, '..', 'xmplNG')
  const comments = `${file.path}\n${unsupportedComment(notSupportedAttr)}\n`;
  try {
    await fsPromises.writeFile(`${base}/log.txt`, comments, { flag: 'a+' })
    console.log('Logs were added')
  } catch (error) {
    console.log(error)
  }
}

async function main(file, baseDir) {
  const html = await fsp.readFile(file.path, 'utf8')
  const { window } = new JSDOM(html)
  const { document } = window

  const ngControllerAttr = document.body.getAttribute('ng-controller')
  controllers
    .forEach(({ ngController, controller }) => ngController === ngControllerAttr && document.body.setAttribute(controller, ''))

  const ngAppController = document.querySelector('[ng-app="xmp.app"]')
  if (ngAppController) {
    ngAppController.removeAttribute('ng-app')
  }

  document.body.removeAttribute('ng-controller')

  const nodes = document.body

  /**
   * Insert comments for not supported xmp attribute
   */
  const notSupportedAttr = insertComments(document, nodes)

  /**
   * Convert Angular syntax {{template}} to xmp-text directives
   */
  convertSyntaxText(document, nodes)
  const base = path.join(baseDir, '..', 'xmplNG', file.absolutePath)
  const htmlDoc = document.documentElement.outerHTML
  const newHTML = addFileComment(notSupportedAttr, htmlDoc)
  const newVersion = updateVersion(newHTML)
  try {
    await fsPromises.mkdir(base, { recursive: true })
    await fsPromises.writeFile(`${base}/${file.name}`, newVersion)
  } catch (error) {
    errorOutput(error)
  }
  await addLogs(baseDir, file, notSupportedAttr)
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

  if (stats.isDirectory()) {
    await walk(fileName)
    const getFileExtension = (name) => path.parse(name).ext;
    const onlyHtmlFiles = filesArr.filter(item => {
      const extension = getFileExtension(item.path)
      return extension.indexOf('html') > -1
    })

    onlyHtmlFiles.forEach(item => {
      main(item, fileName)
    })
  }

  if (stats.isFile()) {
    const fileConfig = {
      name: baseName(fileName),
      absolutePath: '',
      path: fileName,
    }
    main(fileConfig, removeFilePart(fileName))
  }
});
