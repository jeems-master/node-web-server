const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'))

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n');
    next();

});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
//    // next();
// });

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase();
});

app.get('/',(req,res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    })
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.get('/projects',(req,res) => {
    res.render('projects.hbs',{
        pageTitle:'Projects'
    });
})

app.get('/bad',(req,res) => {
    res.send({
        errorMessage:'Unable to handle request'
    });
})

app.listen(3000,() => {
    console.log('Sever is up on port 3000');
});