const { exec } = require("child_process")
const fs = require('fs')

const sidebar = `<!-- _sidebar.md -->
* [Start](/)
`
const title = /^\# (.*)/
const folderName = /\/(.*)\/(.*).md/
const fileName = /\/(.*).md/
const enter = '\n'
const notEmpty = l => l

const getFileTitle = (path) => {
  const h1 = fs.readFileSync(path, "utf8")
  .split(enter)
  .find(fileLine => fileLine.match(title))

  return [(h1 && h1.match(title)[1]) || path.match(folderName)[2], path.match(folderName)[1]]
}

const getFileTitleMainFolder = (path) => {
  const h1 = fs.readFileSync(path, "utf8")
  .split(enter)
  .find(fileLine => fileLine.match(title))

  return (h1 && h1.match(title)[1]) || path.match(fileName)[1]
}

exec('find ./*/*.md ./*.md', (error, fileList, err) => {
  let lastGroup = ''
  const lines = fileList
    .split(enter)
    .filter(notEmpty)
    .filter(s => s !== './README.md')
    .filter(s => !s.match(/\/_(.*).md/))

  const subFolders = lines
    .filter(l => l.match(/.\/.*\/.*.md/))
    .map(path => [path, getFileTitle(path)])
    .map(([path, [name, group]]) => {
      let result = ''
      if (group !== lastGroup) {
        lastGroup = group
        result += `* ${group}\n`
      }
      return result + `  * [${name}](${path})`
    })
    .join(enter)
  
  const mainFolders = lines
    .filter(l => !l.match(/.\/.*\/.*.md/))
    .map(path => [path, getFileTitleMainFolder(path)])
    .map(([path, name]) => `* [${name}](${path})`)
    .join(enter)

  console.log(sidebar + mainFolders + enter + subFolders)
})
