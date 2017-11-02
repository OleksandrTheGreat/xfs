const
    fs = require("fs"),
    mkdir = require('./mkdir.js');

var
    copy = function(path, newPath, move) {

        if (!fs.existsSync(path)) {
            console.log('path "' + path + '" does not exist.')
            return;
        }

        if (fs.existsSync(newPath)) {
            console.log('path "' + newPath + '" already exists.')
            return;
        }

        var stat = fs.statSync(path);

        if (stat.isFile()) {

            fs.linkSync(path, newPath);

            if (move)
                fs.unlinkSync(path);

            return;
        }

        if (stat.isDirectory()) {

            var items = fs.readdirSync(path);

            mkdir.sync(newPath);

            items.forEach(function(item) {
                copy(path + "/" + item, newPath + "/" + item);
            });
        }
    };

exports.sync = copy;