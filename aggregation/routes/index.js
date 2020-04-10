var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var bookModel = require('../models/book');
var custModel = require('../models/cust');
var orderModel = require('../models/order');
mongoose.connect("mongodb://localhost:27017/ecom", {useNewUrlParser: true, useUnifiedTopology: true});
/* GET home page. */

router.get('/insert', function(req, res, next) {
res.render('insert', { title: 'Aggregation '});
});

router.post('/', function(req, res, next) {
const order = new orderModel({
id_cust:ObjectId(req.body.cust),
id_book:req.body.book,
qty:req.body.qty,
price:req.body.price,
date:new Date()
});
order
.save()
.then(result=>{
  res.redirect("/");
})
.catch(err=>{
res.status(500).json({error:err});
});
});



router.get('/', function(req, res, next) {

bookModel.find({}).limit(2).exec(function(err, result) {
orderModel.find({}).exec(function(err, order) {
  custModel.find({}).exec(function(err, docs) {
orderModel.aggregate([
 
  {
    "$lookup": {
      "from": "books",
      "localField": "id_book",
      "foreignField": "_id",
      "as": "book"
    }
  }, {   $unwind:"$book" }

   ,{
    "$lookup": {
      "from": "custs",
      "localField": "id_cust",
      "foreignField": "_id",
      "as": "cust"
    }
  },{   $unwind:"$cust" },
{$project:{
  _id:1,
  date:1,
  price:1,
  qty:1,
"title":"$book.title",
  "cust":"$cust.email"
      } 
    }
]).exec(function(err, aggregate) {
res.render('index', { title: 'Aggregation ',result:result,docs:docs,order:order,aggregate:aggregate});
});
});
});
});


});

module.exports = router;
