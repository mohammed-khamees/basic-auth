# basic-auth

[heroku](https://khamees-basic-auth.herokuapp.com/api)

[PR](https://github.com/mohammed-khamees/basic-auth/pull/1)

## how to work with this repo:

1. `npm init -y`
2. `npm i express dotenv cors morgan mongoose bcrypt base-64`
3. `npm i -D supertest jest @code-fellows/supergoose`

**On the `package.json` change the `script` to**

```
"scripts": {
    "start": "node app.js",
    "watch": "nodemon app.js",
    "test-watch": "jest --watchAll",
    "test": "jest"
  },

```

![UML](uml3.png)
