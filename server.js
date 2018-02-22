const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('wiew engine', 'hbs');
app.use((req, res, next) => {
   var now = new Date().toString();
   var log =`${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) => {
      if (err) {
         console.log('Unable to write to log file');
      }
   });
   next();
})
// app.use((req, res, next) => {
//    res.render('maintenance.hbs', {
//    });
// })
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
})
app.get('/', (req, res) => {
   // res.send('<h1>Hello</h1>');
   res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my Website'
   });
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
      pageTitle: 'About Page',
      aboutText: 'About us'
   });
});

app.get('/bad', (req, res) => {
   res.send({
      errMessage: 'URL not found'
   })
});

app.listen(3000, () => {
   console.log('server is up on port 3000');
});
