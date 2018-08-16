import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import logger from "./util/logger";
import lusca from "lusca";
import dotenv from "dotenv";
import mongo from "connect-mongo";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import https from "https";
import passport from "passport";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
var VsoStrategy = require('passport-vso').Strategy;
const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });
var VSO_CLIENT_ID = "A30D46D0-3F2C-4415-B9C9-082099AC137A";
var VSO_CLIENT_SECRET = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJjaWQiOiJhMzBkNDZkMC0zZjJjLTQ0MTUtYjljOS0wODIwOTlhYzEzN2EiLCJjc2kiOiIwMWY3YWIxNC0zNjY1LTQwOGItYWRjZC01ZTc5MDIzYWUxMzYiLCJuYW1laWQiOiIwOTZhMzhiNS03NDg0LTZmNjctYjA3Mi1kMmIyNzczMjBkMTciLCJpc3MiOiJhcHAudnNzcHMudmlzdWFsc3R1ZGlvLmNvbSIsImF1ZCI6ImFwcC52c3Nwcy52aXN1YWxzdHVkaW8uY29tIiwibmJmIjoxNTMzMjM5MDkzLCJleHAiOjE2OTEwMDU0OTN9.PPTWsRS9VHAAuV60pFBnMuiGAuGNA6LBkqOLqHpSQRvGVBibcL4T_ylitFMDUGa8GFnTDLbndRj91amJk2lMRgOY93Pe_bjIAd50enOd6ri2zM7J_XTakvxH1TkQn4Ly6C7UuXlJVPfBAi8m7KPBKaFVltP-NRlBFqwsgC8S5XZfsTRGjTQHaxnixnVtVtwqFr1dcuPMLmTIhfA_b6VM7vT5gpBzvMYp87PQD8rgqR5ejnspGwFbDeF34P6tUMAMfyqolqTI6BsePHHlf9g1ITXnbTNp_3Z5hcuyu8Xmos6qYbPq76x25TbOZ1zkKIpU4N-r5ousq7gxN7KQH11KZw";
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new VsoStrategy({
  clientID: VSO_CLIENT_ID,
  clientSecret: VSO_CLIENT_SECRET,
  callbackURL: "https://168.61.187.177/api/auth/callback",
  scope: ["vso.build","vso.code","vso.connected_server","vso.dashboards","vso.entitlements","vso.extension","vso.extension.data","vso.gallery","vso.graph","vso.identity","vso.loadtest","vso.machinegroup_manage","vso.memberentitlementmanagement","vso.notification_diagnostics","vso.packaging","vso.project","vso.release","vso.security_manage","vso.serviceendpoint","vso.symbols","vso.taskgroups_read","vso.test","vso.wiki","vso.work_write"],
  state: true
},
function(accessToken: string, refreshToken: string, profile: any, done:any) {
  // asynchronous verification, for effect...\
  console.log(accessToken, profile)
  process.nextTick(function () {
    
    // To keep the example simple, the user's Visual Studio Online profile is returned
    // to represent the logged-in user.  In a typical application, you would
    // want to associate the Visual Studio Online account with a user record in your
    // database, and return that user instead.
    return done(null, profile);
  });
}
));
// Create Express server
const app = express();


// Express configuration
app.use(
  express.static(path.join(__dirname, "../../../dist/client"), { maxAge: 31557600000 })
);
app.set("port", process.env.PORT || 8080);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/auth/vso',
  passport.authenticate('vso'),
  function(req, res){

    // The request will be redirected to Visual Studio Online for authentication, so
    // this function will not be called.
  });

app.get('/api/auth/callback', passport.authenticate('vso', { failureRedirect: '/login' }),
function(req, res) {
  console.log('here')
  res.redirect('/');
});

app.get('/api/test',
function(req, res) {
  https.get('GET https://exelontfs.vsrm.visualstudio.com/EUCOMS/_apis/release/definitions/16?api-version=4.1-preview.3', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).explanation);
    });
  })
});
app.use(function(req, res, next) {
  console.log('laksdf')
  var err = new Error('Not Found');
  err.message = "404";
  next(err);
});

function ensureAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
export default app;
