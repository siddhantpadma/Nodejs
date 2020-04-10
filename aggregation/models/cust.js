const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conn =mongoose.Collection;
var CustSchema =new mongoose.Schema({
	email: String,
	password:String
});

var CustModel = mongoose.model('Cust', CustSchema);
module.exports=CustModel;
