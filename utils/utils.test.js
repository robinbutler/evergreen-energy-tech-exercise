const {
  calculateHeatLossFactor,
  calculatePowerHeatLoss,
  costBreakDown,
  calculateHeatPump,
} = require("./utils");

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

describe("calculatePowerHeatLoss", () => {
  it("function returns an interger", () => {
    expect(typeof calculatePowerHeatLoss(10000, 1000)).toBe("number");
  });
  it("function can handle multiple different input values", () => {
    expect(calculatePowerHeatLoss(10, 2)).toBe(5);
    expect(calculatePowerHeatLoss(2000, 25)).toBe(80);
    expect(calculatePowerHeatLoss(1, 1)).toBe(1);
  });
});

describe("costBreakdown", () => {
  const testData = [
    {
      label:
        "Design & Supply of your Air Source Heat Pump System Components (5kW)",
      cost: 3947,
    },
    {
      label: "Installation of your Air Source Heat Pump and Hot Water Cylinder",
      cost: 2900,
    },
    {
      label: "Supply & Installation of your Homely Smart Thermostat",
      cost: 150,
    },
    { label: "Supply & Installation of a new Consumer Unit", cost: 300 },
    {
      label: "MCS System Commissioning & HIES Insurance-backed Warranty",
      cost: 1648,
    },
  ];
  it("function returns an object", () => {
    expect(typeof costBreakDown(testData)).toBe("object");
  });
  it("function returns correct values", () => {
    expect(costBreakDown(testData)).toEqual({
      "Design & Supply of your Air Source Heat Pump System Components (5kW)":
        "£3947",
      "Installation of your Air Source Heat Pump and Hot Water Cylinder":
        "£2900",
      "Supply & Installation of your Homely Smart Thermostat": "£150",
      "Supply & Installation of a new Consumer Unit": "£300",
      "MCS System Commissioning & HIES Insurance-backed Warranty": "£1648",
    });
  });
});

describe("calculateHeatPump", () => {
  const heatpumps = [
    {
      label: "8kW Package",
      outputCapacity: 8,
      costs: [
        {
          label:
            "Design & Supply of your Air Source Heat Pump System Components (8kW)",
          cost: 4216,
        },
        {
          label:
            "Installation of your Air Source Heat Pump and Hot Water Cylinder",
          cost: 2900,
        },
        {
          label: "Supply & Installation of your Homely Smart Thermostat",
          cost: 150,
        },
        { label: "Supply & Installation of a new Consumer Unit", cost: 300 },
        {
          label: "MCS System Commissioning & HIES Insurance-backed Warranty",
          cost: 1648,
        },
      ],
    },
    {
      label: "5kW Package",
      outputCapacity: 5,
      costs: [
        {
          label:
            "Design & Supply of your Air Source Heat Pump System Components (5kW)",
          cost: 3947,
        },
        {
          label:
            "Installation of your Air Source Heat Pump and Hot Water Cylinder",
          cost: 2900,
        },
        {
          label: "Supply & Installation of your Homely Smart Thermostat",
          cost: 150,
        },
        { label: "Supply & Installation of a new Consumer Unit", cost: 300 },
        {
          label: "MCS System Commissioning & HIES Insurance-backed Warranty",
          cost: 1648,
        },
      ],
    },
    {
      label: "16kW Package",
      outputCapacity: 16,
      costs: [
        {
          label:
            "Design & Supply of your Air Source Heat Pump System Components (16kW)",
          cost: 5421,
        },
        {
          label:
            "Installation of your Air Source Heat Pump and Hot Water Cylinder",
          cost: 2900,
        },
        {
          label: "Supply & Installation of your Homely Smart Thermostat",
          cost: 150,
        },
        { label: "Supply & Installation of a new Consumer Unit", cost: 300 },
        {
          label: "MCS System Commissioning & HIES Insurance-backed Warranty",
          cost: 1648,
        },
      ],
    },
    {
      label: "12kW Package",
      outputCapacity: 12,
      costs: [
        {
          label:
            "Design & Supply of your Air Source Heat Pump System Components (12kW)",
          cost: 5138,
        },
        {
          label:
            "Installation of your Air Source Heat Pump and Hot Water Cylinder",
          cost: 2900,
        },
        {
          label: "Supply & Installation of your Homely Smart Thermostat",
          cost: 150,
        },
        { label: "Supply & Installation of a new Consumer Unit", cost: 300 },
        {
          label: "MCS System Commissioning & HIES Insurance-backed Warranty",
          cost: 1648,
        },
      ],
    },
  ];
  it("function returns an object", () => {
    expect(typeof calculateHeatPump(5, heatpumps)).toBe("object");
  });
  it("function selects appropriate heatpump for different heatloss levels", () => {
    expect(calculateHeatPump(5, heatpumps)).toEqual({
      label: "5kW Package",
      outputCapacity: 5,
      costs: [
        {
          label:
            "Design & Supply of your Air Source Heat Pump System Components (5kW)",
          cost: 3947,
        },
        {
          label:
            "Installation of your Air Source Heat Pump and Hot Water Cylinder",
          cost: 2900,
        },
        {
          label: "Supply & Installation of your Homely Smart Thermostat",
          cost: 150,
        },
        { label: "Supply & Installation of a new Consumer Unit", cost: 300 },
        {
          label: "MCS System Commissioning & HIES Insurance-backed Warranty",
          cost: 1648,
        },
      ],
    });
    expect(calculateHeatPump(14, heatpumps)).toEqual({
      label: "16kW Package",
      outputCapacity: 16,
      costs: [
        {
          label:
            "Design & Supply of your Air Source Heat Pump System Components (16kW)",
          cost: 5421,
        },
        {
          label:
            "Installation of your Air Source Heat Pump and Hot Water Cylinder",
          cost: 2900,
        },
        {
          label: "Supply & Installation of your Homely Smart Thermostat",
          cost: 150,
        },
        { label: "Supply & Installation of a new Consumer Unit", cost: 300 },
        {
          label: "MCS System Commissioning & HIES Insurance-backed Warranty",
          cost: 1648,
        },
      ],
    });
  });
});
