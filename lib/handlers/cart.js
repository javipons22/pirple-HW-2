//Dependencies
var _data = require('./../data.js');
var tokens = require('./tokens.js');
var helpers = require('./../helpers.js');

var handlers = {};

handlers.tokens = tokens.tokens;
handlers._tokens = tokens._tokens;

// Set users handler to execute _cart handler or return error 
handlers.cart = function (data, callback){
    allowedMethods = ['get', 'post', 'put', 'delete'];
    if (allowedMethods.indexOf(data.method) > -1) {
        handlers._cart[data.method](data, callback);
    } else {
        callback(405,{'Error': 'method not allowed'});
    }
};

// Set _cart handlers for get put post and delete
handlers._cart = {};

// Users - post
// Required Fields : name, email address, and street address
handlers._cart.post = function(data, callback){
    // Verify requirements
    var cart = typeof(data.payload.cart) == 'object' && data.payload.cart instanceof Array ? data.payload.cart : false;
    var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;

    if(cart){
        // Verify Token
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        handlers._tokens.verifyToken(token,email,function(tokenIsValid){
            if (tokenIsValid){
                // Read menu from file
                _data.read('menus','menus',function(err,userData){
                    if (!err && userData){
                        // Set menu from read file in menus.js
                        var menu = userData.items;
                       
                        helpers.isInMenu(cart,menu,function(err,selectedMenuItems){
                            // Check if all cart items exist in menu
                            if(!err){
                                // Create string for selected products to include in output
                                helpers.selectedProductsData(menu, selectedMenuItems,function(selectedProducts,totalPrice){
                                    // Create order id
                                    var orderId = helpers.createRandomString(5);
                                    // Create cart object (cart id, products, total price, instructions)
                                    cart = {
                                        "products" : selectedProducts,
                                        "order-total" : totalPrice,
                                        "order-id": orderId,
                                    }
                                    // Store the cart
                                    _data.create('cart',orderId,cart,function(err){
                                        if(!err){
                                          callback(200,cart);
                                        } else {
                                          callback(500,{'Error' : 'Could not store the cart'});
                                        }
                                    });

                                });

                            } else {
                                callback(400,{'Error' : 'Specified cart item id does not exist.'});
                            }
                        });
                        

                    } else {
                        callback(500,{'Error' : 'Could not read Menu file'});
                    }    
                });     
                
            } else {
                callback(403,{"Error" : "Missing required token in header, or token is invalid."})
            }
        });
    } else {
        callback(400,{'Error' : 'Missing required field(s).'})
    }
};


module.exports = handlers;