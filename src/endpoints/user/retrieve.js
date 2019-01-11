const express = require('express');
const userDb = require('../../db/user.js');
//const validators = require('../../validators/post/update.js');

module.exports = {
	type: 'GET',
	url: '/:id',
	handler: (req, res) => {
		userDb.get(req.params.id)
		  .then(user => {
		  	if(user != undefined){
		  		res.status(200).json(user);
		  	}else{
		  		res.status(404).json({ error: "User not found."});
		  	}
		  })
		  .catch(err => {
		  	console.log(err);
			res.status(500).json({ error: "Could not retrieve user." });
		  })
	}
}