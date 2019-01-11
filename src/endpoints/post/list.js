const express = require('express');
const userDb = require('../../db/user.js');
const postDb = require('../../db/post.js');
//const validators = require('../../validators/post/update.js');

module.exports = {
	type: 'GET',
	url: 's/',
	handler: (req, res) => {
		postDb.get()
		  .then(posts => {
		  	res.status(200).json(posts);
		  })
		  .catch(err => {
		  	console.log(err);
			res.status(500).json({ error: "Could not retrieve posts." });
		  })
	}
}