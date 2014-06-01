/*jshint smarttabs:true */
/*global require:false */
/*global module:false */
// checked with jshint

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var adminSchema = mongoose.Schema({
    
    login :       { type: String, validate: /\w/ },
    password:     { type: String, validate: /\w/ },
    type  :       { type: String, enum: ['admin'] },
   
});

adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
