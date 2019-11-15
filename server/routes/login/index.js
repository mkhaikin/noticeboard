const express = require('express');
const router = express.Router();
var path = require('path');
var session = require('express-session');
var connection = require('../../mysql/connection/MySQLConnect');  

module.exports = () => {
    router.get('/', (req, res, next) => {
        res.sendFile(path.join(__dirname + '/public/login/login.html'));
    });

    router.post('/login/auth', (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;
        if (username && password) {
            connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }			
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });
    
    router.get('/home', function(req, res) {
        if (req.session.loggedin) {
            res.send('Welcome back, ' + req.session.username + '!');
        } else {
            res.send('Please login to view this page!');
        }
        res.end();
    });
    
    return router;
};