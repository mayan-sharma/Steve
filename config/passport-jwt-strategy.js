const User = require('../models/user');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secretForNow'
};

passport.use(new JWTStrategy(opts, async(jwt_payload, done)=>{
    try{
        const user = await User.findById(jwt_payload.id);
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(err) {
        console.log(err);
        return done(err, false);
    }
}))

module.export = passport;