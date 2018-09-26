// Dependencies
var _data = require('./../data.js');
var users = require('./users');
var tokens = require('./tokens');

// Set handlers object for handler storage
var handlers = {};

// Set notFound handler 
handlers.notFound = function(data, callback){
    callback(404);
};

// attach handlers required to handlers object

// users
handlers.users = users.users;
handlers._users = users._users;

// tokens
handlers.tokens = tokens.tokens;
handlers._tokens = tokens._tokens;


// Export the module
module.exports = handlers;