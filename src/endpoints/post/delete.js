const express = require('express');
const postDb = require('../../db/post.js');
const validators = require('../../validators/post/create.js');

module.exports = {
	type: 'DELETE',
	url: '/:id',
	handler: (req, res) => {
		postDb.get(req.params.id)
		.then(post => {
		  	if (post != undefined) {
		  		postDb.remove(req.params.id)
		  		.then(numberOfPostsRemoved => {
		  			if(numberOfPostsRemoved === 1){
						res.status(202).json({message: "Post successfully deleted."});
					}else{
						res.status(202).json({message: "Request accepted but no object deleted."});
					}
		  		})
		  		.catch(err => {
		  			res.status(500).json({ error: "The post could not be removed." });
		  		});
		  	}else{
		  		res.status(404).json({ message: "The post with the specified ID does not exist." });
		  	}
		})
		.catch(err => {
			res.status(500).json({ error: "The post information could not be retrieved." });
		})
	}
}
