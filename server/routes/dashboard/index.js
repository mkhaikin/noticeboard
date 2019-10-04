const express = require('express');
const router = express.Router();
const condos = require('../../../Condos.js');
const  transactions = require('../../mysql/data_access/transaction'); 

module.exports = () => {
    router.get('/', (req, res, next) => {

        transactions.getAllNoticesByCondoCode("abcd1234", res, function ( err, data){
            //console.log("Result from DB: " + JSON.stringify(data));
                if(err){
                    return res.status(501).json({
                        message: 'Not able to query the database'
                    });
                }
                else{
                    /*
                    var index;
                    for(index = 0; index < data.length; index++){
                        let d = data[index];
                        Object.keys(d).forEach(function (key) {
                            console.log(key + ' = '+ d[key]);
                        });
                    }
                    */
                    //res.render("index_new", {data, style: 'index_new'});
                    res.render("index_notice", {data, style: 'index_notice'});
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

    //////////////////////
    router.post('/add', (req, res, next)=>{
        
        const condoName = req.body.condoName;
        const noticeText = req.body.text;
        var noticeStart = req.body.start + ":00";
        var noticeEnd = req.body.end + ":00";
        
/*
console.log("!!!!!!!!!!! POST: " + condoName);
console.log("!!!!!!!!!!! POST: " + noticeText);
console.log("!!!!!!!!!!! POST: " + noticeStart);
console.log("!!!!!!!!!!! POST: " + noticeEnd);
*/
        transactions.insertNewNotice(condoName, noticeText, noticeStart, noticeEnd, res, function(err, result){
            if(err){
                
                return res.status(401).json({
                    message: 'Not able to add the notice'
                });
            }
            else{
                /*
                var index;
                var id;
                    for(index = 0; index < result.length; index++){
                        let d = result[index];
                        Object.keys(d).forEach(function (key) {
                            console.log(key + ' = '+ d[key]);
                        });
                    }
                    */
                    let d = result[0];
                    var id = d["id"]; //key in result map returns id value

                //result is a new index of the notice
                return res.json(
                    {
                    condoName: condoName,
                    text: noticeText,
                    start: noticeStart,
                    end: noticeEnd,
                    id: id
                });
            }
        });        
    });
    //////////////////////
    ////////  delete /////////////////
    router.delete('/delete', (req, res, next)=>{
        const id = req.body.id;      

        transactions.deleteNotice(id, function(err, result) {
            if (err) {
               return res.status(501).json({
                 message: 'Not able to delete notice'
             });
            }

            return res.json({
                id: id
            });
        });
    });  
    //////////////////////////////
    return router;
};

router.get('/edit', (req, res, next)=>{
    const id = req.body.id; 
    console.log('id = ' + id);
    transactions.getNoticeByID(id, res, function ( err, data){
        console.log("Result from DB: " + JSON.stringify(data));
            if(err){
                console.log(err);
                return res.status(501).json({
                    message: 'Not able to query the database for edit'
                });
            }
            else{
                /**/ 
                var index;
                for(index = 0; index < data.length; index++){
                    let d = data[index];
                    Object.keys(d).forEach(function (key) {
                        console.log(key + ' = '+ d[key]);
                    });
                }
                /**/
                //res.render("index_new", {data, style: 'index_new'});
                res.render("index_edit_notice", {data, style: 'index_notice'});
            }
        }
    );
});