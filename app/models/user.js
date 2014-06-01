/*jshint smarttabs:true */
/*global require:false */
/*global module:false */
// checked with jshint

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    
    login        : { type: String, required: true, unique: true, validate: /\w/ },
    password     : { type: String, required: true, validate: /\w/ },
    type         : { type: String, required: true, enum: ['user'] },
    name         : { type: String, required: true, validate: /\w/ },
    secondname   : { type: String, required: true, validate: /(\w|-)/ },
    lastname     : { type: String, required: true, validate: /\w/ },
    pesel        : { type: String, required: true, unique: true, validate: /[0-9]{11}/ },
    dateofbirth  : { type: String, required: true, validate: /[0-9]{4}\-[0-1][0-9]\-[0-3][0-9]/ },
   
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
