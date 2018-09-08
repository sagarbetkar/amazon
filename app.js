var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/**
 * Controllers (route handlers).
 */
 const userController = require('./controllers/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect('mongodb://localhost:27017/amazon');
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.on('open', () => console.log("success in connecting to mongodb"));

app.post('/api/v1/users', userController.postNewUser);
app.get('/api/v1/users', userController.getAllUsers);
app.get('/api/v1/users/:id', userController.getUserById);
app.put('/api/v1/users/:id', userController.updateUserById);
app.delete('/api/v1/users/:id', userController.deleteUserById);


module.exports = app;

app.listen(2611, () => console.log('Express server at 2611'));
