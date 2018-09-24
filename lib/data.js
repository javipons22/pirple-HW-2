// Dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

// Create lib object for CRUD methods
var lib = {};

// Set base directory
lib.baseDir = path.join(__dirname,'/../.data/');

// Create file (error if already exists)
lib.create = function(dir,file,data,callback){
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(err, fileDescriptor){
        if(!err && fileDescriptor){
            var stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor,stringData,function(err){
                if (!err) {
                    fs.close(fileDescriptor, function(err){
                        if (!err){
                            callback(false); // no error
                        } else {
                            callback('Error closing file');
                        }
                    });
                } else {
                    callback('Error writing to file');
                }
            });
        } else {
            callback('The file already exists');
        }
    });
};


// Read data from file
lib.read = function(dir,file,callback){
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function(err, data){
        if (!err & data) {
            var parsedData = helpers.parseJsonToObject(data);
            callback(false, parsedData);
        } else {
            callback(err, data);
        }
    });
};


// Export
module.exports = lib;