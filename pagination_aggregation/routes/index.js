var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var bookModel = require('../models/book');
var custModel = require('../models/cust');
var orderModel = require('../models/order');
mongoose.connect("mongodb://localhost:27017/ecom", {useNewUrlParser: true, useUnifiedTopology: true});
/* GET home page. */



// router.get('/insert', function(req, res, next) {
// res.render('insert', { title: 'Aggregation with Pagination'});
// });

// router.post('/', function(req, res, next) {
// const order = new orderModel({
// id_cust:ObjectId(req.body.cust),
// id_book:req.body.book,
// qty:5,
// price:1000,
// date:new Date()
// });
// order
// .save()
// .then(result=>{
//   res.redirect("/insert");
// })
// .catch(err=>{
// res.status(500).json({error:err});
// });
// });

var aggregate = orderModel.aggregate([
 
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
]);

router.get('/', function(req, res, next) {
var page=req.params.page || 1;
var r_limit=req.params.limit || 2;
var limit=parseInt(r_limit);
  const options = {
    page: page,
    limit: limit,
   sort: { date: -1 }
};

orderModel.aggregatePaginate(aggregate, options).then(function(results){
res.render('index', { title: 'Aggregation with Pagination',
  total:results.totalDocs,
  limit:results.limit,
  page:results.page,
  pages:results.totalPages,
  result:results.docs});
}).catch(function(err){
  res.status(201).json({error:err});
    console.log(err);
})

});


router.get('/:page-:limit', function(req, res, next) {
var page=req.params.page || 1;
var r_limit=req.params.limit || 2;
var limit=parseInt(r_limit);
  const options = {
    page: page,
    limit: limit,
   sort: { date: -1 }
};
orderModel.aggregatePaginate(aggregate, options).then(function(results){
res.render('index', { title: 'Aggregation with Pagination',
  total:results.totalDocs,
  limit:results.limit,
  page:results.page,
  pages:results.totalPages,
  result:results.docs});
}).catch(function(err){
  res.status(201).json({error:err});
    console.log(err);
})

});



module.exports = router;
