const calculateHeatLossFactor = (homeData) => {
  const floorArea = homeData.floorArea;
  const heatingFactor = homeData.heatingFactor;
  const insulationFactor = homeData.insulationFactor;
  const heatLossFactor = floorArea * heatingFactor * insulationFactor;
  return heatLossFactor;
};

module.exports = { calculateHeatLossFactor };
