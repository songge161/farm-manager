var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var recordRouter = require('./routes/recordFile/record');
var methodRouter = require('./routes/recordFile/method');
var userRouter = require('./routes/userFile/user');
var mentionRouter = require('./routes/userFile/mention');
var combineRouter = require('./routes/recordFile/combine');
var weatherRouter = require('./routes/weather');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//后台路由配置
app.use('/recordInf/record', recordRouter);
app.use('/recordInf/method', methodRouter);
app.use('/recordInf/combine', combineRouter);
app.use('/userInf/user', userRouter);
app.use('/userInf/mention', mentionRouter);
app.use('/weather', weatherRouter);


module.exports = app;
