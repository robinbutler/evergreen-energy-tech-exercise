const fs = require("fs");
const axios = require("axios");
const {
  calculateHeatLossFactor,
  calculatePowerHeatLoss,
  calculateHeatPump,
  costBreakDown,
  totalPlusVAT,
  generateForm,
} = require("./utils/utils");

const readHouseJSON = (filepath) => {
  fs.readFile(`${filepath}`, { encoding: "utf8" }, function read(err, data) {
    if (err) {
      throw err;
    }
    const housingData = data;
    processJSON(housingData);
  });

  const processJSON = (houses) => {
    houses = JSON.parse(houses);
    let billingForm = houses.map((house) => ({
      submissionId: house.submissionId,
      designRegion: house.designRegion,
      estimatedHeatLoss: calculateHeatLossFactor(house),
      degreeDays: null,
    }));

    billingForm = Promise.all(
      billingForm.map(async (house) => {
        return {
          ...house,
          degreeDays: await fetchWeatherData(house.designRegion),
        };
      })
    )
      .then((billingForm) => {
        billingForm = billingForm.map((house) => ({
          ...house,
          powerHeatLoss: parseInt(
            calculatePowerHeatLoss(house.estimatedHeatLoss, house.degreeDays),
            10
          ),
        }));
        parsePumpJSON("data/heat-pumps.json", billingForm);
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });

    const parsePumpJSON = (filepath, billingForm) =>
      fs.readFile(
        `${filepath}`,
        { encoding: "utf8" },
        function read(err, data) {
          if (err) {
            throw err;
          }
          const pumps = JSON.parse(data);
          billingForm = billingForm.map((house) => {
            if (house.degreeDays !== null) {
              return {
                ...house,
                reccomendedHeatPump: calculateHeatPump(
                  house.powerHeatLoss,
                  pumps
                ).label,
                costs: costBreakDown(
                  calculateHeatPump(house.powerHeatLoss, pumps).costs
                ),
                total:
                  "£" +
                  totalPlusVAT(
                    calculateHeatPump(house.powerHeatLoss, pumps).costs
                  ).toString(),
              };
            } else {
              return { ...house };
            }
          });
          billingForm.map((house) => {
            const outputForm = generateForm(house);
            console.log(outputForm);
            return outputForm;
          });
        }
      );
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

readHouseJSON("data/houses.json");

module.exports = { readHouseJSON };
