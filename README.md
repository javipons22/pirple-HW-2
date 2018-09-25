# Node js Master Class Homework assignment #2

The app does not have a GUI yet , but it has CRUD functionality.
For the use with POSTMAN and related software


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

The **OUTPUT** is the updated json file in the .data/users folder.
Error codes appear in the response body.


## How to DELETE a User?
To **delete user** you should **send a DELETE request** to the /users route with the following **query string**:

- The query string should be the email address of the user to delete.

Example:

```
localhost:3000/users?email=javier@mail.com
```

Error codes appear in the response body.



