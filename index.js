// import your node modules

const express = require('express');
const userDb = require('./src/db/user.js');
const postDb = require('./src/db/post.js');
const server = express();
const requireAll = require('require-all');
var _ = require('lodash');
server.use(express.json());

// add your server code starting here
server.listen(5000, () => console.log('server running'));


process.setMaxListeners(0);

const controllers = requireAll(__dirname + '/src/endpoints');
_.each(controllers, (endpoints, controller) => {
  _.each(endpoints, (definition, endpoint) => {
  	console.log(`${endpoint}: /api/${controller}${definition.url}`);
    server[definition.type.toLowerCase()](`/api/${controller}${definition.url}`, definition.handler);
  });
});


// ******** USERS ***********
/*
//Create
server.post('/api/users', (req, res) => {
	if(req.body.name === undefined || req.body.name === '' || req.body.name.length > 128 ){
		res.status(400).json({ error: "Please provide a valid user name." });
	}else{
		userDb.insert({name: req.body.name})
		  .then(userId => {
		  	res.status(201).json(userId);
		  })
		  .catch(err => {
			res.status(500).json({ error: "There was an error while saving the user to the database." });
		  });
	}
});

//Retrieve
server.get('/api/users/:id', (req, res) => {
	const id = req.params.id;
	userDb.get(id)
	  .then(user => {
	  	res.status(200).json(user);
	  })
	  .catch(err => {
		res.status(500).json({ error: "The user information could not be retrieved." });
	  })
});

server.get('/api/users/', (req, res) => {
	userDb.get()
	  .then(users => {
	  	res.status(200).json(users);
	  })
	  .catch(err => {
		res.status(500).json({ error: "The user information could not be retrieved." });
	  })
});
/*
//Update
server.put('/api/users/:id', (req, res) => {
	const id = req.params.id;
	console.log(id);
	userDb.get(id)
	  .then(user => {
	  	if (user != undefined) {
	  		if(req.body.name === '' || req.body.name.length > 128){
				res.status(400).json({ error: "Please provide a valid user name." });
			}else{
				user.name = req.body.name;
				userDb.update(id, user)
				.then(usersUpdatedCount => {
					if(usersUpdatedCount === 1){
						res.status(200).json(user);
					}else{
						res.status(202).json({message: "Request accepted, however no users were updated."});
					}
				})
		  		.catch(err => {
		  			res.status(500).json({ error: "The user information could not be modified." });
		  		});
	  		}
	  	}else{
	  		res.status(404).json({ error: "The user with the specified ID does not exist." });
	  	}
	  })
	  .catch(err => {
		res.status(500).json({ error: "The user information could not be retrieved." });
	  })
});

//Delete
server.delete('/api/users/:id', (req, res) => {
	const id = req.params.id;
	userDb.get(id)
	  .then(user => {
	  	if (user != undefined) {
	  		userDb.remove(id)
	  		.then(numberOfUsersRemoved => {
	  			if(numberOfUsersRemoved === 1){
					res.status(202).json({message: "User successfully deleted."});
				}else{
					res.status(202).json({message: "Request accepted but no object deleted."});
				}
	  		})
	  		.catch(err => {
	  			res.status(500).json({ error: "The user could not be removed." });
	  		});
	  	}else{
	  		res.status(404).json({ error: "The user with the specified ID does not exist." });
	  	}
	  })
	  .catch(err => {
		res.status(500).json({ error: "The user information could not be retrieved." });
	  })
});


// ******** POSTS ***********
//Create
server.post('/api/posts', (req, res) => {
	if(req.body.text === undefined || req.body.text === '' || typeof req.body.text != "string" || req.body.userId === undefined || typeof req.body.userId != "number"){
		res.status(400).json({ error: "Please provide valid post details." });
	}else{
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
	}
});

//Retrieve
server.get('/api/posts/:id', (req, res) => {
	const id = req.params.id;
	postDb.get(post)
	  .then(post => {
	  	res.status(200).json(post);
	  })
	  .catch(err => {
		res.status(500).json({ error: "The post information could not be retrieved." });
	  })
});

server.get('/api/posts/', (req, res) => {
	postDb.get()
	  .then(posts => {
	  	res.status(200).json(posts);
	  })
	  .catch(err => {
		res.status(500).json({ error: "The post information could not be retrieved." });
	  })
});
/*
*/
//UPDATE
/*
const myObject = {
	posts: {
		createPost: {
			type: 'PUT',
			url: '/:id',
			handler: (req, res) => {}
		},
		updatePost: {...}
	}
	user: {...}
}
*/

/*
//Delete
server.delete('/api/posts/:id', (req, res) => {
	const id = req.params.id;
	postDb.get(id)
	  .then(user => {
	  	if (user != undefined) {
	  		postDb.remove(id)
	  		.then(numberOfUsersRemoved => {
	  			if(numberOfUsersRemoved === 1){
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
});
*/
