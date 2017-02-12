module.exports = function(app,passport){
  
    
app.get('/', function(req,res){
   res.render('index.ejs'); 
});

app.get('/login', function(req,res){
   res.render('login.ejs',{message:req.flash('loginMessage')}); 
}); 
    
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    
    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true 
    }));
    
    app.post('/signup',passport.authenticate('local-signup',{
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true 
    }));
    
    app.get('/profile', isLoggedIn, function(req,res){
        res.render('profile.ejs', {
            user: req.user   // get the user out of session and pass
        })
    });
    
    app.get('/logout', function(req,res){
       req.logout();
        res.redirect('/');
    });
    
};



// route middleware to make sure a user is logged in
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
        
    }
    else {
        res.redirect('/');
    }
}