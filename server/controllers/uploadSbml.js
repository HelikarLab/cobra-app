const { PythonShell } = require('python-shell')
const fs = require('fs')

module.exports = async function(req, res) {
  const file = req.files.file

  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads')
  }

  fs.renameSync(file.path, `./uploads/${file.name}`)

  const options = {
    args: [file.name],
  }

  PythonShell.run('sbmlParser.py', options, function(err, data) {
    if (err) {
      console.error(err)
      res.status(500).send('Something went wrong.')
    } else {
      fs.unlinkSync('./uploads/' + file.name)
      res.status(200).send(data)
    }
  })
}
