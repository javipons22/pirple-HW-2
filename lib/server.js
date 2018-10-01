/*
 * Homework Assignment #1
 * 
 */

// Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var handlers = require('./handlers/handlers');
var helpers = require('./helpers');
var config = require('./config');
var fs = require('fs');

// Create server object to associate methods and properties to be called in other file
var server = {};

// Instantiate the HTTP server
server.httpServer = http.createServer(function(req,res){
    server.unifiedServer(req,res);
});


// Instantiate the HTTPS server
server.httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};

server.httpsServer = https.createServer(server.httpsServerOptions,function(req,res){
    server.unifiedServer(req,res);
});

server.unifiedServer = function(req,res){
    // Retrieve the URL from the request and parse it using the url module
    var parsedUrl = url.parse(req.url, true); 


    // Retrieve the full path and trim it to only store the pathname for further matching with route name in route's object
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Retrieve the queryString and make it an object for further use when GET or DELETE methods pass it through
    var queryStringObject = parsedUrl.query;

    // Get the HTTP method to indicate handler what subhandler to use
    var method = req.method.toLowerCase();

    // Get the headers as an object
    var headers = req.headers;

    // Get the payload and parse it
    var decoder = new StringDecoder('utf-8');
    var buffer = ''; 

    req.on('data', function(data) {
         buffer += decoder.write(data);
    });

    req.on('end', function() {
        buffer += decoder.end();
        
         // If trimmed path available in routes object, return corresponding handler and store it in chosenHandler variable for further execution, if NOT available return notFound handler
        var chosenHandler = typeof(routes[trimmedPath]) !== 'undefined' ? routes[trimmedPath] : handlers.notFound;



        // All data obtained from the request into an object to pass it to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : helpers.parseJsonToObject(buffer)
        };


        
        // Execute the chosen handler 
        chosenHandler(data,function(statusCode, payload){
            
            // Set default status code to 200 in case of not present or different type
            var statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Set default payload value to empty object if not present
            var payload = typeof(payload) == 'object' ? payload : {};


            // Convert payload object to JSON String
            var payloadString = JSON.stringify(payload);


            // Write the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log Success or Error message to console

            statusCode == 404 ? console.log('Not found : 404 error code') : console.log('Returned request!');

        });
    });
};

// Set routes object for route matching with pathname and further assignment of handler
var routes = {
    users : handlers.users,
    tokens : handlers.tokens,
    cart : handlers.cart,
    pay : handlers.payment
};

// Create a function in the server Object that starts up the server in http and https
server.init = function(){
    // Start the HTTP server
    server.httpServer.listen(config.httpPort,function(){
        console.log('The HTTP server is running on port '+config.httpPort);
    });

    // Start the HTTPS server
    server.httpsServer.listen(config.httpsPort,function(){
        console.log('The HTTPS server is running on port '+config.httpsPort);
    });
};

// Export the server
module.exports = server;

