// init routes module
const express = require('express');
const router = express.Router();

// create routing directories from parent folder
const adminRoute = require('./admin');
const dashboardRoute = require('./dashboard');

module.exports = () => {
    // create a root route handler
    router.get('/', (req, res, next) => {
        return res.send('Index Page Welcome');
    });

    router.use('/admin', adminRoute());
    router.use('/dashboard', dashboardRoute());
    
    return router;
};