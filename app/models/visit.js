var mongoose = require('mongoose');

var visitSchema = mongoose.Schema({
    
    patient     : String,
    doc      	: String,
    hour        : String,
    day      	: String,
   
});

module.exports = mongoose.model('Visit', visitSchema);
