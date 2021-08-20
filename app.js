const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dashboardRouter = require('./src/routes/dashboard');
const dataSourceRouter = require('./src/routes/data-source');
const vendorRouter = require('./src/routes/vendor');
const deviceRouter = require('./src/routes/device');
const assetRouter = require('./src/routes/asset');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/src/public')));

app.use('/dashboard', dashboardRouter);
app.use('/datasource', dataSourceRouter);
app.use('/vendor', vendorRouter);
app.use('/device', deviceRouter);
app.use('/asset', assetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
