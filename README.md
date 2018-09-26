# Node js Master Class Homework assignment #2

The app does not have a GUI yet , but it has CRUD functionality.
For the use with POSTMAN and related software


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

#Tokens..

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
That POST request returns an OUTPUT like the following:

```JSON
{
    "email": "prueba@email.com",
    "id": "03roc03s6hjvxll96mkw",
    "expires": 1537972004814
}
```

This data is stored in the .data/tokens folder in a file with the same name as the token id.
Error codes appear in the response body.



## How to GET a Token?
To **get token** you should **send a GET request** to the /tokens route with the following **query string**:

- The query string should be the token id of the token to retrieve.

Example:

```
localhost:3000/tokens?id=03roc03s6hjvxll96mkw
```

Error codes appear in the response body.

## How to UPDATE a User? (extend expiration)
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



