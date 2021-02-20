/* Body-parser is a middleware. 
They help to tidy up the request object before we use them. 
Express lets us use middleware with the use method.*/
const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express()



// server.js
//This lets us know whether Node is running properly.
console.log('Boba Fett is the best bounty hunter and character in Star Wars')


// connect to MongoDB through the MongoClient's connect method
const connectionString = "mongodb+srv://Austyn:1234@cluster0.8jq7o.mongodb.net/dataForWebAppDatabase?retryWrites=true&w=majority";


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {

    //removing the deprecation warning
    //if (err) return console.error(err)
    console.log('Connected to Database')

    //We need the db variable from the connection to to access MongoDB.
    const dB = client.db('dataForWebAppDatabase'); 


    /*We need to create a collection before we can store items into a database. 
        Here’s a simple analogy to help you clear up the terms in MongoDB:

        Imagine a Database is a Room.
        A Room contains boxes (collections).

    Like Databases, you can name collections anything you want. 
    In this case, let’s store quotes into a events collection. 
    We use db.collection to specify the collection. */
    const eventsCollection = dB.collection("events");


    // ========================
    // Middlewares
    // ========================

    /*Need to set view engine to ejs. This tells Express we’re using EJS as the template engine. 
    You can need to place it before any app.use, app.get or app.post methods. */
    app.set('view engine', 'ejs')

    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))
    /*The urlencoded method within body-parser tells body-parser to extract data from the 
    <form> element and add them to the body property in the request object.*/

    app.use(bodyParser.json())
    app.use(express.static('public'))



    // ========================
    // Routes
    // ========================

    /*In Express, we handle a GET request with the get method:
    app.get(endpoint, callback)
    endpoint is the requested endpoint. 
    It’s the value that comes after your domain name.
        callback tells the server what to do when the requested endpoint matches 
    the endpoint stated. 
    It takes two arguments: A request object and a response object.
    */
    // We normally abbreviate `request` to `req` and `response` to `res`.
    app.get('/', (req, res) => {
    /*write Hello World back to the browser. 
    We do so by using a send method that comes with the response object
    res.send('Hello World')*/


    //serve up an index.html page back to the browser. 
    //To do this, we use the sendFile method that’s provided by the res object
    ///c/Users/Owner/OneDrive/Desktop/1.UCLA Stuff/Computer Science/Computer Science 97/Final Web App Project/Other/star-wars-example
    //use pwd
    //Don't need the C in front
    //make sure to put ' ' around the directory that I am in
    //res.sendFile('/Users/Owner/OneDrive/Desktop/1.UCLA Stuff/Computer Science/Computer Science 97/Final Web App Project/Other/star-wars-example' + '/index.html')
    // Note: __dirname is the current directory you're in.
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.

        dB.collection('quotes').find().toArray()
            .then(quotes => {
                res.render('index.ejs', { quotes: quotes })
            })
            .catch(/* ... */)
    })

    /*We can handle this POST request with a post method in server.js. 
    The path path should be the value you placed in the action attribute. */
    app.post('/events', (req, res) => {
        //console.log('Hellooooooooooooooooo!')

        //You should be able to see values from the <form> element inside req.body now. 
        //console.log(req.body)

        //We can use the insertOne method to add items into a MongoDB collection.
        eventsCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
            })
        .catch(error => console.error(error))
    })

    app.put('/quotes', (req, res) => {
        eventsCollection.findOneAndUpdate(
          { name: 'Yoda' },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote
            }
          },
          {
            upsert: true
          }
        )
          .then(result => res.json('Success'))
          .catch(error => console.error(error))
      })
  
      app.delete('/quotes', (req, res) => {
        eventsCollection.deleteOne(
          { name: req.body.name }
        )
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No quote to delete')
            }
            res.json('Deleted Darth Vadar\'s quote')
          })
          .catch(error => console.error(error))
        })

})


/* need to create a server that browsers can connect to. 
We do this by using the Express’s listen method.*/
app.listen(3000, function() {
    console.log('listening on 3000')
  })