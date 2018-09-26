import express from 'express';
import passport from 'passport';

const router = express.Router();

/* GET user from db. */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res /* , next */) => {
  res.send(req.user);
});

router.post('/', (req, res, next) => {
  passport.authenticate('local-signup', { session: false }, (err, user, info) => {
    if (info) return res.status(422).send(info);

    return res.send(user);
  })(req, res, next);
});

export default router;
