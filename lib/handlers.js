// Dependencies
var _data = require('./data.js');


// Set handlers object for handler storage
var handlers = {};


// Set notFound handler 
handlers.notFound = function(data, callback){
    callback(404);
};


// Set hello handler
handlers.hello = function(data, callback){
    callback(200, { 'Welcome': 'Welcome, this is my first Assignment' });
};

// Set users handler to execute _users handler or return error 
handlers.users = function (data, callback){
    allowedMethods = ['get', 'post', 'put', 'delete'];
    if (allowedMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405,{'Error': 'method not allowed'});
    }
};

// Set _users handlers for get put post and delete
handlers._users = {};

// Users - post
// Required Fields : name, email address, and street address
handlers._users.post = function(data, callback){

    // Verify requirements
    var name = typeof(data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
    var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
    var streetAddress = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;

    if (name && email && streetAddress){
        // Check file does not already exist
        _data.read('users',email,function(err, data){
            // Create users object 

            var userObject = {
                'name' : name,
                'email' : email,
                'address' : streetAddress
            };

            // If there IS error (means file does not exist , continue)
            if(err) {
                _data.create('users',email, userObject, function(err){
                    if(!err){
                        callback(200)
                    } else {
                        callback(500, {'Error': 'Could not create user'});
                    }
                });
            } else {
                callback(400, {'Error': 'A user with that email already exists'});
            }
        });
    } else {
        callback(400, {'Error': 'Missing required fields'});
    }
};




// Export the module
module.exports = handlers;