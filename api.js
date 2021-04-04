const fs = require("fs");
const { calculateHeatLossFactor } = require("./utils/utils");

const readHouseJSON = (filepath) => {
  fs.readFile(`${filepath}`, { encoding: "utf8" }, function read(err, data) {
    if (err) {
      throw err;
    }
    const housingData = data;
    processHousesJSON(housingData);
  });

  const processHousesJSON = (houses) => {
    houses = JSON.parse(houses);
    let billingForm = houses.map((house) => ({
      submissionId: house.submissionId,
      designRegion: house.designRegion,
      estimatedHeatLoss: calculateHeatLossFactor(house),
      degreeDays: null,
    }));
    console.log(billingForm);
  };
};

readHouseJSON("./data/houses.json");
