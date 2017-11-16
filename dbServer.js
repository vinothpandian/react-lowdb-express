const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

const adapter = new FileAsync('./src/assets/datastore/db.json');

low(adapter)
    .then(db => {

        // GET /dictionary
        app.get('/', (req, res) => {
            const post = db.get('dictionary').value();

            res.json(post)
        });

        // POST /dictionary
        app.post('/', (req, res) => {
            db.get('dictionary')
                .push(req.body)
                .first()
                .assign({ id: Date.now().toString() })
                .write()
                .then(post => {
                    console.log(post);
                    res.json(post)
                })
        });

        // Set db default values
        return db.defaults({ dictionary: [] }).write()
    })
    .then(() => {
        app.listen(3000, () => console.log('listening on port 3000'))
    });