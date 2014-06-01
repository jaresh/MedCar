/*jshint smarttabs:true */
/*global require:false */
/*global module:false */
// checked with jshint

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var docSchema = mongoose.Schema({
    
    login           : { type: String, required: true, unique: true, validate: /\w/ },
    password        : { type: String, required: true, validate: /\w/ },
    type            : { type: String, required: true, enum: ['doc'] },
    name            : { type: String, required: true, validate: /\w/ },
    lastname        : { type: String, required: true, unique: true, validate: /\w/ },

    workingdays     : {
        pon           : Boolean,
        wt            : Boolean,
        sr            : Boolean,
        czw           : Boolean,
        pi            : Boolean,
        so            : Boolean,
        ni            : Boolean,

    },
    workinghours    : {
        ponbegin    :{ type: Number, min: 8, max: 20 },
        ponend      :{ type: Number, min: 8, max: 20 },
        wtbegin     :{ type: Number, min: 8, max: 20 },
        wtend       :{ type: Number, min: 8, max: 20 },
        srbegin     :{ type: Number, min: 8, max: 20 },
        srend       :{ type: Number, min: 8, max: 20 },
        czwbegin    :{ type: Number, min: 8, max: 20 },
        czwend      :{ type: Number, min: 8, max: 20 },
        pibegin     :{ type: Number, min: 8, max: 20 },
        piend       :{ type: Number, min: 8, max: 20 },
        sobegin     :{ type: Number, min: 8, max: 20 },
        soend       :{ type: Number, min: 8, max: 20 },
        nibegin     :{ type: Number, min: 8, max: 20 },
        niend       :{ type: Number, min: 8, max: 20 },
    },
   
});

docSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

docSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Doc', docSchema);