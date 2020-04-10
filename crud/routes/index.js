var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var empModel = require('../models/emp');
mongoose.connect("mongodb://localhost:27017/employee", {useNewUrlParser: true, useUnifiedTopology: true});
router.get('/', function(req, res, next) {
empModel.find({},function(err, docs) {
  res.render('index', { title: 'Express' ,result:docs});
})
});
router.post('/', function(req, res, next) {
 const emp = new empModel({
	name: req.body.name,
	email:req.body.email,
	age:req.body.age,
	gender:req.body.gender
	});
emp
.save()
.then(result=>{
  res.redirect("/");
})
.catch(err=>{
res.status(500).json({error:err});
});
});

router.get('/update', function(req, res, next) {
empModel.find({},function(err, docs) {
  res.render('update', { title: 'Express' ,result:docs});
})
});
router.post('/update', function(req, res, next) {
empModel.findOneAndUpdate({email:req.body.email},{ $set: { name:req.body.name,age:req.body.age,gender:req.body.gender} },{ returnOriginal: false }).exec().then(result=>{
res.redirect("/");
 }).catch(err=>{
  res.status(500).json({error:err});
 });
});
router.get('/delete', function(req, res, next) {
empModel.find({},function(err, docs) {
  res.render('delete', { title: 'Express' ,result:docs});
})
});
router.post('/delete', function(req, res, next) {
empModel.remove({email:req.body.email}).exec().then(result=>{
res.redirect("/");
 }).catch(err=>{
  res.status(500).json({error:err});
 });
});
module.exports = router;
