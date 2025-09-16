db = db.getSiblingDB("user");
db.createUser(
  {
    user: "auth",
    pwd:  "password",
    roles: [ { role: "readWrite", db: "user" } ]
  }
)

