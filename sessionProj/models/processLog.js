module.exports = function processLogin(req, res, next) {
    if(req.body.username !== 'alice'  && req.body.password !== 'hashed_password' ) {
        return res.send('Invalid username or password');
    }

    req.session.userid = req.body.username;
    res.redirect('/');
    next()
}