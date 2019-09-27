Passport.JS is a famous open source authentication middleware for Node.js. It can centralize codes about authentication together, instead of scattering in different files. Not only can it support local authentications, but also we can use it easily access many company's OAuth API. I am trying to analysis this package's source code step by step.

When we use it, the first thing we need to do is as below:

```JavaScript
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
```

## require('passport')

What do these code do? From [index.js](https://github.com/jaredhanson/passport/blob/master/lib/index.js), we can see `require('passport')` is an instance of Passport class. And it has 4 properties: Passport = Authenticator = uninstantiated Passport class. Strategy is an empty class with an authenticate function for override. strategies is an object, with a property SessionStrategy from [strategies/session.js](https://github.com/jaredhanson/passport/blob/master/lib/strategies/session.js). 

## initialize().

Look into [authticator.js](https://github.com/jaredhanson/passport/blob/master/lib/authenticator.js), it defined a range of variables which are to save data. For example, when we are using `passport.use`, the strategy will be saved to _strategies. Its init() get functions from [framework/connect.js](https://github.com/jaredhanson/passport/blob/master/lib/framework/connect.js) (when this exports is operated, the extension functions like req.logIn, req.logOut, req.isAuthenticated, req.isUnauthenticated will be injected from [http/request](https://github.com/jaredhanson/passport/blob/master/lib/http/request.js)), save a SessionStrategy in _serializers, and initialize SessionManager class. Base on this._framework.initialize, in [middleware/initialize.js](https://github.com/jaredhanson/passport/blob/master/lib/middleware/initialize.js), we see a typical middleware function which will be operated in every time node get http request. The req will have a new property: _passport, including 2 properties: instance and session. 

## session()

In [middleware/authenticate](https://github.com/jaredhanson/passport/blob/master/lib/middleware/authenticate.js), we can see it will choose a strategy from _strategies by its name, and give it 5 functions: success, fail, redirect, pass, error, which we can use those in the strategy. And it call `strategy.authenticate(req, options);`. So let's go to [strategies/session.js](https://github.com/jaredhanson/passport/blob/master/lib/strategies/session.js), it will get user information from req._passport.session and set req.user value.

Next, passport.js document guides us to:

```JavaScript
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
```

`serializeUser` and `deserializeUser` is in [authticator.js](https://github.com/jaredhanson/passport/blob/master/lib/authenticator.js), these two functions is very sophisticated. If the parameter is (fn), it's to save the functions to _serializers or _deserializers which is an array. Also, layer's done() for users to use is also defined in them: `pass(i + 1, e, o);`, which can call the  done() for the package to use. Next, in the package itself, it will call the functions by parameters (user, req, done), in [sessionmanager.js](https://github.com/jaredhanson/passport/blob/master/lib/sessionmanager.js) and [strategies/session.js](https://github.com/jaredhanson/passport/blob/master/lib/strategies/session.js). It can get and set req.user via them.

To start use it, add strategy:

```JavaScript
passport.use('local', new LocalStrategy(options, (req, username, password, done)=>{
    Users.findOne({username:username})
        .then(user=>{
            if (!user) return done(null, false);
            if (!user.verifyPassword(password)) return done(null, false);
            return done(null, user.toJSON());
        })
        .catch(err=>{
            return done(err);
        });
}));
```

Finally, we can use it in route like:

```JavaScript
Router.post('/login', passport.authenticate('local'));
//or, as it return a middleware function
Router.post('/login', (req, res, next)=>{
    passport.authenticate('local')(req,res,next);
});

```

To sum up, the package structure is:

index.js ---->  authenticator.js  ----> init() ----->

1. this.framework (connect.js)  -----> connect middleware to Passport, and extend http.IncomingMessage (req).

2. push SessionStrategy to _strategies   ------> passport.session() ensure every request will get req.user by deserializeUser.

3. set SessionManager  -------> will be used in req.Login that will be used in strategy.success in authenticate(), to get user by serializeUser.

This is a basic and sketchy analysis to passport. I learn a lot from its design and framework. If there is any misunderstanding, welcome to contact me.





