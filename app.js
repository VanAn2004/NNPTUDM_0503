var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rolesRouter = require('./routes/roles');

var app = express();

// 1. Cấu hình view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 2. CÁC MIDDLEWARE NÀY PHẢI ĐẶT TRƯỚC ROUTES
app.use(logger('dev'));
app.use(express.json()); // <--- Dòng này giúp đọc dữ liệu JSON từ Postman
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 3. KHAI BÁO ROUTES TẠI ĐÂY
app.use('/', indexRouter);
app.use('/roles', rolesRouter); // Di chuyển xuống đây
app.use('/users', usersRouter); // Di chuyển xuống đây
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/categories', require('./routes/categories'));

// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;