// https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144

const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const backend_port = process.env.BACKEND_PORT || 3002;
const mongo_username = process.env.MONGO_USERNAME || "auth";
const mongo_password = process.env.MONGO_PASSWORD || "password";
const mongo_host = process.env.MONGO_HOST || "mongo";
const mongo_port = process.env.MONGO_PORT || 27017;
const mongo_db_name = process.env.MONGO_DB_NAME || "user";
const mongo_auth_source = process.env.MONGO_AUTH_SOURCE || mongo_db_name; 
const mongo_collection = process.env.MONGO_COLLECTION || "users";
const salt_rounds = process.env.SALT_ROUNDS || 10;
const secret_key = process.env.SECRET_KEY;
console.log(secret_key);

const MongoClient = mongodb.MongoClient;

const url = `mongodb://${mongo_username}:${mongo_password}@${mongo_host}:${mongo_port}/${mongo_db_name}?authSource=${mongo_auth_source}`;

console.log(url);

const app = express();

async function start() {
  try {
    const mongoclient = new MongoClient(url);
    await mongoclient.connect();
    console.log("MongoDB connected");

    const usersCollection = mongoclient.db(mongo_db_name).collection(mongo_collection);

    app.use(express.json());

    app.post('/register', cors(), async (req, res) => {
         
	 const {username, email, password} = req.body;
	 try {
                
                if (typeof username == 'undefined') {
			res.status(500).json({err: "username field is empty"});
		}
		if (typeof email == 'undefined') {
			res.status(500).json({err: "email field is empty"});
		}
		if (typeof password == 'undefined') {
			res.status(500).json({err: "password field is empty"});
		}
                
                var filter = {username: username};

		const user = await usersCollection.findOne(filter);

		if (user === null){
			const salt = await bcrypt.genSalt(salt_rounds);
			const hashedPassword = await bcrypt.hash(password, salt);
			const user = {
				username,
				email,
				password: hashedPassword
			}
			usersCollection.insertOne(user);
			res.json({message: 'Registration Successful'});
		}
		else{
			res.send({err: "Username is already in use"});
		}
        } catch(err) {
                console.error(err);
                res.status(500).send({err: "error"});
        }
    });

    app.post('/login', cors(), async (req, res) => {
	    const {username, password} = req.body;
	    try {
		    if (typeof username == 'undefined') {
			    res.status(500).json({err: "username field is empty"});
		    }
		    if (typeof password == 'undefined') {
			    res.status(500).json({err: "password field is empty"});
		    }
		    var filter = {username: username};

		    const user = await usersCollection.findOne(filter);

		    if (!(user === null)){
			    if (await bcrypt.compare(password, user.password)){
				    const token = jwt.sign({ userId: user._id }, secret_key, {
					    expiresIn: '1 hour'
				    });
				    res.json(token);
			    }
			    else{
				    res.status(401).json({err: "Invalid credentials"});
			    }
		    }
		    else{
			    res.status(401).json({err: "Invalid credentials"});
		    }
	    }
	    catch(err){
		    console.log(err);
		    res.status(500).json({err: "error"});
	    }
    });



	
    app.use(cors({origin: '*'}));


    app.listen(backend_port, () => {
      console.log(`Server running on port ${backend_port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
