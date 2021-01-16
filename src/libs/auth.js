"use strict";

import passport from 'passport';
import passportLocal from 'passport-local';
//import passportHttp from 'passport-http';
//import passportClient from 'passport-oauth2-client-password';
//import passportBearer from 'passport-http-bearer';
import bcrypt from 'bcrypt';

const LocalStrategy = passportLocal.Strategy;
//const BasicStrategy = passportHttp.BasicStrategy;
//const ClientPasswordStrategy = passportClient.Strategy;
//const BearerStrategy = passportBearer.Strategy;

import db from './db.js';

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */

 passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user = await db.wxschema.wx_users.findOne({ userlogin: username });

    if(user) {
      bcrypt.compare(password, user.userpwd, (error, isMatch) => {
        if (error) {
          console.log(error);
          return done(null, false);
        }

        if (isMatch) {
          return done(null, user);
        }
        else {
          return done(null, false);
        }
      });
    }
    else {
      return done(null, false);
    }
  }
));

// serializeUser determines which data of the user object should be stored in the session.
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

// The first argument of deserializeUser corresponds to the key of the user object that was given to the done function so your whole object is retrieved with help of that key.
passport.deserializeUser((userId, done) => {
  db.wxschema.wx_users.findOne({ id: userId }).then(user => {
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  }).catch(done);
});
