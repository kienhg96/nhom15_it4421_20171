const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require(`${r}/middlewares/errorHandler`);
const router = require(`${r}/router`);
const session = require(`${r}/middlewares/session`);

const app = express();
app.disable('x-powered-by');
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session);
app.use(router);
app.use(errorHandler);

module.exports = app;
