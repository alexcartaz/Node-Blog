const express = require('express');
const userDb = require('../../db/user.js');
const postDb = require('../../db/post.js');
const validators = require('../../validators/post/update.js');

module.exports = {
	type: 'PUT',
	url: '/:id',
	handler: (req, res) => {
		postDb.get(req.params.id)
		.then(post => {
			if(post === undefined){
				res.status(404).json({message: "Post not found."});
			}else{
				let changes = {
					post: {
				  		id: req.params.id,
				  		userId: (req.body.userId === undefined) ? post.userId : req.body.userId,
				  		text: (req.body.text === undefined) ? post.text : req.body.text
				  	}
			  	}
				const changedKeys = Object.keys(changes.post);
				const validations = changedKeys.map(key => validators[key](changes));
				Promise.all(validations).then(() => {
					postDb.update(changes.post)
						.then(upatedPostsCount => {
							if(upatedPostsCount === 1){
								res.status(200).json(upatedPostsCount);
							}else{
								res.status(202).json({message: "Request accepted however no posts were updated."});
							}
						})
						.catch(err => {
							res.status(500).json({ error: "The post information could not be retrieved." });
						})
				}).catch(err => res.status(err.statusCode || 500).json(err.message));
			}
		})
		.catch(err => {
			res.status(500).json({ error: "The post information could not be retrieved." });
		})
	}
}