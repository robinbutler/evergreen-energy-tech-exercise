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

  const fetchWeatherData = (location) => {
    return axios
      .get(
        `https://063qqrtqth.execute-api.eu-west-2.amazonaws.com/v1/weather?location=${location}`,
        { headers: { "x-api-key": "f661f74e-20a7-4e9f-acfc-041cfb846505" } }
      )
      .then(({ data }) => {
        if (typeof data.location.degreeDays !== "undefined") {
          return parseInt(data.location.degreeDays, 10);
        }
      })
      .catch(function (error) {
        return null;
      });
  };
};

readHouseJSON("./data/houses.json");
