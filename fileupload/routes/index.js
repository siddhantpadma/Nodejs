var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fileupload", {useNewUrlParser: true, useUnifiedTopology: true});
var fileModel = require('../models/file');
var db = mongoose.connection;
var multer = require('multer');
var path = require('path');
router.use(express.static(__dirname+"./public/"));
// router.use(express.static(__dirname+"./public/"));
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
var Storage= multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
    cb(null,Date.now()+path.extname(file.originalname));
  }
});
var upload = multer({
  storage:Storage
}).single('document');

router.post('/',upload ,function(req, res, next) {
const file = new fileModel({
filename:req.file.filename,
});
file
.save()
.then(result=>{
res.redirect("/");
})
.catch(err=>{
res.send("Error ");
});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  fileModel.find({},function(err, docs) {
  res.render('index', { title: 'Express' ,result:docs});
})
});



module.exports = router;
