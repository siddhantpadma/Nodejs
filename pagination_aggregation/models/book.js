const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var conn =mongoose.Collection;
var bookSchema =new mongoose.Schema({
	title:String,
	isbn:String,
	pageCount:String,
	publishedDate:String,
	thumbnailUrl:String,
	shortDescription:String
});
bookSchema.plugin(mongoosePaginate);
var bookModel = mongoose.model('Book', bookSchema);
module.exports=bookModel;
