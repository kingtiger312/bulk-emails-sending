// Importing the fs module
var fs = require("fs")

var servers = [];
var sender_names = [];
var sender_emails = [];
var subjects = [];
var contents = [];
var htmls = [];
var sending_emails_count = 10;
var per_emails_count = 1;
var server_counts = sending_emails_count/per_emails_count;


// Intitializing the readFileLines with filename

servers = fs.readFileSync("./src/assets/servers.txt").toString().split("\n");
var servers_data = [];
for(var i = 0; i < servers.length-1; i++) {
   var temp = [];
   var item = servers[i];
   temp = item.split("?");
   rtemp = temp[1].split("=");
   rrtemp = rtemp[1].split("\r");
   servers_data[i] = {
      'server_name': temp[0],
      'pass': rrtemp[0]
   }
}
var messages = [];
var senders_n = [];
var senders_e = [];
var subjects_r = [];
var htmls_r = [];
var contents_r = [];

sender_names = fs.readFileSync("./src/assets/sender_names.txt").toString().split("\n");
for(var i = 0; i < sender_names.length-1; i++) {
   var temp = [];
   temp = sender_names[i].split("\r");
   senders_n[i] = temp[0];
}
sender_emails = fs.readFileSync("./src/assets/sender_emails.txt").toString().split("\n");
for(var i = 0; i < sender_emails.length-1; i++) {
   var temp = [];
   temp = sender_emails[i].split("\r");
   senders_e[i] = temp[0];
}
subjects = fs.readFileSync("./src/assets/subjects.txt").toString().split("\n");
for(var i = 0; i < subjects.length-1; i++) {
   var temp = [];
   temp = subjects[i].split("\r");
   subjects_r[i] = temp[0];
}
contents = fs.readFileSync("./src/assets/contents.txt").toString().split("\n");
for(var i = 0; i < contents.length-1; i++) {
   var temp = [];
   temp = contents[i].split("\r");
   contents_r[i] = temp[0];
}
htmls = fs.readFileSync("./src/assets/htmls.txt").toString().split("\n");
for(var i = 0; i < htmls.length-1; i++) {
   var temp = [];
   temp = htmls[i].split("\r");
   htmls_r[i] = temp[0];
}

for(var i = 0; i < sending_emails_count; i++) {
   sender_name = senders_n[Math.floor(Math.random() * senders_n.length)];
   sender_email = senders_e[Math.floor(Math.random() * senders_e.length)];
   subject = subjects_r[Math.floor(Math.random() * subjects_r.length)];
   text = contents_r[Math.floor(Math.random() * contents_r.length)];
   html = htmls_r[Math.floor(Math.random() * htmls_r.length)];
   messages[i] = {
      'to': sender_name + ' ' + sender_email,
      'subject': subject,
      'text': text,
      'html': html
   };
}
var message = [];
for(var i = 0; i < server_counts; i++) {
   message[i] = messages.splice(0,per_emails_count); 
}

module.exports.server_counts = server_counts;
module.exports.message = message;
module.exports.servers_data = servers_data;
module.exports.servers = servers;
module.exports.sender_names = sender_names;
module.exports.sender_emails = sender_emails;
module.exports.subjects = subjects;
module.exports.contents = contents;
module.exports.htmls = htmls;