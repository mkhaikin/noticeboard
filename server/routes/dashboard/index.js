const express = require('express');
const router = express.Router();
const condos = require('../../../Condos.js');
const  transactions = require('../../mysql/data_access/transaction'); 

module.exports = () => {
    router.get('/', (req, res, next) => {
        // get all records for current user --> currently hardcoded "abcd1234"
        transactions.getAllNoticesByCondoCode("abcd1234", res, function ( err, data){

                if(err){
                    return res.status(501).json({
                        message: 'Not able to query the database'
                    });
                }
                else{
                    res.render("index_notice", {data, style: 'index_notice'});
                }
            }
        );
    });

    router.get('/add/:id', (req, res, next) => {
        return res.send(`Details for notice #${req.params.id}`);
    });

    ////////// add new record ///////////////
    router.post('/add', (req, res, next)=>{
        
        const condoName = req.body.condoName;
        const noticeText = req.body.text;
        var noticeStart = req.body.start + ":00"; //for full time format in db
        var noticeEnd = req.body.end + ":00";

        transactions.insertNewNotice(condoName, noticeText, noticeStart, noticeEnd, res, function(err, result){
            if(err){                
                return res.status(401).json({
                    message: 'Not able to add the notice'
                });
            }
            else{
                /*  // just for testing
                var index;
                var id;
                    for(index = 0; index < result.length; index++){
                        let d = result[index];
                        Object.keys(d).forEach(function (key) {
                            console.log(key + ' = '+ d[key]);
                        });
                    }
                    let d = result[0];
                    var id = d["id"]; //key in result map returns id value
                */
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
    ////////  delete record /////////////////
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
    ///////// Update edited values in the record //////////////
    router.post('/edit', (req, res, next)=>{
        const id = req.body.id; 
        const noticeText = req.body.text;
        var noticeStart = req.body.start + ":00";
        var noticeEnd = req.body.end + ":00";

        transactions.updateNotice(id, noticeText, noticeStart, noticeEnd, res, function(err, result){
            if(err){
                
                return res.status(401).json({
                    message: 'Not able to add the notice'
                });
            }
            else{
                //if OK send back req structure                
                return res.json(
                    {
                    text: noticeText,
                    start: noticeStart,
                    end: noticeEnd,
                    id: id
                });
            }
        });   
    });
    ////////////////////////////
    return router;
};

