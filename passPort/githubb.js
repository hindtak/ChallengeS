const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new GitHubStrategy({
  clientID: "3891a20b0a75114090e6",
  clientSecret: "f8cda1814be1f78d850bc87abdf99da271f69e9f",
  callbackURL: "http://localhost:2000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));