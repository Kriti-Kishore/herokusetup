const express = require('express');
const hbs = require('hbs');
const fs=require('fs');
var app = express();

const port=process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

/*app.use((req,res,next)=>{
	console.log("Running");
	//next();    });*/
app.use((req,res,next)=>{
	var log=`${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('somefile.log',log+'\n',(err)=>
	{		if(err)
		{			console.log("Some Problem");	} });
	next();	});

/*app.use((req,res,next)=>
{	res.render('notify.hbs');
	//next();	});*/
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear() });

hbs.registerHelper('Capt', (text) => {
  return text.toUpperCase();	});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/updation', (req, res) => {
  res.render('updation.hbs', {
    pageTitle: 'UpDation'
  });
});

app.get('/personalinfo', (req, res) => {
  res.render('personalinfo.hbs', {
    pageTitle: 'Personal Information'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
