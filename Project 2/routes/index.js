const path = require('path');
const auth = require('http-auth');
const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
// const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
// const connectEnsureLogin = require('connect-ensure-login');

const router = express.Router();
const Registration = mongoose.model('Registration');

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

const User = require('../models/Registration')

router.get('/', function(req, res) {
    res.render('index', { title: 'Index form'});
});

router.get('/login', function(req, res) {
    res.render('login', { title: 'Login form'});
});


router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, theUser, failureDetails) => {
      if (err) {
        // Something went wrong authenticating user
        return next(err);
      }
    
      if (!theUser) {
        // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
        res.render('login', {errorMessage: 'Wrong password or username'}); 
        return;
      }
  
      // save user in session: req.user
      req.login(theUser, (err) => {
        if (err) {
          // Session save went bad
          return next(err);
        }
  
        // All good, we are now logged in and `req.user` is now set
        res.redirect('/dashboard')
      });
    })(req, res, next);
});

router.get('/about', function(req, res) {
    res.render('about', { title: 'About form'});
});

router.get('/integration', function(req, res) {
    res.render('integration', { title: 'Integration form'});
});

router.get('/register', function(req, res) {
    res.render('register', { title: 'Register form'});
});

// router.post('/register', (req, res, next) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const username = req.body.username;
//     const password = req.body.password;
//     // 1. Check username and password are not empty
//     if (username === "" || password === "" || name === "" || email === "") {
//         res.render("register", { errorMessage: "Indicate username and password" });
//         return;
//     }

//     User.findOne({ username })
//         .then(user => {
//         // 2. Check user does not already exist
//         if (user) {
//             res.render("register", { errorMessage: "The username already exists" });
//             return;
//         }

//         // Encrypt the password
//         const salt = bcrypt.genSaltSync(bcryptSalt);
//         const hashPass = bcrypt.hashSync(password, salt);

//         //
//         // Save the user in DB
//         //

//         const newUser = new User({
//             name,
//             email,
//             username,
//             password: hashPass
//         });

//         newUser.save()
//             .then(user => res.redirect("/thankyou"))
//             .catch(err => next(err))
//         ;
//         })
//         .catch(err => next(err))
//     ;
// });

router.get('/registrants', basic.check((req, res) => {
    UserDetails.find()
        .then((registrations) => {
            res.render('registrants', { title: 'Listing registrations', registrations });
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
}));

router.get('/dashboard', function(req, res) {
    if(!req.user){
        res.redirect('/login');
        return;
    }
    res.render('dashboard', { user:req.user, title: 'Dashboard form'});
});

router.post('/', [
    check('name')
        .isLength({ min: 1})
        .withMessage('Please enter a name'),
    check('email')
        .isEmail()
        .isLength({ min: 1})
        .withMessage('Please enter an email'),
    check('username')
        .isLength({ min: 1})
        .withMessage('Please enter a username'),
    check('password')
        .isLength({ min: 8})
        .withMessage('Please enter a password'),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const registration = new Registration(req.body);
            //generate salt to has password
            const salt = await bcrypt.genSalt(10);
            //set use passwor to hashed password
            registration.password = await bcrypt.hash(registration.password, salt);
            registration.save()
            .then(() => res.render('thankyou', { title: 'Thankyou form'}))
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
        });
        } 
        else{
            res.render('register', {
                title: 'Register form',
                errors: errors.array(),
                data: req.body,
            });
        }
});

router.get('/logout',
    (req, res) => {
        req.logout(),
        res.redirect('/login')
});

module.exports = router;