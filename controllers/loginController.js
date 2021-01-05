const { Strategy: localStrategy } = require('passport-local');
const mongoose = require('mongoose');
const passport = require('passport');

/* MONGOOSE SETUP */

const ADDRESS = '127.0.0.1';
const PORT = `mongodb://${ADDRESS}:27017/njmusicstore` || process.env.PORT;

mongoose.connect(
  PORT,
  {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
  }
);

/*Replace the above connection string with the actual connection string of your MongoDB database*/
const loginController = (app) => {
  const Schema = mongoose.Schema;

  const UserDetail = new Schema({
        username: {
          type: String,
          unique: true
        },
        password: String
      });
  const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

  const testUser = new UserDetails({
    username: 'test',
    password: 'test'
  });

  testUser
  .save()
  .catch((e) => console.log('User already exists!'))

  /*  PASSPORT SETUP  START*/

  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/success', (req, res) => res.render('index',{username:req.query.username,title:'Home'}));
  app.get('/error', (req, res) => res.render(
    'login',{
      username:'',
      title:'Login',
      errormessage:'An error occurred while logging in. Please check your username and password!'
    }
  ));
  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser((id, cb) => User.findById(id, (err, user) => cb(err, user)));

  /* PASSPORT SETUP STOP */
  app.post('/', 
    passport.authenticate('local', { failureRedirect: '/error' }),
    (req, res) => res.redirect('/home',{username:req.user.username})
  );

  /* PASSPORT LOCAL AUTHENTICATION */
  passport.use(new localStrategy(
    (username, password, done) =>
        UserDetails.findOne({
          username: username 
        }, (err, user) => {
          if (err)
            return done(err);

          if (!user)
            return done(null, false);
          
          if (user.password != password)
            return done(null, false);
          
          return done(null, user);
        })
  ));

  app.get('/', (req, res) => res.render('index', { username : '' , title:'Home'}));

  app.get('/index',(req, res) => res.render('index', { username : '' , title:'Home'}));
  
  // Go to login page
  app.get('/login', (req, res) => res.render('login',{username : '' ,title: 'Login',errormessage:''})); 

  app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/error' }),
    (req, res) => res.redirect('/success?username='+req.user.username)
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  }

  module.exports = {
    loginController
  };
