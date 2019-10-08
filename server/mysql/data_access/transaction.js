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
                        ' FROM condos as c JOIN new_noticetable as n ON c.code = n.condo  WHERE c.code = ? ORDER BY n.id DESC;'; 

            //if (err) throw err; // not connected!
            con.query(query, code, function (err, result) {  
              //con.release();
              //res.send(result);  //commented by Yefim

              //data = result;
              //console.log(result);
              if (typeof callback === 'function') {
                  if(err) callback(err, null);
                  else
                      callback(null, result);
                }  

              con.release();
          });  
          
            con.query(query, code, (err, result) => {  
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
    
    this.getNoticeByID  = function (id, res, callback) {
        var data;
        // initialize database connection  
        connection.init();  
        
        // get condo code as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'SELECT c.name, n.id, n.text, CONCAT(DATE(n.start), \' \', HOUR(n.start), \':\', MINUTE(n.start)) as start,' + 
                        ' CONCAT(DATE(n.end ), \' \', HOUR(n.end ), \':\', MINUTE(n.end )) as end ' +
                        ' FROM condos as c JOIN new_noticetable as n ON c.code = n.condo  WHERE n.id = ?;'; 

            //if (err) throw err; // not connected!

            con.query(query, id, function (err, result) {  
                    //con.release();  
                    //res.send(result);  //commented by Yefim
                    //data = result;
                    //console.log(result);
                    if (typeof callback === 'function') {
                        if(err) callback(err, null);
                        else
                            callback(null, result);
                      }  
                      
                    con.release();
                });  

        });  
        //return data;
    };  

    //insert new notice
    this.insertNewNotice = function(condo, text, start, end, res, callback){
        // initialize database connection  
        connection.init();  
        // get condo code as parameter to passing into query and return filter data  
        connection.acquire((err, con) => {  

           var query ='INSERT INTO new_noticetable (condo, text, start, end, created)' + 
                        ' Values((SELECT code FROM condos WHERE name = ?), ?,?,?, NOW());';
            var params = [condo, text, start, end];
      
            con.query(query, params, (err, result) => {  

                if (typeof callback === 'function') {
                    if(err) {
                        //console.log('Error1 in Insert!');
                        callback(err, null);
                    }

                    var queryLastId = 'SELECT MAX(id) as id FROM new_noticetable ' + 
                    'WHERE condo IN (SELECT code FROM condos WHERE name = ?);';
                    con.query(queryLastId, condo, function (err, result) {  

                        //console.log("ID of inserted row: " + result);
                       
                        if(err){
                            console.log('Error2 in Insert!');
                            callback(err, null);
                        }
                        else
                            callback(null, result);
                    });  
                }  
                con.release();  

            });  
        }); 
    };  

    //update notice
    this.updateNotice = function( id, text, start, end, res, callback){
        // initialize database connection  
        connection.init();  
        // get condo code and id as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'UPDATE new_noticetable '  +
                'SET text= ?, ' +
                'start= ?, ' +
                'end= ?, ' +
                'modified= NOW() ' +
                'WHERE id= ?;';
                                                    //console.log(start + '|' + end + '|' + id);    
            var params = [text, start, end, id];    
            con.query(query, params, function (err, result) { 
                if (typeof callback === 'function') {                    
                    if(err){
                        console.log('Error in Update!');
                        callback(err, null);
                    }
                    else
                        callback(null, result);
                }
                con.release();                   
            });
        });
    }; 

    this.deleteNotice = function( id, callback){
        // initialize database connection  
        connection.init();  
        // get condo code and id as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'DELETE FROM new_noticetable WHERE id = ?;';
            con.query(query, id, (err, result) => {
                if (typeof callback === 'function') {
                    if(err){ 
                        console.log("Error: " + err.message);
                        callback(err, null);
                    }
                    else
                        callback(null, result);
                  } 
                con.release();  
                //res.send(result);  
            });
        });
    }; 
 
}

module.exports = new Transaction(); 
