// app.js
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

// Set up body parsing middleware
app.use(koaBody());

// Require the Router we defined in books.js
let books = require('./books.js');
let db = require('./db.js');
let user = require('./users.js');
let token = require('./tokens.js');
// Use the Router on the sub route /books
app.use(books.routes());
app.use(db.routes());
app.use(user.routes());
app.use(token.routes());
app.listen(3000);