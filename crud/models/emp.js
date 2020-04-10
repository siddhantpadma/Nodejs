const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conn =mongoose.Collection;
var empSchema =new mongoose.Schema({
	name:String,
	email:String,
	age:String,
	gender:String
});
var empModel = mongoose.model('Emp', empSchema);
module.exports=empModel;
