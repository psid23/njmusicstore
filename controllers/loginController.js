getIndex = (req, res) => {
    res.render('index', { username: req.query.username != null ? req.query.username : '', title: 'Home' });
}

getLogin = (req, res) => {
    res.render('login', { username: '', title: 'Login', errormessage: '' });
}

postLogin = (req, res) => {
    res.redirect('/success?username=' + req.user.username);
}

getLogout = (req, res) => {
    req.logout();
    res.redirect('/');
}

getError = (req, res) => {
    res.render('login', { username: '', title: 'Login', errormessage: 'An error occured while logging in. Please check your username and password!' });
}

module.exports = {
    getIndex,
    getLogin,
    postLogin,
    getLogout,
    getError,
};