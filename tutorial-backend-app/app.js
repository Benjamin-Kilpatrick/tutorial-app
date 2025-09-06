// reference 
// https://altcademy.com/blog/how-to-connect-to-database-in-reactjs/
// https://stackoverflow.com/questions/14045509/how-can-you-specify-the-mongodb-username-and-password-using-a-server-instance

const log = (...args) => process.stdout.write(args.join(' ') + '\n');


const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3001;
const mongo_db_name = "docs";
const mongo_pages_collection = "pages";
const mongo_username = "root";//"user";
const mongo_password = "root";//"password";
const mongo_host = "mongo";
const mongo_port = 27017;

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const ServerApiVersion = mongodb.ServerApiVersion;

const url = `mongodb://${mongo_username}:${mongo_password}@${mongo_host}:${mongo_port}/${mongo_db_name}?authSource=admin`;
console.log(" ---------------> " + url);



async function start() {
  try {
    const mongoclient = new MongoClient(url);
    await mongoclient.connect();
    console.log("MongoDB connected");

    const pagesCollection = mongoclient.db(mongo_db_name).collection(mongo_pages_collection);
    
    app.get('/', cors(), (req, res) => {
        res.send('Hello World!')
    });

    app.get('/pages', cors(), async (req, res) => {
        //console.log(req);
	try {
		var filter = {};
		console.log(JSON.stringify(req.query));
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

	  /*
    app.use((req, res, next) => {
	console.log("Got request adding CORS headers");
        res.header('Access-Control-Allow-Origin', 'http://172.19.0.4:3000');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
        // Handle preflight OPTIONS requests
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }
        next();
    });
    */
    app.use(cors({origin: '*'}));


    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

