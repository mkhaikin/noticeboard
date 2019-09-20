const express = require('express');
const router = express.Router();
const condos = require('../../../Condos.js');
const  transactions = require('../../mysql/data_access/transaction'); 

module.exports = () => {
    router.get('/', (req, res, next) => {

        transactions.getAllNoticesByCondoCode("abcd1234", res, function ( data){
            //console.log("Result from DB: " + JSON.stringify(data));
            var index;
            for(index = 0; index < data.length; index++){
                let d = data[index];
                Object.keys(d).forEach(function (key) {
                    console.log(key + ' = '+ d[key]);
                  });
            }

            }
        );

        // return     res.render('index', {
        //     title: 'Welcome to Dashboard',
        //     condos
        // })
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