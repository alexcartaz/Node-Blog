const express = require('express');
const userDb = require('../../db/user.js');
//const validators = require('../../validators/user/update.js');

module.exports = {
	type: 'GET',
	url: 's/',
	handler: (req, res) => {
		userDb.get()
		  .then(users => {
		  	res.status(200).json(users);
		  })
		  .catch(err => {
		  	console.log(err);
			res.status(500).json({ error: "Could not retrieve users." });
		  })
	}
}