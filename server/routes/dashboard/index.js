const express = require('express');
const router = express.Router();
const condos = require('../../../Condos.js');


module.exports = () => {
    router.get('/', (req, res, next) => {
        return     res.render('index', {
            title: 'Welcome to Dashboard',
            condos
        })
    });

    router.get('/add', (req, res, next) => {
        return res.send('Added new notice');
    });

    router.put('/edit', (req, res, next) => {
        return res.send('edit notice');
    });

    router.get('/add/:id', (req, res, next) => {
        return res.send(`Details for notice #${req.params.id}`);
    });
    
    return router;
};