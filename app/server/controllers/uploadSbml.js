const { PythonShell } = require('python-shell')
const fs = require('fs')

module.exports = async function(req, res) {
  const file = req.file;

  const options = {
    args: [file.path],
  };

  PythonShell.run('pythonScripts/sbmlParser.py', options, function(err, data) {
    if (err) {
      console.error(err)
      res.status(500).send('Something went wrong.')
    } else {
      res.status(200).send(data)
    }
  })
};
