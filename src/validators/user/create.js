const express = require('express');
const ValidationError = require('../validationError'); 

module.exports = {
	name: (newUser) => {
      if (newUser.name === undefined || newUser.name === '' || typeof newUser.name != "string" || newUser.name.length > 128) {
      	throw new ValidationError('Post text must contain actual text.');
      }
      return true;
	}
};