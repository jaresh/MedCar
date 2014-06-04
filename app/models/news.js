/*jshint smarttabs:true */
/*global require:false */
/*global module:false */
// checked with jshint

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var newsSchema = mongoose.Schema({
    
    title :       { type: String, required: true, validate: /\w/ },
    content:      { type: String, },
    number:		  {	type: Number, required: true, unique: true, },
    date: 		  { type: String, required: true, validate: /[0-9]{4}\-[0-1][0-9]\-[0-3][0-9]/ },
   
});

module.exports = mongoose.model('News', newsSchema);