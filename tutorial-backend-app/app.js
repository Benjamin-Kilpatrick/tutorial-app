// reference 
// https://altcademy.com/blog/how-to-connect-to-database-in-reactjs/
// https://stackoverflow.com/questions/14045509/how-can-you-specify-the-mongodb-username-and-password-using-a-server-instance
// https://dev.to/hamzakhan/securing-your-expressjs-app-jwt-authentication-step-by-step-aom
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

const log = (...args) => process.stdout.write(args.join(' ') + '\n');


const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const port = process.env.BACKEND_PORT || 3001;
const mongo_db_name = process.env.MONGO_DB_NAME || "docs";
const mongo_pages_collection = process.env.MONGO_COLLECTION || "pages";
const mongo_username = process.env.MONGO_USERNAME || "user";
const mongo_password = process.env.MONGO_PASSWORD || "password";
const mongo_host = process.env.MONGO_HOST || "mongo";
const mongo_port = process.env.MONGO_PORT || 27017;
const mongo_auth_source = process.env.MONGO_AUTH_SOURCE || mongo_db_name;
const secret_key = process.env.SECRET_KEY;

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const ServerApiVersion = mongodb.ServerApiVersion;

const url = `mongodb://${mongo_username}:${mongo_password}@${mongo_host}:${mongo_port}/${mongo_db_name}?authSource=${mongo_auth_source}`;

const app = express();

// Middleware to protect routes
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    // Verify the token
    const jwt_token = token.split(' ')[1];
    const verified = jwt.verify(jwt_token, secret_key);
    req.user = verified;
    next();
  } catch (err) {
    console.log("Err while attempting to authenticate token: " + err);
    res.status(400).json({ message: 'Invalid Token' });
  }
};

async function start() {
  try {
    const mongoclient = new MongoClient(url);
    await mongoclient.connect();
    console.log("MongoDB connected");

    const pagesCollection = mongoclient.db(mongo_db_name).collection(mongo_pages_collection);
    
    app.use(cors({origin: '*'}));

    app.use(express.json());

    app.get('/', cors(), (req, res) => {
        res.send('Hello World!')
    });

    app.get('/pages', cors(), async (req, res) => {
	try {
		var filter = {};
		//console.log(JSON.stringify(req.query));
		const page_id = req.query.id;
		if (!(typeof page_id == 'undefined')) {
			filter["_id"] = new ObjectId(page_id);
		}
		const name = req.query.name

		if (!(typeof name == 'undefined')) {
			filter["name"] = name;
		}
		console.log("Filter: " + JSON.stringify(filter))
		const pages = await pagesCollection.find(filter).toArray();
		res.send(pages);
	} catch(err) {
		console.error(err);
		res.status(500).send({err: "error"});
	}
    });

    app.post('/pages', cors(), verifyToken, async(req, res) => {
	    try{
		    //const json_body = JSON.parse(req.body);
		    const page = {
			    name: req.body.name,
			    text: req.body.text,
			    owner: req.user.userId
		    }
		    const result = await pagesCollection.insertOne(page);
		    res.status(200).send({message: "Created New Page"});
	    }
	    catch(err){
		    console.log(err);
		    res.status(500).send({err: "error"});
	    }
    });
        
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

