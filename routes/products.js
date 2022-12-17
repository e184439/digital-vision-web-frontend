var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/view/:prodId', function (req, res, next) {
    res.render('product_view', {title: 'Product Details', productId: req.params.prodId});
});

router.get('/buynow/step1', function (req, res, next) {
    res.render('cart_final', {title: 'Product Details'});
});

router.get('/buynow/step2', function (req, res, next) {
    res.render('provide_further_information', {title: 'Product Details'});
});

router.get('/buynow/step3', function (req, res, next) {
    res.render('provide_further_information_2', {title: 'Product Details'});
});

module.exports = router;