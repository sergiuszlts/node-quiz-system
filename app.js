const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const Validator = require('./Validator');
const NextValue = require("./NextValue.js"); //next free id for sequence

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/home.html'));
});
app.get('/quiz/:id', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/quiz.html'));
});

app.get('/add', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/add.html'));
});

app.get('/json/:idQ', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { "id": parseInt(req.params.idQ) };
        dbo.collection("quiz").findOne(query, function (err, result) {
            if (err) throw err;
            if (result) res.send(result);
            else res.send({ title: null });
            db.close();
        });
    });
});

app.get('/load-json-all', function (req, res) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("quiz").find({}, { projection: { _id: 0, title: 1, description: 1, id: 1 } }).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

app.post('/addQuiz', function (req, res) {
    let validator = new Validator(req.body);
    validator.start();
    if (validator.correct) {
        NextValue("quizid", (returnedId) => {
            req.body.id = returnedId; //set id from counters collection
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection("quiz").insertOne(req.body, function (err) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                });
            });
        });
    }
    else {
        console.log(validator.err);
    }
});

app.listen(port, () => console.log(`Listening on ${port}`));

