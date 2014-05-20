var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var customersSchema = new Schema({
	name: String,
	city: String
});

mongoose.model('customers', customersSchema);