const express = require('express');
const userDb = require('../../db/user.js');
const postDb = require('../../db/post.js');
const validators = require('../../validators/post/update.js');

module.exports = {
	type: 'GET',
	url: '/:id',
	handler: (req, res) => {
		postDb.get(req.params.id)
		  .then(post => {
		  	if(post != undefined){
		  		res.status(200).json(post);
		  	}else{
		  		res.status(404).json({ error: "Post not found."});
		  	}
		  })
		  .catch(err => {
		  	console.log(err);
			res.status(500).json({ error: "Could not retrieve post." });
		  })
	}
}