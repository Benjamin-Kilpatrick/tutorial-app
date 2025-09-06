
//use admin
//
db = db.getSiblingDB("docs");
db.createUser(
  {
    user: "user",
    pwd:  "password",
    roles: [ { role: "readWrite", db: "docs" } ]
  }
)

