const fetch = require('node-fetch');
const path = require("path");
const http = require('http');
const fs = require('fs');
require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use(express.static('public'))


app.get('/', (req, res) => {
	res.sendFile(path.join(public + '/index.html'));
  });
  
  
  app.listen(3000, () => {
	console.log('Server is listening on port 3000')
  })
  
  
  async function send_message(email, businessname) {
		const message = process.env.MESSAGE;
		console.log("Notification Successfully sent!")
  
	  const courier_options = {
		  method: 'POST',
		  headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + process.env.APIKEY
		  },
		  body: JSON.stringify({
			"message": {
			  "to": {
				"data": {
					"Name": businessname,
				  },
				"email": email,
			  },
			  "template": "JNN5SNF25640EKPKZY4SKSW36TEH",
			  "routing": {
				"method": "all",
				"channels": ["email"]
			  },
			}
		  })
		};
		
		fetch('https://api.courier.com/send', courier_options)
		  .then(response => response.json())
		  .then(response => console.log(response))
		  .catch(err => console.error(err));
  
  }
  
  app.post('/send-message', (req, res) => {
	const email = req.body.email;
	const businessname = req.body.name;
	send_message(email, businessname);
	res.json({ message: 'message sent' });
  });
  
  
  async function send_newsletter(email, name) {
	const message = process.env.MESSAGE;
	console.log("Newsletter Successfully sent!")

  const courier_options = {
	  method: 'POST',
	  headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + process.env.APIKEY
	  },
	  body: JSON.stringify({
		"message": {
		  "to": {
			"data": {
				"Name": name,
			  },
			"email": email,
		  },
		  "template": "11ZY6GJTCVMWQQKGMSARND00VK3H",
		  "routing": {
			"method": "all",
			"channels": ["email"]
		  },
		}
	  })
	};
	
	fetch('https://api.courier.com/send', courier_options)
	  .then(response => response.json())
	  .then(response => console.log(response))
	  .catch(err => console.error(err));

}

app.post('/send-newsletter', (req, res) => {
const email = req.body.email;
const name = req.body.name;
send_newsletter(email, name);
res.json({ message: 'message sent' });
});