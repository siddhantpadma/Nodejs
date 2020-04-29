var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user:req.body.from,
	    pass: req.body.password
	  }
	});
	var mailOptions = {
	  from: req.body.from,
	  to: req.body.email,
	  subject: req.body.subject,
	  text:req.body.msg
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	    return ;
	  } else {
	    console.log('Email sent: ' + info.response);
	 	// res.redirect("/");
	 	res.render('send', { title: 'Express' });
	  }
	});
  
});

	
module.exports = router;
