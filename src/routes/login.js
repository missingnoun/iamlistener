import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res, done) => {
  res.send('Login');
});

router.post('/', 
  passport.authenticate('local', { successReturnToOrRedirect: '/clan', failureRedirect: '/login' })
);

export default router;
