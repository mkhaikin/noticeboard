const express = require('express');
const router = express.Router();
const condos = require('../../../Condos');

module.exports = () => {
    router.get('/', (req, res, next) => {
        return     res.render('admin', {
            title: 'Welcome to Admin Page',
            condos
        })
    });

    router.get('/add', (req, res, next) => {
        return res.send('Added new notice');
    });

    router.put('/edit', (req, res, next) => {
        return res.send('edit notice');
    });

    
    return router;
};