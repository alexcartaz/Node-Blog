const express = require('express');
const userDb = require('../../db/user.js');
const postDb = require('../../db/post.js');
const validators = require('../../validators/post/create.js');

module.exports = {
	type: 'POST',
	url: '/',
	handler: (req, res) => {
		let newPost = {
	  		userId: req.body.userId,
	  		text: req.body.text
	  	}
		const newKeys = Object.keys(newPost);
		const validations = newKeys.map(key => validators[key](newPost));
		Promise.all(validations).then(() => {
			userDb.get(req.body.userId)
			.then(user => {
				if(user != undefined){
					postDb.insert({userId: req.body.userId, text: req.body.text})
					  .then(postId => {
					  	res.status(201).json(postId);
					  })
					  .catch(err => {
						res.status(500).json({ error: "There was an error while saving the post to the database." });
					  });
				}else{
					res.status(400).json({ error: "Please provide valid user ID." });
				}
			})
			.catch(err => {
				res.status(500).json({ error: "The post information could not be retrieved." });
			})
		});
	}
}
