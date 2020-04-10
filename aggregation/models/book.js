const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conn =mongoose.Collection;
var bookSchema =new mongoose.Schema({
	title:String,
	isbn:String,
	pageCount:String,
	publishedDate:String,
	thumbnailUrl:String,
	shortDescription:String
});

var bookModel = mongoose.model('Book', bookSchema);
module.exports=bookModel;
