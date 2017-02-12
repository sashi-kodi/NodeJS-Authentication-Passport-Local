var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    local:{
        email:String,
        password: String
    }
});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);  
};
userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

var UsersModel = mongoose.model('UsersModel', userSchema,'UsersDB');
module.exports = UsersModel;