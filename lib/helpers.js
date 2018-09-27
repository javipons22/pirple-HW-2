/*
 * Helpers for various tasks
 *
 */

// Dependencies
var config = require('./config');
var crypto = require('crypto');
var querystring = require('querystring');
var https = require('https');

var helpers = {};

// Parse JSON to Object
helpers.parseJsonToObject = function(str){
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch(e){
        return {};
    }
};


// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function(strLength){
    strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
    if(strLength){
      // Define all the possible characters that could go into a string
      var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  
      // Start the final string
      var str = '';
      for(i = 1; i <= strLength; i++) {
          // Get a random charactert from the possibleCharacters string
          var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
          // Append this character to the string
          str+=randomCharacter;
      }
      // Return the final string
      return str;
    } else {
      return false;
    }
};


helpers.stripe = function(amount,currency,description,source,callback){
    // Configure the request payload
    var payload = {
      'amount' : amount,
      'currency' : currency,
      'description' : description,
      'source' : source,
    }
  
    // Stringify the payload
    var stringPayload = querystring.stringify(payload);
    console.log(stringPayload);
    // Configure the request details
    var requestDetails = {
      'protocol' : 'https:',
      'hostname' : 'api.stripe.com',
      'method' : 'POST',
      'auth' : config.stripe.secretKey,
      'path' : '/v1/charges',
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(stringPayload)
      }
    }
  
    // Instantiate the request object
    var req = https.request(requestDetails,function(res){
      // Grab the status of the sent request
      var status = res.statusCode;
      console.log(res);
      // Callback successfully if the request went through
      if(status==200 || status==201){
        callback(false);
      } else {
        callback('Status code return was '+status);
      }
    });
  
    // Bind to the error event so it doesn't get the thrown
    req.on('error',function(e){
      callback(e);
    });
  
    // Add the payload
    req.write(stringPayload);
  
    // End the request
    req.end();
  }


module.exports = helpers;