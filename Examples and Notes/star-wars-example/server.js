// server.js
console.log("May Node be with you");

const express = require("express"); // import express library
const bodyParser = require("body-parser"); // import body parser library
const MongoClient = require("mongodb").MongoClient; // import mongodb library
const app = express();

// neeed to have bodyparer before CRUD handlers
// app.use(bodyParser.urlencoded({extended: true}))
// urlendcoded tells bodyparser to extract data from the form element and put them in the body of the req object

// connectrion string is uri
const uri =
  "mongodb+srv://yoda:greenguy@cluster0.qwmty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(uri, { useUnifiedTopology: true }) // removing the deprecation warning
  .then((client) => {
    console.log("connected to database");
    const db = client.db("dataForWebAppDatabase");
    const eventsCollection = db.collection("events");

    // tells express we are just ejs template engine
    app.set("view engines", "ejs");

    // need to put before CRUD handlers
    app.use(express.static("public"));

    app.use(bodyParser.urlencoded({ extended: true }));

    // teach server to read json
    app.use(bodyParser.json());

    // handle the put request
    app.put("/events", (req, res) => {
      eventsCollection
        .findOneAndUpdate(
          { name: "Yoda" },
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

        .then((result) => {
          // res.json('Sucess')
          console.log(result);
        })

        .catch((error) => console.error(error));
    });

    app.get("/", (req, res) => {
      // res.sendFile(__dirname + '/index.html')

      // find method returns a cursor
      const cursor = db.collection("events").find();
      console.log(cursor);

      // cursor contains all quotes from database
      // we can see all our quotes in the terminal
      db.collection("events")
        .find()
        .toArray()
        .then((results) => {
          // console.log(results)
          res.render("index.ejs", { events: results });
        })
        .catch((error) => console.error(error));

      // res.render('index.ejs', {})
    });

    app.get("/", (req, res) => {
      if (req.query.search) {
        db.collection("events").find(
          {
            Day: req.query.search[0],
            Month: req.query.search[1],
            Year: req.query.search[2]
          },
          function (err, allEvents) {
            res.render("events/index", { events: allEvents, noMatch: noMatch });
          }
        );
      }
    });

    //router.get("/", function(req, res){
    //var noMatch = null;
    //if(req.query.search) {
    //const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    //// Get all campgrounds from DB
    //Campground.find({name: regex}, function(err, allCampgrounds){
    //if(err){
    //console.log(err);
    //} else {
    //if(allCampgrounds.length < 1) {
    //noMatch = "No campgrounds match that query, please try again.";
    //}
    //res.render("campgrounds/index",{campgrounds:allCampgrounds, noMatch: noMatch});
    //}
    //});
    //} else {
    //// Get all campgrounds from DB
    //Campground.find({}, function(err, allCampgrounds){
    //if(err){
    //console.log(err);
    //} else {
    //res.render("campgrounds/index",{campgrounds:allCampgrounds, noMatch: noMatch});
    //}
    //});
    //}
    //});

    app.post("/events", (req, res) => {
      eventsCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.listen(3000, () => {
      console.log("listening on 3000");
    });
  })

  .catch(console.error);
