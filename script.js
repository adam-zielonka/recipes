const fs = require("fs")
const { exec } = require("child_process")

exec("ls *.md -1a", (error, out, err) => {
  for (const fileName of out.split('\n').filter(a => a)) {
    const file = fs.readFileSync(fileName, "utf8").replace('  \r\n', '\r\n')
    if (fileName !== 'README.md' && fileName !== 'SUMMARY.md') exec(`curl -s --data "language=pl-PL&text=${encodeURI(file)}" http://languagetool:8010/v2/check`, (error, out, err) => {
      console.log(fileName)
      console.log(JSON.stringify(JSON.parse(out).matches, null, 4))
    })
  }
})