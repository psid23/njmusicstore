var express=require('express');
var expressLayouts = require('express-ejs-layouts');
var app=express();
app.set('view engine','ejs');
app.use(expressLayouts);
app.use(express.static('./public'));

// dotenv
var dotenv = require('dotenv');
dotenv.config();

//passport
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
passport = require('./config/passport');

// Routes
const routes = require('./routes/routes');
app.use(routes);

var trackController=require('./controllers/trackController');
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
trackController(app);

//mongodb connection
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://' + process.env.MONGOUSER + ':' + process.env.MONGOPASSWORD + '@cluster0.jlrkv.mongodb.net/'+process.env.MONGODBNAME+'?retryWrites=true&w=majority', { useNewUrlParser: true })
app.listen(4000);
console.log('server listening');