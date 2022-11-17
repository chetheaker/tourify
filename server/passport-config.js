const usersModel = require('./src/models/users.model');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

function initialise(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await usersModel.findUserByEmail(email);
          if (!user) return done(null, false);
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (e) {
          console.log(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => done(null, { email: email }));
}

module.exports = initialise;
