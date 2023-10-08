const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');





const port = process.env.PORT || 3002;
const app = express();

app.use(bodyParser.json())
   .use(session({
       secret: "secret",
       resave: false,
       saveUninitialized: true,
   }))
   .use(passport.initialize())  // Moved this line before passport.session()
   .use(passport.session());

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Orgini, X-Requested-With, Content-Type, Accept, Z-key',
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(cors({ methods: ['GET','POST','DELETE','DATE','UPDATE','PUT','PATCH']}))
app.use(cors({ origin:'*'}))


app.use(passport.initialize());

app.use('/',require("./routes/index.js"));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBAck_URL
},
function(accessToken, refreshToken, profile, done){
    return done(null, profile);
}

));


passport.serializeUser((user, done) =>{
    done(null, user);
});

app.get('/', (req, res) =>{res.send(req.session.user !== undefined ? `logged in as ${req. session.user.displayName}`:"logged out" )});

app.get('/gethub/callback',passport.authenticate('github',{
    failureRedirect: '/api-docs',session: false}),
    (req, res) =>{
        req.session.user = req.user;
        res.redirect('/');
    });



process.on('uncaughtException',(err, origin) =>{
    console.log(process.stderr.fd,`Caught exception: ${err}\n'+'Exception origin: ${origin}` );

});




mongodb.initDb((err)=>{
    if (err){
        console.log(err);
    }
    else{
        app.listen(port, ()=>{console.log(`Database is listening and node Running on port ${port} `)});
    }
})

