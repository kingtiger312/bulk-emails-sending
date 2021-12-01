const express  = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const http = require("http");
const router = express.Router();
const path = require("path");
const { body, validationResult } = require('express-validator');
const port = 3000;

// start user define files
const readContentFile = require("./src/read.js");

// end user define files

app.use(bodyParser.urlencoded({extended: true}));
app.set("public engine", "ejs");
var servers_data = [];
/***
 *  start reading text file 
 * ***/ 
total_server_count = readContentFile.servers.length;
total_sender_count = readContentFile.sender_emails.length;
total_subject_count = readContentFile.subjects.length;
servers_data = readContentFile.servers_data;
/***
 *  end reading text file
 * **/
var general_data = [
  {
    'total_server_count': total_server_count,
    'total_sender_count': total_sender_count,
    'total_subject_count': total_subject_count
  }
];

var setting_data = [
  {
    'server_counts': 20,
    'sending_emails_count': 2000,
    'per_emails_count': 100
  }
];

router.get('/',function(req,res){
  res.render(path.join(__dirname+'/src/public/index.ejs'),{'setting_data': setting_data,'general_data': general_data,'servers_data': servers_data})
});

router.get('/settings',function(req,res){
  res.render(path.join(__dirname+'/src/public/settings.ejs'),{'setting_data': setting_data,'general_data': general_data})
});

app.post("/settings", function(req, res){
    // will add validation //
    //                     //
   var server_counts = req.body.server_counts;
   var sending_emails_count = req.body.sending_emails_count;
   var per_emails_count = req.body.per_emails_count;
   var newData = {
    'server_counts': server_counts,
    'sending_emails_count': sending_emails_count,
    'per_emails_count': per_emails_count
   };
    setting_data = [];
    setting_data.push(newData); 
   res.redirect("/settings");
});

app.post("/send_mass_mails",function(req,res) {
  const mass_mails = require("./src/full.js")();
  res.redirect("/");
});

router.get('/reports',function(req,res){
  res.render(path.join(__dirname+'/src/public/reports.ejs'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

// module.exports.setting_data = setting_data;
console.log('Running at Port 3000');