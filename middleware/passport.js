const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy

const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization') ,
    secretOrKey: process.env.SECRET_KEY
}, async (payload, done) => {
    try {
        console.log(payload)
        const user = await User.findById(payload.id)

        if(!user)  return done(null, false);
        done(null, user)
        
    } catch (error) {
        done(error, false)
    }
}))

module.exports = function(req, res, next) {
    passport.authenticate('jwt', { session: false }, function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json({ message: 'Unauthorized' }); }
        req.user = user;
        next();
    })(req, res, next);
};
