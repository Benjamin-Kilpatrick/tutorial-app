db = db.getSiblingDB("docs");

db.pages.insertOne({ text: "Database initialized successfully!" , name: "page0"});
