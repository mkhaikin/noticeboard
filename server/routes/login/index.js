const express = require('express');

const router = express.Router();

module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.send('Login');
    });

    // router.get('/:id', (req, res, next) => {
    //     return res.send(`Details for notice #${req.params.id}`);
    // });
    
    return router;
};