const express = require('express');
const userDb = require('../../db/user.js');
const ValidationError = require('../validationError'); 

module.exports = {
	text: (modifiedPost) => {
    	if (modifiedPost.text === undefined || modifiedPost.text === '' || typeof modifiedPost.text != "string") {
      		throw new ValidationError('Post text must contain actual text.');
      	}
      return true;
	},
	userId: (modifiedPost) => {
		return userDb.get(modifiedPost.userId)
		.then(user => {
			if(user === undefined){
				throw new ValidationError('Post user ID must reference a valid user.')
			}else{
				return true;
			}
		})
	}
};