let fs = require("fs");


fs.readFile("./data/building_latitude_longitude.json", "utf8", (err, data) => {
    // console.log(data);

    let arr = JSON.parse(data);
    let dataObject = {};

    for (let element of arr) {
        let address = element["address"];
        let lat = element["lat"];
        let lon = element["lon"];
        dataObject[address] = {"lat": lat, "lon": lon};
    }

    let dataString = JSON.stringify(dataObject, null, 3);
    fs.writeFileSync("./data/data.json", dataString);
});
