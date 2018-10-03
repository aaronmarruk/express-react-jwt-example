# express-react-jwt-example

This is a super simple Express.js + React + JWT example. I've built this purely as a quick-start tool for my own Express + React hacking projects. 

I'm using Solus OS (Linux), so instructions will be geared towards that.

install all the things
npm i

install the client depts
cd client
npm i

Install Mongo
sudo eopkg install mongodb

Create the /data/db directory so mongo can run
sudo mkdir /data
sudo mkdir /data/db
chmod 777 /data/db

Start the Mongo daemon 
mongod

Create a express-react-jwt-example db so mongo can rnu
mongo
use express-react-jwt-example

start the server
JWT_SECRET=yoursupersecret npm run dev

start the client
cd client
npm start

# Start the shell
mongo

# Use the zenwriter db
use zenwriter

# Show collections (only shows collections which have items)
show collections

# Find all users
db.users.find()

# Insert into collection
db.notes.insert({title: 'My note'})

# Find notes by userId
db.notes.find({'userId': '5b1402b6c5058e1c2389fb9f'})

# Delete note by ID
db.notes.remove('noteid')
