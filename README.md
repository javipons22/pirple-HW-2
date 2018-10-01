# Node js Master Class Homework assignment #2

The app does not have a GUI yet , but it has CRUD functionality.
For the use with POSTMAN and related software.

PIZZA ORDERING APP
App allows the creation of users with tokens to order pizza!

# How does the app work?

## Setup

NOTE: The app uses mailgun and stripe API's , you should have an account for them!

### setup config.js file:
First create a **config.js** file in the lib directory to set up the environment and variables needed to:

- Determine http and https ports
- Determine stripe credentials for stripe API integration
- Determine mailgun credentials for mailgun API integration

Example:

```Javascript

var environments = {};

// Staging (default) environment
environments = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'stripe' : {
    'secretKey' : 'YOUR_STRIPE_SECRET_KEY'
  },
  'mailgun' : {
    'sender' : 'YOUR_MAILGUN_EMAIL_ADDRESS',
    'apiKey' : 'api:YOUR_MAILGUN_API_KEY',
    'domainName' : 'YOUR_MAILGUN_DOMAIN_NAME'
  }
  
};

```

IMPORTANT!! : Dont forget to export the environments object at the end of file

```javascript

module.exports = environments;
  
```

## Use the app!

## Steps

### 1. CREATE USER
To **create user** you should **send a POST request** to the /users route with the following **body**:

- The body should be an Object.
- Required parameters are : "name" ,"email" ,"address".
- All the parameter's values should be of type string and greater than zero (string > 0).

Example:

```JSON
{
    "name": "Jav",
    "email": "prueba@mail.com",
    "address": "111 main st."
}

```

### 2. CREATE TOKEN (LOG IN)
To login and create a token you should send a **POST** request to the /tokens route with the following **required** data:

- "name"
- "email"

example:

```JSON
{
    "name": "Jav",
    "email": "prueba@email.com"
}

```
That POST request returns an OUTPUT like the following:

```JSON
{
    "name": "Jav",
    "email": "prueba@mail.com",
    "token": "ados89ejf0qlavpl7ccc",
    "menu": [
        {
            "id": 0,
            "type": "pizza",
            "topping": "Hawaiian",
            "price": 200,
            "description": "Pineapple, Ham Slice, Bacon Slice, Mozzarella Cheese, Pizza Sauce"
        },
        {
            "id": 1,
            "type": "pizza",
            "topping": "Seafood Cocktail",
            "price": 275,
            "description": "Pineapple, Ham Slice, Prawn, Crab Sticks, Mozzarella Cheese, Thousand Island Sauce"
        },
        {
            "id": 2,
            "type": "pizza",
            "topping": "BBQ Chicken",
            "price": 250,
            "description": "BBQ Chicken, Red&Green Chilli, Mozzarella Cheese, Pizza Sauce"
        },
        
    ]
}
```

The token key is your token, it expires an hour after being created.

### 3. CREATE ORDER CART (no payment yet)
To create an order you should send a **POST** request to the /cart route with the following **required** data:

