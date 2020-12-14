const bodyParser = require('body-parser');
module.exports = function (app) {
    const UserDetails = require('/Users/vlad.petrenciuc/NodeCourse/njmusicstore/models/userInfo.js')
    /*  PASSPORT SETUP  START*/
    const passport = require('/Users/vlad.petrenciuc/NodeCourse/njmusicstore/config/passport.js');
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/success', (req, res) => res.render('index', { username: req.query.username, title: 'Home' }));
    app.get('/error', (req, res) => res.render('login', { username: '', title: 'Login', errormessage: 'An error occured while logging in. Please check your username and password!' }));
    
    /* PASSPORT SETUP STOP */
    app.post('/',
        passport.authenticate('local', { failureRedirect: '/error' }),
        function (req, res) {
            res.redirect('/home', { username: req.user.username });
        });
    app.get('/', function (req, res) {
        res.render('index', { username: '', title: 'Home' });
    });
    app.get('/index', function (req, res) {
        res.render('index', { username: '', title: 'Home' });
    });
    // Go to login page
    app.get('/login', function (req, res) {
        res.render('login', { username: '', title: 'Login', errormessage: '' });
    });
    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/error' }),
        function (req, res) {
            res.redirect('/success?username=' + req.user.username);
        });
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
}