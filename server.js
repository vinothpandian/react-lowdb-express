const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const dataFile = require("./src/assets/datastore/db.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.get("/", (request, response) => {
    response.json(dataFile)
});

app.post("/", (request, response) => {
    dataFile.unshift(request.body);

    fs.writeFile("./src/assets/datastore/db.json", JSON.stringify(dataFile), 'utf8', function (err) {
        if(err){
            console.log(err);
        }
    })

    response.json(dataFile)

});


app.listen(3000, () => {
    console.log("API running on port 3000");
});