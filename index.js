/*
 * Homework Assignment #1
 * 
 */

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers');


// Create server and store it in variable for further startup
var server = http.createServer(function(req,res){

    // Retrieve the URL from the request and parse it using the url module
    var parsedUrl = url.parse(req.url); 


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
         
    
        // All data obtained from the request into an object to pass it to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : helpers.parseJsonToObject(buffer)
        };


        // If trimmed path available in routes object, return corresponding handler and store it in chosenHandler variable for further execution, if NOT available return notFound handler
        var chosenHandler = typeof(routes[trimmedPath]) !== 'undefined' ? routes[trimmedPath] : handlers.notFound;


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

            statusCode == 404 ? console.log('Not found : 404 error code') : console.log('Returned welcome message!');

        });
    });
});

// Start the server
server.listen(3000);

// Set routes object for route matching with pathname and further assignment of handler
var routes = {
    hello : handlers.hello,
    users : handlers.users
};
