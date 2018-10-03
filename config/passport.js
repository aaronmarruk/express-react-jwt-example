import passport from 'passport';
import passportJWT from 'passport-jwt';
import * as passportLocal from 'passport-local';
import User from '../models/user';

const LocalStrategy = passportLocal.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },

  (email, password, cb) => {
    User.findOne({ email })
      .then((user) => {
        if (user && !user.validPassword(password, user)) {
          return cb(null, false, { message: 'Incorrect password.' });
        } 

        if (!user) {
          return cb(null, false, { message: 'Incorrect email or password.' });
        }

        return cb(null, user, {
          message: 'Logged In Successfully'
        });
      })
      .catch(err => cb(err));
  },
));

passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (user) {
        return done(null, false, { error: 'That email is already in use.' });
      }

      if (!user) {
        const newUser = new User();

        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.profile = `
          This is the user profile passed from the Express web server. It's hard-
          coded in Express. This is just to give you an idea for how this might 
          be implemented. The Express route used to return this data is 
          authenticated by passport.
        `;
       
        newUser.save((saveErr) => {
          if (saveErr) {
            throw saveErr;
          }

          return done(null, newUser);
        });
      }

      return false;
    });
  },
));

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },

  (jwtPayload, cb) => {
    /* eslint-disable-next-line */
    return User.findOne({ _id: jwtPayload._id })
      .then(user => cb(null, user))

      .catch(err => cb(err));
  },
));
