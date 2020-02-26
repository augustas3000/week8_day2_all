// This is the server file, we write server in here.

// require Express, so that its functionality is available to us.
const express = require('express');
// When we require Express, we are given a function. This function returns an object that provides us with various methods that we’ll need to create a server. Let’s invoke express and store the returned object in a variable called app:
const app = express();

const parser = require('body-parser');
const cors = require('cors');

// Let’s start by requiring the MongoDB Driver that we previously installed in server.js, and accessing the MongoClient object.
const MongoClient = require('mongodb').MongoClient;
// require router helper method.
const createRouter = require('./helpers/create_router.js');

app.use(cors());
app.use(parser.json());



// In order to interact with databases from inside our JavaScript applications, we are going to use the MongoDB Driver’s API. The MongoDB Driver is an npm package, so we need to install it - npm i mongodb


// driver providing a way to connect to db
// asynchronous function, so we use .then()
// client  is the output of this methond - MongoClient


// We want the routing for the games resource to be handled by a games router. Inside server.js we are going to connect to the games_hub database, access the games collection, and create a games router, passing it an object representing the games collection, so that the games router can interact with the games collection in each of its routes.

// We will use MongoClient’s connect method to connect to the MongoDB server. connect takes one argument: A URL. The URL must consist of MongoDB’s proprietary access mechanism (rather than HTTP which you will have more commonly seen), the location and the port number. MongoDB server runs on port 27017 by default. Also connect is asynchronous method .
MongoClient.connect('mongodb://localhost:27017') //asynch function returns a promise
.then((client) => {   //
  // client goes away, gets data from db and returns:
  const db = client.db('games_hub');
  // now we pick the collection of data(docs)
  const gamesCollection = db.collection('games');
  const gamesRouter = createRouter(gamesCollection);

  app.use('/api/games', gamesRouter)

})
.catch(console.error); //if there is no error this will not trigger



// promises:
// We typically create a Promise when we want to retrieve data via some asynchronous operation. This could be requesting data from an API or a database, for example.
//
// Just like a real life promise that represents something that will happen in the future, a JavaScript Promise object represents the result of an asynchronous operation - this can be the completion or failure of the operation. We can write a Promise and then decide what to do once the asynchronous operation has completed. This allows us to pass fewer callbacks around, meaning that our code reads a bit more as if it were synchronous, which can be easier to follow.
//
//  When we create a Promise object it will be pending until the asynchronous operation that we are wrapping has completed. Then, just like a real life promise that can be kept or broken, the Promise object will either resolve, if successful, or reject if something goes wrong, allowing us to decide what to do next. We may want to render the data that was received, or perform some kind of error handling if the Promise rejected. We can also chain multiple asynchronous operations by chaining functions which return a Promise.



// set server to listen to requests on port 3000;
app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
