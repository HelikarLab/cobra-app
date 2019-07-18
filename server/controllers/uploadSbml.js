const { PythonShell } = require('python-shell')
const fs = require('fs')

module.exports = async function(req, res) {
  const file = req.files.file

  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads')
  }

  const fileName = 'sbmlFile';
  fs.renameSync(file.path, `./uploads/${fileName}`);

  const options = {
    args: [fileName],
  };

  PythonShell.run('pythonScripts/sbmlParser.py', options, function(err, data) {
    if (err) {
      console.error(err)
      res.status(500).send('Something went wrong.')
    } else {
      //fs.unlinkSync('./uploads/' + file.name)
      res.status(200).send(data)
    }
  })
};
