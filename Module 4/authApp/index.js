/* Express Setup */

const express = require('express'); //create Express app
const app = express();

app.use(express.static(__dirname)); //define the directory for static files

const bodyParser = require('body-parser'); //help parse the body of requests
const expressSession = require('express-session')({ //use express-session to save the session cookie
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession);

const port = process.env.PORT || 3000; //set the port to the environment port variable if it exists. Otherwise, default to 3000.
app.listen(port, () => console.log('App listening on port ' + port));

/* Passport Setup */
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

/* Mongoose Setup */

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/MyDatabase', //contact database using mongoose.connect and give it the path to the database
{ useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema; //define data structure
const UserDetail = new Schema({
    username: String,
    password: String
});

UserDetail.plugin(passportLocalMongoose); //add passportLocalMongoose as a plugin to Schema
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo'); //create model for the Schema

/* Passport Local Authentication */
passport.use(UserDetails.createStrategy()); //make passport use the local strategy

passport.serializeUser(UserDetails.serializeUser()); //invoked on authentication and serialize the user instance with the information passed on and store it in the session via a cookie
passport.deserializeUser(UserDetails.deserializeUser()); //invoked every subsequent request to deserialize the instance, providing it the unique cookie identifier as a "credential".

/* Routes */
const connectEnsureLogin = require('connect-ensure-login');

app.post('/login', (req, res, next) => { // set up a route to handle a POST request to the /login path
    passport.authenticate('local', (err, user, info) => { //attempts to authenticate with the strategy as its first parameter 'local'
        if(err){
            return next(err);
        }
        if(!user){
            return res.redirect('/login?info=' + info); //redirect to /login with info parameter contains an error message.
        }
        req.logIn(user, function(err){
            if(err){
                return next(err);
            }
            return res.redirect('/');
        });
    }) (req, res, next);
});

app.get('/login',   
    (req, res) => res.sendFile('html/login.html',   //set up the /login route
    { root: __dirname})
);

app.get('/',
    connectEnsureLogin.ensureLoggedIn(),    // validating the session to make sure the user is allowed to look at the route
    (req, res) => res.sendFile('html/index.html', {root: __dirname})
);

app.get('/private',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('html/private.html', {root: __dirname})
);

app.get('/user',    
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.send({user: req.user})
);

app.get('/logout',      //logout route
    (req, res) => {
        req.logout(),
        res.sendFile('html/logout.html',
        { root: __dirname}
    )
});

/* Register users */
/*
UserDetails.register({username:'paul', active: false}, 'paul');
UserDetails.register({username:'joy', active: false}, 'joy');
UserDetails.register({username:'ray', active: false}, 'ray');
*/

