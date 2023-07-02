const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    user_name : String,
    email : String,
    password: String,    
},
{ timestamps: true }
);

let User = mongoose.model('users', userSchema);

module.exports = User;