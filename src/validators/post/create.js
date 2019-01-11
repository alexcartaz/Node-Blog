const express = require('express');
const userDb = require('../../db/user.js');
const ValidationError = require('../validationError'); 

module.exports = {
	text: (newPost) => {
    	if (newPost.text === undefined || newPost.text === '' || typeof newPost.text != "string") {
      		throw new ValidationError('Post text must contain actual text.');
      	}
      return true;
	},
	userId: (newPost) => {
		return userDb.get(newPost.userId)
		.then(user => {
			if(user === undefined){
				throw new ValidationError('Post user ID must reference a valid user.')
			}else{
				return true;
			}
		})
	}
};