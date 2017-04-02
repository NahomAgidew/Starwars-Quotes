const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

const app = express();
var db;
MongoClient.connect('mongodb://<username>:<password>@ds147920.mlab.com:47920/star-wars-quotes', (err, database) => {
    if(err){
        return console.log(err);
    }
    db = database;
    app.listen(3000, function () {
        console.log('listening on 3000');
    });
});

//using middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray(function(err, result) {
        if(err) return console.log(err);
        res.render('index.ejs', {quotes: result});
    });
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if(err) return console.log(err);
        console.log('saved to database');
        res.redirect('/');
    });
});

