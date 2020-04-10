var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
///change url 
var bookModel = require('../models/book');
mongoose.connect("mongodb://localhost:27017/bookstore", {useNewUrlParser: true, useUnifiedTopology: true});
/* GET home page. */
router.get('/', function(req, res, next) {
bookModel.paginate({}, { page: 1, limit: 1 , sort: { publishedDate: -1 }}, function(err, result) {
res.render('index', { title: 'pagination',result:result.docs,total:result.total,limit:result.limit,
  page:result.page,
  pages:result.pages
});
});
});

router.get('/:page-:limit', function(req, res, next) {
var page=req.params.page || 1;
var r_limit=req.params.limit || 2;
var limit=parseInt(r_limit);
bookModel.paginate({}, { page: page, limit:limit, sort: { publishedDate: -1 }}, function(err, result) {
res.render('index', { title: 'pagination',result:result.docs,total:result.total,limit:result.limit,
  page:page,
  pages:result.pages
});
});
});
module.exports = router;
