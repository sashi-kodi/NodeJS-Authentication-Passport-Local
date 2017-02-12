// load all the things we need
var LocalStrategy  = require('passport-local').Strategy;

// load up the user model
var User = require('../models/Users');

module.exports = function(passport){
    
  passport.serializeUser(function(user,done){
    done(null,user.id);  
  }) ;
    
     passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
                                                  
    function(req,email,password,done){
        
     process.nextTick(function(){
         User.findOne({'local.email': email}, function(err,user){
             if(err) return done(err);
             if(user) {
                 return done(null,false,req.flash('signupMessage', 'That Email id is already taken.'));
             }
             else{
                 // if there is no user with that email
                // create the user
                 
//                 User.create({'email':email,'password': User.generateHash(password)},function(err,newUser){
//                     console.log(newUser);
//                     if (err){
//                        console.log("got an error while trying to save the new user record");
//                       throw err; 
//                    }
//                        
//                    return done(null, newUser);
//                });
                 
                 
                 var newUser = new User();
                newUser.local.email= email;
                 newUser.local.password = newUser.generateHash(password);
                 console.log(newUser);
                 newUser.save(function(err) {
                    if (err){
                        console.log("got an error while trying to save the new user record");
                       throw err; 
                    }
                        
                    return done(null, newUser);
                });
                 
             }
         });
     });
        
    }));
    
    
    //local login strategy
    
    passport.use('local-login', new LocalStrategy({
        
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req,email,password,done) {
        User.findOne({'local.email':email},function(err,user){
            if(err) return done(err);
            if(!user) {
                return done(null,false, req.flash('loginMessage', 'No User found'));
            }
            if(!user.validatePassword(password)){
                return done(null,false, req.flash('loginMessage', 'Invalid Password'));
            }
            //all is well
            return done(null,user);
        });
        
    }                                           
    ));
    
    
    
    
};