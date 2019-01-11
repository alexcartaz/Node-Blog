const express = require('express');
const userDb = require('../../db/user.js');
const validators = require('../../validators/user/create.js');

module.exports = {
	type: 'POST',
	url: '/',
	handler: (req, res) => {
		let newUser = {
	  		name: req.body.name
	  	}
		const newKeys = Object.keys(newUser);
		const validations = newKeys.map(key => validators[key](newUser));
		Promise.all(validations).then(() => {
			userDb.insert(newUser)
			  .then(userId => {
			  	res.status(201).json(userId);
			  })
			  .catch(err => {
				res.status(500).json({ error: "There was an error while saving the new user to the database." });
			  });
		});
	}
}
