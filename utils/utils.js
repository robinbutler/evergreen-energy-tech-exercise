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

const costBreakDown = (packageCosts) => {
  labels = packageCosts.map((label) => label.label);
  costs = packageCosts.map((cost) => "£" + cost.cost);
  result = {};

  labels.forEach(function (label, i) {
    result[label] = costs[i];
  });
  return result;
};
module.exports = {
  calculateHeatLossFactor,
  calculatePowerHeatLoss,
  costBreakDown,
};
