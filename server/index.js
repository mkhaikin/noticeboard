// init express app dependencies
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const methodOverride = require('method-override');

//const multer = require('multer'); 

// Session storage
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride("_method"));
//app.use(multer()); 

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// initial express routes
app.use('/', routes());

// Set a static folder in the public directory
app.use(express.static('public'));

// silence the server request for a fac icon
app.get('/favicon.ico', (req,res,next) => {
    return res.sendStatus(204);
});

app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.post('/auth', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/');
            } else {
                res.send('Incorrect Username and/or Password!');
            }			
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
// const fs = require('fs');
// var data = fs.readFileSync('condos.json');
// var file = JSON.parse(data);
// console.log('file loaded');
// console.log(`Logged in as: ${file.admin}`);

// Active on port #
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Export module to be used by others
module.export = app;