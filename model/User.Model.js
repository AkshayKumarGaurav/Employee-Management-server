const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    first_name : {type:String,require:true},
    last_name : {type:String,require:true},
    email : {type:String,require:true},
    password : {type:String,require:true},
    salary : {type:Number,require:true},
    department : {type:String,require:true}
})

const UserModel = mongoose.model('user',UserSchema);

module.exports = {
    UserModel
}