var _data = require('./../data.js');
var helpers = require('./../helpers.js');

var prop = {
    amount: 2000,
    currency: "usd",
    source: "tok_mastercard",
    description: "Charge for jenny.rosen@example.com"
};

helpers.stripe(prop.amount,prop.currency,prop.description,prop.source,function(){
    console.log('fin');
});