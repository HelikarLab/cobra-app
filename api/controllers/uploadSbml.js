const { PythonShell } = require('python-shell')


module.exports = async function (req, res) {

    console.log("success at 8080");

    if (req.files) {

      console.log(req.files)
      var file = req.files.file,
          name = file.name,
          type = file.mimetype;

      var uploadpath =  'uploads/' + name;
      file.mv(uploadpath,function(err){
        if(err){
          console.log("File Upload Failed",name,err);
        }
        else {
          console.log("File Uploaded",name);
        }
      });
      const options = {
        args: [name]
      }


      let test = PythonShell.run('sbmlParser.py', options, function (err, data) {
        if (err) {
          console.log("if error")
          console.error(err)
        } else {
          console.log("No error")
          console.log("nodejs :" + data)
        }
        res.json(data);
      })

    }
    else {
      res.end();
    }

}
