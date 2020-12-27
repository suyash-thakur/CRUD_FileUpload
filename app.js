const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require('./auth.js');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require('./Models/Admin');
const app = express();
const port = 9000;
const connection_url = 'mongodb+srv://Admin:passwordAdminTikTok@cluster0.ddzlm.mongodb.net/tiktokClone?retryWrites=true&w=majority';
let useVar = {};
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => { 
    console.log("Connected to database!");
}).catch(() => { 
    console.log("Connection failed!");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.post('/login', (req, res, next) => {
    let fetchedAdmin;
    const { email, password } = req.body;
    if (email && password) {
        Admin.findOne({ username: email }).then(admin => {
            if (admin) {
                 fetchedAdmin = admin;
                return bcrypt.compare(req.body.password, admin.password);
            }
        }).then(
            result => {
                if (!result) {
                    res.render('login', { error: "Incorrect email and/or Password!" });
                } else { 
                    useVar[fetchedAdmin.username] = fetchedAdmin;
                    res.cookie("email", fetchedAdmin.username);
                    res.cookie("password", fetchedAdmin.password);
                    res.render('index');
                }
            }
        ).catch(err => {
            console.log(err);
        })
    };
});

app.post('/signup', (req, res, next) => { 
    bcrypt.hash(req.body.password, 10).then(hash => {
        const admin = new Admin({
            username: req.body.email,
            password: hash
        });
        admin.save().then(
            result => {
                if (result) {
                    res.render('login', { msg: 'User created. Login to continue' });
                }
            }
        ).catch(err => {
            console.log(err);
            res.render('login', { error2: 'Error Signing Up' });
        });
    });
});

app.get('/login',  (req, res, next) => {
    res.render('login');
});

app.get('/', checkAuth, (req, res, next) => { 
    res.render('index');
});

app.listen(port, () => console.log(`Listening on localhost: ${port}`));