var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/');
});

router.get('/login', function (req, res) {
    res.render('customers/login', { title: 'Login' });
});

router.get('/register', function (req, res) {
    res.render('customers/register', { title: 'Login' });
});

module.exports = router;