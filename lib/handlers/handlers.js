// Dependencies
var _data = require('./../data');
var users = require('./users');
var cart = require('./cart');
var payment = require('./payment');

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

// cart 
handlers.cart = cart.cart;
handlers._cart = cart._cart;

// payment

handlers.payment = payment.payment;
handlers._payment = payment._payment;



// Export the module
module.exports = handlers;