// Create web server with express
// npm install express
// npm install body-parser
// npm install express-session
// npm install express-handlebars
// npm install mongoose
// npm install mongoose-paginate
// npm install passport
// npm install passport-local
// npm install passport-local-mongoose
// npm install connect-flash
// npm install express-validator
// npm install express-messages

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Register
router.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();
	if(errors){
		res.render('register', {
			errors: errors
		});
	}else{
		var newUser = new User({
			username: username,
			password: password
		});
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});
		req.flash('success_msg', 'You are registered and can now login');
		res.redirect('/users/login');
	}
});

// Login
router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}), function(req, res) {
	res.redirect('/');
});

// Logout
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});

module.exports = router;
