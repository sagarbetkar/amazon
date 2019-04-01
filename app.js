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
 const productController = require('./controllers/products');
 const orderController = require('./controllers/orders');
 const reviewController = require('./controllers/review');

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

app.post('/api/v1/products', productController.postNewProduct);
app.get('/api/v1/products', productController.getAllProducts);
app.get('/api/v1/products/:id', productController.getProductById);
app.put('/api/v1/products/:id', productController.updateProductById);
app.delete('/api/v1/products/:id', productController.deleteProductById);

app.post('/api/v1/orders', orderController.postNewOrder);
app.get('/api/v1/orders', orderController.getAllOrders);
app.get('/api/v1/orders/:id', orderController.getOrderById);
app.put('/api/v1/orders/:id', orderController.updateOrderById);
app.delete('/api/v1/orders/:id', orderController.deleteOrderById);

app.post('/api/v1/reviews', reviewController.postNewReview);
app.get('/api/v1/reviews', reviewController.getAllReviews);
app.get('/api/v1/reviews/:id', reviewController.getReviewById);
app.put('/api/v1/reviews/:id', reviewController.updateReviewById);
app.delete('/api/v1/reviews/:id', reviewController.deleteReviewById);


module.exports = app;

app.listen(2611, () => console.log('Express server at 2611'));
