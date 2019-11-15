// init routes module
const express = require('express');
const router = express.Router();

// create routing directories from parent folder
// const loginRoute = require('./login');
const adminRoute = require('./admin');
const dashboardRoute = require('./dashboard');

module.exports = () => {
    // create a root route handler
    router.get('/', (req, res, next) => {
        return res.send('Index Page Welcome');
    });

    router.get('/', (req, res, next) => {
        res.sendFile(path.join(__dirname + '/public/login/login.html'));
    });

    router.use('/admin', adminRoute());
    router.use('/dashboard', dashboardRoute());
    // router.use('/login', loginRoute());
    
    return router;
};