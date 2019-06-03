const { PythonShell } = require('python-shell')
const fs = require('fs')

module.exports = async function (req, res) {

    console.log("success at 8080");

    if (req.files) {

      console.log(req.files)
      var file = req.files.file,
          filename = file.name,
          type = file.mimetype;

      var uploadpath =  'uploads/' + filename;
      file.mv(uploadpath,function(err){
        if(err){
          console.log("File Upload Failed",filename,err);
        }
        else {
          console.log("File Uploaded",filename);
        }
      });
      const options = {
        args: [filename]
      }


      PythonShell.run('sbmlParser.py', options, function (err, data) {
        if (err) {
          console.error(err)
          res.status(500).send('Something went wrong in the python script.')
        } else {
          fs.unlinkSync('./uploads/' + filename)
          res.status(200).json(data)
        }
      })

    }
    else {
      res.end();
    }

}
