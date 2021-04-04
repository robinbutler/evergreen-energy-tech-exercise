const indentString = require("indent-string");

const calculateHeatLossFactor = (homeData) => {
  const floorArea = homeData.floorArea;
  const heatingFactor = homeData.heatingFactor;
  const insulationFactor = homeData.insulationFactor;
  const heatLossFactor = floorArea * heatingFactor * insulationFactor;
  return heatLossFactor;
};

const calculatePowerHeatLoss = (heatLoss, degreeDays) => {
  const powerHeatLoss = heatLoss / degreeDays;
  return powerHeatLoss;
};

const calculateHeatPump = (heatloss, heatPumps) => {
  let reccomendedPump = { outputCapacity: 20 };
  heatPumps.forEach((pump) => {
    if (
      pump.outputCapacity <= reccomendedPump.outputCapacity &&
      pump.outputCapacity >= heatloss
    )
      reccomendedPump = pump;
  });
  return reccomendedPump;
};

const costBreakDown = (packageCosts) => {
  labels = packageCosts.map((label) => label.label);
  costs = packageCosts.map((cost) => "£" + cost.cost);
  result = {};

  labels.forEach(function (label, i) {
    result[label] = costs[i];
  });
  return result;
};

const totalPlusVAT = (packageCosts) => {
  costs = packageCosts.map((cost) => cost.cost);
  total = costs.reduce((a, b) => a + b, 0) * 1.15;
  return total;
};

const generateFormCosts = (costs) => {
  let costsBreakdown = "";
  for (const [key, value] of Object.entries(costs)) {
    line = indentString(`${key}, ${value} \n`, 5);
    costsBreakdown = costsBreakdown + line;
  }
  return costsBreakdown;
};

const generateForm = (house) => {
  let form = "";
  if (isNaN(house.powerHeatLoss) === false) {
    form = `\n \n
  ------------------------------------- \n
  ${house.submissionId} \n 
  -------------------------------------
  Estimated Heat Loss = ${house.estimatedHeatLoss} (kWh)
  Design Region = ${house.designRegion}
  Power Heat Loss = ${house.powerHeatLoss} (kW)
  Recommended Heat Pump = ${house.reccomendedHeatPump}
  Cost Breakdown
${generateFormCosts(house.costs)}
  Total Cost, Including VAT = ${house.total}`;
  } else {
    form = `\n \n 
  ----------------------------- \n
  ${house.submissionId} \n 
  ------------------------------ 
  Estimated Heat Loss = ${house.estimatedHeatLoss}
  Warning: Could not find design region
  `;
  }
  return form;
};

module.exports = {
  calculateHeatLossFactor,
  calculatePowerHeatLoss,
  calculateHeatPump,
  costBreakDown,
  totalPlusVAT,
  generateForm,
};
