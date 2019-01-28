const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');//to use hbs in express
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
    console.log('Entered First middleWare')
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log+ '\n',(err) => {
        if (err) throw err;
    });
    console.log('Leaving first middleWare');
    next();
});

app.use((req,res,next) => {
    console.log('Entered second middleware');
    res.render('maintanance.hbs');
    console.log('Leaving second middleware');
    next();
});

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
})

app.get('/',(request,response) => {
    console.log('Entered get request for Home page');
    response.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });

});

app.get('/about',(req,res) => {
    console.log('Entered get request for About page');
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.listen(3000, () =>{
    console.log('Server is up at port 3000');
});