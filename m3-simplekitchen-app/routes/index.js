const path = require('path');
const auth = require('http-auth');
const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const router = express.Router();
const Registration = mongoose.model('Registration');

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', function(req, res) {
    res.render('index', { title: 'Index form'});
});

router.get('/register', function(req, res) {
    res.render('register', { title: 'Register form'});
});

router.get('/registrants', basic.check((req, res) => {
    Registration.find()
        .then((registrations) => {
            res.render('registrants', { title: 'Listing registrations', registrations });
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
}));

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

module.exports = router;