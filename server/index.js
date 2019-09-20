// init express app dependencies
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const routes = require('./routes');

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// initial express routes
app.use('/', routes());
// Set a static folder in the public directory
app.use(express.static('public'));
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
// silence the server request for a fac icon
app.get('/favicon.ico', (req,res,next) => {
    return res.sendStatus(204);
});

const fs = require('fs');
var data = fs.readFileSync('condos.json');
var file = JSON.parse(data);
console.log('file loaded');
console.log(`Logged in as: ${file.admin}`);

// Active on port #
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Export module to be used by others
module.export = app;