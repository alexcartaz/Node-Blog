const express = require('express');
const ValidationError = require('../validationError'); 

module.exports = {
	name: (modifiedUser) => {
		console.log(modifiedUser);
      if (modifiedUser.name === undefined || modifiedUser.name === '' || typeof modifiedUser.name != "string" || modifiedUser.name.length > 128) {
      	throw new ValidationError('Post text must contain actual text.');
      }
      return true;
	}
};