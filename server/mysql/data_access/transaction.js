//methods for fetching mysql data  
var connection = require('../connection/MySQLConnect');  

function Transaction() { 
    // get all notices data  
    this.getAllNoticesByCondoCode  = function (code, res, callback) {
        var data;
        // initialize database connection  
        connection.init();  
        
        // get condo code as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'SELECT c.name, n.id, n.text, CONCAT(DATE(n.start), \' \', HOUR(n.start), \':\', MINUTE(n.start)) as start,' + 
                        ' CONCAT(DATE(n.end ), \' \', HOUR(n.end ), \':\', MINUTE(n.end )) as end ' +
                        ' FROM condos as c JOIN new_noticetable as n ON c.code = n.condo  WHERE c.code = ? ORDER BY n.id;'; 

            if (err) throw err; // not connected!

            con.query(query, code, function (err, result) {  
                    //con.release();  
                    res.send(result);  
                    //data = result;
                    console.log(result);
                    if (typeof callback === 'function') {
                        callback(result);
                      }  
                      
                    con.release();
                });  

        });  
        //return data;
    };  

    //insert new notice
    this.insertNewNotice = function(condo, text, start, end, res){
        // initialize database connection  
        connection.init();  
        // get condo code as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query ='INSERT INTO new_noticetable ( condo, text, start, end, created )' + 
            ' VALUES ( ?, ?, ?, ?, NOW() );';
            con.query(query, condo, text, start, end, function (err, result) {  
                con.release();  
                res.send(result);  
            });  
        }); 
    };  

    //update notice
    this.updateNotice = function(condo, id, text, start, end, modified, res){
        // initialize database connection  
        connection.init();  
        // get condo code and id as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'UPDATE new_noticetable '  +
                'SET text= ?, ' +
                'start= ?, ' +
                'end= ?, ' +
                'modified= NOW() ' +
                'WHERE condo= ? and id= ?';
            con.query(query, text, start, end, condo, id, function (err, result) {  
                con.release();  
                res.send(result);  
            });
        });
    }; 

    this.deleteNotice = function(condo, id, res){
             // initialize database connection  
        connection.init();  
        // get condo code and id as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'DELETE FROM new_noticetable ' + 
            'WHERE condo= ? and id= ?';
            con.query(query, condo, id,function (err, result) {
                con.release();  
                res.send(result);  
            });
        });
    }; 
 
}

module.exports = new Transaction(); 
