const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conn =mongoose.Collection;
var orderSchema =new mongoose.Schema({
	id_cust:
      {type: Schema.Types.ObjectId, ref: 'Cust'}
    ,
    id_book:
      {type: Schema.Types.ObjectId, ref: 'Book'}
    ,
	qty:Number,
	price:Number,
	date:Date
});

var orderModel = mongoose.model('Order', orderSchema);
module.exports=orderModel;
