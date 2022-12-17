var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard', { title: 'Dashboard'});

});

router.get('/products', function(req, res, next) {
  res.render('admin/products', { title: 'Products'});

});

router.get('/customers', function(req, res, next) {
  res.render('admin/customer', { title: 'Customers'});

});

router.get('/users', function(req, res, next) {
  res.render('admin/adminusers', { title: 'Users'});

});

router.get('/orders', function(req, res, next) {
  res.render('admin/orders', { title: 'orders'});

});

router.get('/useredit', function(req, res, next) {
  res.render('admin/user_edit', { title: 'Users'});

});
module.exports = router;
