const { PythonShell } = require('python-shell');
const fs = require('fs');

module.exports = async function (req, res) {

    try {
        fs.writeFile("./analysis/modelForEssentiality.json", Object.values(req.fields)[0], function (err) {
                if (err) throw err;
                console.log('complete');
            }
        );

        const options = {
            args: ['./uploads/sbmlFile', Object.values(req.fields)[0]]
        };

        PythonShell.run('pythonScripts/essentiality.py', options, function (err, data) {
            if (err) {
                console.error(err);
                res.status(500).send('Something went wrong!')
            } else {
                res.status(200).json(data)
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(404).send('Fatal Error');
    }
};
