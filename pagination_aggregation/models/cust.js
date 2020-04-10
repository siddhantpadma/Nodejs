const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
var conn =mongoose.Collection;
var CustSchema =new mongoose.Schema({
	email: String,
	password:String
});
CustSchema.plugin(aggregatePaginate);
var CustModel = mongoose.model('Cust', CustSchema);
module.exports=CustModel;