- "email"
- "cart" (an array with as many menu item id's as you want)
- YOU MUST INCLUDE YOUR TOKEN ID IN HEADERS (key="token" , value= YOUR_TOKEN_ID)

Example: 

```javascript
{
    "email": "prueba@mail.com",
    "cart":[3,2,1]
}
```

This will return an object like the following:

```javascript
{
    "email": "prueba@mail.com",
    "products": "Italian Sausage pizza, BBQ Chicken pizza, Seafood Cocktail pizza, ",
    "order-total": 750,
    "order-id": "bm0y4",
    "paid": false
}
```

You must use your order-id for payment

### 4. PAY YOUR ORDER
Finally you should pay your order, for now test data will be sent to stripe and a test message will be sent with mailgun to your user's email account

To pay your order send a **POST** request to the /pay route with the following **required** data:

- "email"
- "order-id" 
- YOU MUST INCLUDE YOUR TOKEN ID IN HEADERS (key="token" , value= YOUR_TOKEN_ID)

```javascript
{
    "email": "prueba@mail.com",
    "order-id" : "bm0y4"
}
```

You will receive an email in your user's email and a test payment in your stripe account.




# Final notes...
You can also delete, update and get users, tokens and carts, the following notes will show you how:

# Users ..
## How to CREATE a User?
To **create user** you should **send a POST request** to the /users route with the following **body**:

- The body should be an Object.
- Required parameters are : "name" ,"email" ,"address".
- All the parameter's values should be of type string and greater than zero (string > 0).

Example:

```JSON
{
    "name": "Javier",
    "email": "javier@mail.com",
    "address": "111 main st."
}

```

The **OUTPUT** is a json file that get's stored in the .data/users folder.
Error codes appear in the response body.


## How to GET a User?
To **get user** you should **send a GET request** to the /users route with the following **query string**:

- The query string should be the email address of the user to retrieve.



Example:

```
localhost:3000/users?email=javier@mail.com
```
**IMPORTANT:**
**You should also include your login token with the key value "token" in the request header!!**

Error codes appear in the response body.

## How to UPDATE a User?
To **Update user** you should **send a PUT request** to the /users route with the following **body**:

- The body should be an Object.
- Required parameters are : "email".
- Optional parameters are : "name" or "address".

Example:

```JSON
{
    "name": "Carlos",
    "email": "javier@mail.com",
    "address": "122 main st."
}

```
**IMPORTANT:**
**You should also include your login token with the key value "token" in the request header!!**

The **OUTPUT** is the updated json file in the .data/users folder.
Error codes appear in the response body.


## How to DELETE a User?
To **delete user** you should **send a DELETE request** to the /users route with the following **query string**:

- The query string should be the email address of the user to delete.

Example:

```
localhost:3000/users?email=javier@mail.com
```
**IMPORTANT:**
**You should also include your login token with the key value "token" in the request header!!**

Error codes appear in the response body.

# Tokens..

Tokens is the login system for this app , when logging in (see "how to LOG IN"), a token for the user is created and stored in the .data/tokens folder . Tokens expire one hour after creation.

## How to LOG IN? (create token)
To login and create a token you should send a **POST** request to the /tokens route with the following **required** data:

- "name"
- "email"

example:

```JSON
{
    "name": "Jav",
    "email": "prueba@email.com"
}

```
That POST request returns an OUTPUT like the following (but with menu items):

```JSON
{
    "email": "prueba@email.com",
    "id": "03roc03s6hjvxll96mkw",
    "expires": 1537972004814
}
```

This data is stored in the .data/tokens folder in a file with the same name as the token id.
Error codes appear in the response body.



## How to GET (retrieve information about) a Token?
To **get token** you should **send a GET request** to the /tokens route with the following **query string**:

- The query string should be the token id of the token to retrieve.

Example:

```
localhost:3000/tokens?id=03roc03s6hjvxll96mkw
```

Error codes appear in the response body.

## How to UPDATE a Token? (extend expiration)
To **Update token** you should **send a PUT request** to the /tokens route with the following **body**:

- The body should be an Object.
- Required parameters are : "id" and "extend"
- Extend should be a boolean (true)

Example:

```JSON
{
    "id": "03roc03s6hjvxll96mkw",
    "extend" : true
}

```

The **OUTPUT** is the updated json file in the .data/users folder.
This allows to use the token for one more hour.
Error codes appear in the response body.

## How to DELETE a Token?
To **delete token** you should **send a DELETE request** to the /tokens route with the following **query string**:

- The query string should be the token id of the token to delete.

Example:

```
localhost:3000/users?id=voku8cud8zorcd3guztu
```
Error codes appear in the response body.

# Carts...

## How to GET (retrieve information about) a Cart?
To **get cart** you should **send a GET request** to the /cart route with the following **query string**:

- The query string should be the cart id of the cart to retrieve.

Example:

```
localhost:3000/cart?id=03roc
```

No token is needed
Error codes appear in the response body.


## How to DELETE a Cart?
To **delete cart** you should **send a DELETE request** to the /cart route with the following **query string**:

- The query string should be the cart id of the cart to delete.

Example:

```
localhost:3000/cart?id=03roc
```

No token is needed
Error codes appear in the response body.



