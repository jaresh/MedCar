/*jshint smarttabs:true */
/*global require:false */
/*global module:false */
// checked with jshint

var mongoose = require('mongoose');

var visitSchema = mongoose.Schema({
    
    patient     : { type: String, required: true, validate: /\w/ },
    doc			: { type: String, required: true, validate: /\w/ },
    hour        : { type: String, required: true, validate: /[0-9]{1,2}\:[0-5][0-9]/ },
    day			: { type: String, required: true, validate: /[0-9]{4}\-[0-1][0-9]\-[0-3][0-9]/ },
   
});

module.exports = mongoose.model('Visit', visitSchema);