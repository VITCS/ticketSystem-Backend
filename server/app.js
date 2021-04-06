// Importing Node modules and initializing Express
const express = require('express'),
      app = express(),
      router = require('./routes'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');
      path = require('path');

//always use environment variables to store this information
//and call it in a seperate file.

//const databse =   'mongodb+srv://test:test@cluster0-wys22.mongodb.net/test?retryWrites=true&w=majority'

const databse = 'mongodb://127.0.0.1:27017/test?retryWrites=true&w=majority'
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:admin@cluster0.kcnmv.mongodb.net/test?retryWrites=true&w=majority";
// const client = new mongoose(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// const databse = 'mongodb+srv://admin:admin@cluster0.kcnmv.mongodb.net/test?retryWrites=true&w=majority'
// // Database Setup
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(databse, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', () => {
    console.error.bind(console, 'MongoDB connection error:')
});

db.on("connected", () => {
    console.log("Connected to database");
});

// Import routes to be served
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }

  const port = process.env.PORT || 5000;
// Start the server
app.listen(port, ()=>{
    console.log('Your server is running on port ' + port + '.');
});
