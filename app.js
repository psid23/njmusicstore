var express=require('express');
var expressLayouts = require('express-ejs-layouts');
var session=require('express-session');
var favicon=require('serve-favicon');
var app=express();
// dotenv
var dotenv = require('dotenv');
dotenv.config();
//mongodb connection
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://' + process.env.MONGOUSER + ':' + process.env.MONGOPASSWORD + '@cluster0.jlrkv.mongodb.net/'+process.env.MONGODBNAME+'?retryWrites=true&w=majority', { useNewUrlParser: true })
var trackController=require('./controllers/trackController');
var loginController=require('./controllers/loginController');
var bodyParser=require('body-parser');
app.set('view engine','ejs');
app.use(expressLayouts);
app.use(express.static('./public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
trackController(app);
loginController(app);
//passport
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.listen(4000);
console.log('server listening');