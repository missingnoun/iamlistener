import express from 'express';
import cors from 'cors';
import mlog from 'morgan';
import passport from 'passport';
import session from 'express-session';

import conf from './config/config.js';

// Passport configuration
import './libs/auth.js';
// import './libs/oauth2.js'; To be Added

// Routes Declaration
import routeIndex from './routes/index.js';
import routeLogin from './routes/login.js';
import routeClanHome from './routes/clan/home.js';

const app = express();

/**
 * Middleware that allows Express to parse through both JSON and x-www-form-urlencoded request bodies
 * These are the same as `bodyParser` - you probably would see bodyParser put here in most apps
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.set('trust proxy', 1) // trust first proxy

// Express session
app.use(
  session({
      name: 'wxsesid',
      secret: conf.session.secret,
      resave: true,
      saveUninitialized: true,
      cookie: {
          httpOnly: true,
          secure: false, //secured by setting to true
          sameSite: true,
          domain: 'localhost',
          //path: '/',
          expires: conf.session.expirydate
      }
  })
);

app.use(cors());
app.use(mlog('dev'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routeIndex);
app.use('/login', routeLogin);
app.use('/clan', routeClanHome);

export default app;
