const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conn =mongoose.Collection;
var fileSchema =new mongoose.Schema({
	filename:String
});

var fileModel = mongoose.model('File', fileSchema);
module.exports=fileModel;
