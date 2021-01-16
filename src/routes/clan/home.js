import express from 'express';
import login from 'connect-ensure-login';

const router = express.Router();

router.get('/',
  login.ensureLoggedIn('/login'), (req, res, done) => {
  res.send('Clan');
});

export default router;
