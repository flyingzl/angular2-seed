var config = {},
    cleanFolder = function(config) {
        var exec = require('child_process').exec,
            clear = config.clearBeforeBuild;
        clear && exec('rm -rf ' + config.output.path, function(err, out) {
            console.log(out);
            err && console.error(err);
        });
    };

config = require("./webpack.dev.config.js");

cleanFolder(config)


module.exports = config;
