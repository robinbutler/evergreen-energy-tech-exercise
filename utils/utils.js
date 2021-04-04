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
module.exports = { calculateHeatLossFactor, calculatePowerHeatLoss };
