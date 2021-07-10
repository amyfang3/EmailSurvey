const passport = require('passport'); // original passport npm module


module.exports = (app) => {
    // When user first logins via Google and needs to grant permission, triggers passport oauth flow to authenticate the user
    // scope - specificies access we want to have from Google: profile details, email address
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    // After user authenticates, Google passes back a code to this redirect URL
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google')
    );

    app.get('/api/logout', (req, res) => {
        req.logout(); // logout function automatically attached by passport to req user
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}
