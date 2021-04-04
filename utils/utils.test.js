const { calculateHeatLossFactor } = require("./utils");

describe("calculateHeatLossFactor", () => {
  it("Output returns an interger result", () => {
    expect(
      typeof calculateHeatLossFactor({
        submissionId: "4cb3820a-7bf6-47f9-8afc-3adcac8752cd",
        designRegion: "Severn Valley (Filton)",
        floorArea: 125,
        age: "1967 - 1975",
        heatingFactor: 101,
        insulationFactor: 1.3,
      })
    ).toBe("number");
  });
  it("Output returns expected value for given home", () => {
    expect(
      calculateHeatLossFactor({
        submissionId: "4cb3820a-7bf6-47f9-8afc-3adcac8752cd",
        designRegion: "Severn Valley (Filton)",
        floorArea: 125,
        age: "1967 - 1975",
        heatingFactor: 101,
        insulationFactor: 1.3,
      })
    ).toBe(16412.5);
  });
  it("Function can work on homes with different values", () => {
    expect(
      calculateHeatLossFactor({
        submissionId: "4cb3820a-7bf6-47f9-8afc-3adcac8752cd",
        designRegion: "Severn Valley (Filton)",
        floorArea: 125,
        age: "1967 - 1975",
        heatingFactor: 101,
        insulationFactor: 1.3,
      })
    ).toBe(16412.5);
    expect(
      calculateHeatLossFactor({
        submissionId: "4cb3820a-7bf6-47f9-8afc-3adcac8752cd",
        designRegion: "Severn Valley (Filton)",
        floorArea: 100,
        age: "1967 - 1975",
        heatingFactor: 50,
        insulationFactor: 2.0,
      })
    ).toBe(10000);
  });
});
