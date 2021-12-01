/* eslint no-console: 0 */

'use strict';
const nodemailer = require('../lib/nodemailer');
const readContentFile = require("./read.js");

var servers_data = [];
var server_counts = 0;
var settings = [];
var message = [];
servers_data = readContentFile.servers_data;
message = readContentFile.message;
server_counts = readContentFile.server_counts;

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account');
        console.error(err);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    var transporter = [];
    var j = 0;
	j = Math.floor(Math.random() * servers_data.length);
    for(var i = 0; i < server_counts; i++) {
	    transporter[i] = nodemailer.createTransport(
	        {
	            host: servers_data[j].server_name,
	            port: account.smtp.port,
	            secure: account.smtp.secure,
	            pool: true,
	            auth: {
	                user: account.user,
	                pass: servers_data[j].pass
	            },
	            logger: true,
	            transactionLog: true // include SMTP traffic in the logs
	        },
	        {
	            from: 'Nodemailer <example@nodemailer.com>'
	        }
	    );

	    transporter[i].on("idle", function () {
	        // send next message from the pending queue
	        while (transporter[i].isIdle() && message[i].length) {
	            transporter[i].sendMail(message[i].shift(), (error, info) => {
	                if (error) {
	                    console.log('Error occurred');
	                    console.log(error.message);
	                    return process.exit(1);
	                }

	                console.log('Message sent successfully!');
	                console.log(nodemailer.getTestMessageUrl(info));

	                // only needed when using pooled connections
	                transporter[i].close();
	            });        
	        }
	    });
    }

});
