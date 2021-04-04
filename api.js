const fs = require("fs");

const readHouseJSON = (filepath) => {
  fs.readFile(`${filepath}`, { encoding: "utf8" }, function read(err, data) {
    if (err) {
      throw err;
    }
    const housingData = data;
    console.log(housingData);
  });
};

readHouseJSON("./data/houses.json");
