const express = require('express');
const app = express();
const fs = require('fs').promises;
const cors = require('cors');

const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send(`UBC Geolocation Service is running at: http://localhost:${3000}/`);
});

/**
 * fetches the latitude and longitude of the given address if it exists inside the database
 * returns: an object of the form {lat: number, lon: number} or an error
 */
app.get("/:address", (req, res) => {
    let urlEncodedAddress = req.params.address;
    let address = decodeURI(urlEncodedAddress);

    fs.readFile("./Data/data.json", "utf8")
        .then((dataString) => {
            let data = JSON.parse(dataString);
            let latLonObj = data[address];

            // if latLonObj is not null, then the address has an entry in our dataset
            if (latLonObj) {
                res.status(200).json(latLonObj);
            } else {
                res.status(404).json({error: `Couldn't find a building with the address: ${address}`});
            }
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

module.exports = app;