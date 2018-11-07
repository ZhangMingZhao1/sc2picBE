module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/getPic')
    });
    app.use('/getPic', require('./getPic'));
    app.use('/signUp', require('./signUp'));
    app.use('/signIn', require('./signIn'));

    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.send("404")
        }
    })
};