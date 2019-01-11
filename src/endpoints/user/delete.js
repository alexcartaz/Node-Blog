const express = require('express');
const userDb = require('../../db/user.js');
const validators = require('../../validators/post/create.js');

module.exports = {
	type: 'DELETE',
	url: '/:id',
	handler: (req, res) => {
		userDb.get(req.params.id)
		.then(user => {
		  	if (user != undefined) {
		  		userDb.remove(req.params.id)
		  		.then(numberOfUsersRemoved => {
		  			if(numberOfUsersRemoved === 1){
						res.status(202).json({message: "User successfully deleted."});
					}else{
						res.status(202).json({message: "Request accepted but no object deleted."});
					}
		  		})
		  		.catch(err => {
		  			res.status(500).json({ error: "The user could not be removed." });
		  		});
		  	}else{
		  		res.status(404).json({ message: "The user with the specified ID does not exist." });
		  	}
		})
		.catch(err => {
			res.status(500).json({ error: "The user information could not be retrieved." });
		})
	}
}
