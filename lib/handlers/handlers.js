// Dependencies
var _data = require('./../data.js');
var users = require('./users');

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

// tokens (already assigned to object in the /handlers/users.js file)
handlers.tokens = users.tokens;
handlers._tokens = users._tokens;

handlers.cart = users.cart;
handlers._cart = users._cart;

// Export the module
module.exports = handlers;