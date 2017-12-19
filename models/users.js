var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: String,
    email: String,
    firstName: String,
    lastName: String,
    nationality: String,
    phoneNumber: String,
    primaryAddress: {
        deliveryAddress: String,
        postalCode: String,
        city: String,
        country: String
    },
    isActive: Boolean
});
var User = mongoose.model('User', userSchema);
module.exports = User;