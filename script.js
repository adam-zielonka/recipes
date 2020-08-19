const fs = require("fs")
const { exec } = require("child_process")

exec("ls *.md -1a", (error, out, err) => {
  for (const i of out.split('\n').filter(a => a)) {
    const file = fs.readFileSync(i, "utf8").replace('  \r\n', '\r\n')
    if (i !== 'README.md') exec(`curl -s --data "language=pl-PL&text=${file}" http://languagetool:8010/v2/check`, (error, out, err) => {
      console.log(i)
      console.log(JSON.stringify(JSON.parse(out).matches, null, 4))
    })
  }
})
