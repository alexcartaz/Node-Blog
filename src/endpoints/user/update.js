const express = require('express');
const userDb = require('../../db/user.js');
const validators = require('../../validators/user/update.js');

module.exports = {
	type: 'PUT',
	url: '/:id',
	handler: (req, res) => {
		userDb.get(req.params.id)
		.then(user => {
			if(user === undefined){
				res.status(404).json({message: "User not found."});
			}else{
				let modifiedUser = {
				  	name: req.body.name
			  	}
				const changedKeys = Object.keys(modifiedUser);
				const validations = changedKeys.map(key => validators[key](modifiedUser));
				Promise.all(validations).then(() => {
					userDb.update(req.params.id, modifiedUser)
						.then(upatedUsersCount => {
							if(upatedUsersCount === 1){
								res.status(200).json(upatedUsersCount);
							}else{
								res.status(202).json({message: "Request accepted however no users were updated."});
							}
						})
						.catch(err => {
							res.status(500).json({ error: "The user information could not be retrieved." });
						})
				}).catch(err => res.status(err.statusCode || 500).json(err.stack));
			}
		})
		.catch(err => {
			res.status(500).json({ error: "The user information could not be retrieved." });
		})
	}
}