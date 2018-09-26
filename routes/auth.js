import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();

router.post('/login', (req, res /* , next */) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user,
      });
    }

    // If a user was found
    req.login(user, { session: false }, (userErr) => {
      if (userErr) {
        res.send(userErr);
      }

      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);

      return res.json({ user, token });
    });

    return false;
  })(req, res);
});

module.exports = router;