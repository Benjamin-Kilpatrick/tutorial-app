
## Run the project
```bash
# generate secret token
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# assign the generated token to an environment variable line JWT_SECRET=<your token here>
vim .env 

# run the Docker containers
sudo docker compose --env-file .env up --build 
```
