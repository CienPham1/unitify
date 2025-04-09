// Length converter
export const convertLength = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to meters first (base unit)
    const toMeters: Record<string, number> = {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.344
    };
  
    // Convert from meters to target unit
    const fromMeters: Record<string, number> = {
      mm: 1000,
      cm: 100,
      m: 1,
      km: 0.001,
      in: 39.3701,
      ft: 3.28084,
      yd: 1.09361,
      mi: 0.000621371
    };
  
    const meters = value * toMeters[fromUnit];
    return meters * fromMeters[toUnit];
  };
  
  // Mass converter
  export const convertMass = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to kilograms first (base unit)
    const toKilograms: Record<string, number> = {
      mg: 0.000001,
      g: 0.001,
      kg: 1,
      t: 1000,
      oz: 0.0283495,
      lb: 0.453592,
      st: 6.35029,
      USton: 907.185
    };
  
    // Convert from kilograms to target unit
    const fromKilograms: Record<string, number> = {
      mg: 1000000,
      g: 1000,
      kg: 1,
      t: 0.001,
      oz: 35.274,
      lb: 2.20462,
      st: 0.157473,
      USton: 0.00110231
    };
  
    const kilograms = value * toKilograms[fromUnit];
    return kilograms * fromKilograms[toUnit];
  };
  
  // Temperature converter
  export const convertTemperature = (value: number, fromUnit: string, toUnit: string): number => {
    if (fromUnit === toUnit) return value;
  
    let celsius = 0;
    
    // Convert to Celsius first
    switch (fromUnit) {
      case 'C':
        celsius = value;
        break;
      case 'F':
        celsius = (value - 32) * 5/9;
        break;
      case 'K':
        celsius = value - 273.15;
        break;
    }
    
    // Convert from Celsius to target unit
    switch (toUnit) {
      case 'C':
        return celsius;
      case 'F':
        return (celsius * 9/5) + 32;
      case 'K':
        return celsius + 273.15;
      default:
        return value;
    }
  };
  
  // Volume converter
  export const convertVolume = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to liters first (base unit)
    const toLiters: Record<string, number> = {
      ml: 0.001,
      l: 1,
      m3: 1000,
      tsp: 0.00492892,
      tbsp: 0.0147868,
      fl_oz: 0.0295735,
      cup: 0.236588,
      pt: 0.473176,
      qt: 0.946353,
      gal: 3.78541
    };
  
    // Convert from liters to target unit
    const fromLiters: Record<string, number> = {
      ml: 1000,
      l: 1,
      m3: 0.001,
      tsp: 202.884,
      tbsp: 67.628,
      fl_oz: 33.814,
      cup: 4.22675,
      pt: 2.11338,
      qt: 1.05669,
      gal: 0.264172
    };
  
    const liters = value * toLiters[fromUnit];
    return liters * fromLiters[toUnit];
  };
  
  // Time converter
  export const convertTime = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to seconds first (base unit)
    const toSeconds: Record<string, number> = {
      ms: 0.001,
      s: 1,
      min: 60,
      h: 3600,
      d: 86400,
      wk: 604800,
      mo: 2592000, // Approximation: 30 days
      yr: 31536000 // Approximation: 365 days
    };
  
    // Convert from seconds to target unit
    const fromSeconds: Record<string, number> = {
      ms: 1000,
      s: 1,
      min: 1/60,
      h: 1/3600,
      d: 1/86400,
      wk: 1/604800,
      mo: 1/2592000,
      yr: 1/31536000
    };
  
    const seconds = value * toSeconds[fromUnit];
    return seconds * fromSeconds[toUnit];
  };
  
  // Speed converter
  export const convertSpeed = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to meters per second first (base unit)
    const toMPS: Record<string, number> = {
      'm/s': 1,
      'km/h': 0.277778,
      'mph': 0.44704,
      'kn': 0.514444,
      'ft/s': 0.3048
    };
  
    // Convert from meters per second to target unit
    const fromMPS: Record<string, number> = {
      'm/s': 1,
      'km/h': 3.6,
      'mph': 2.23694,
      'kn': 1.94384,
      'ft/s': 3.28084
    };
  
    const mps = value * toMPS[fromUnit];
    return mps * fromMPS[toUnit];
  };
  
  // Energy converter
  export const convertEnergy = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to joules first (base unit)
    const toJoules: Record<string, number> = {
      J: 1,
      kJ: 1000,
      cal: 4.184,
      kcal: 4184,
      Wh: 3600,
      kWh: 3600000,
      eV: 1.602176634e-19,
      BTU: 1055.06
    };
  
    // Convert from joules to target unit
    const fromJoules: Record<string, number> = {
      J: 1,
      kJ: 0.001,
      cal: 0.239006,
      kcal: 0.000239006,
      Wh: 0.000277778,
      kWh: 2.77778e-7,
      eV: 6.241509e18,
      BTU: 0.000947817
    };
  
    const joules = value * toJoules[fromUnit];
    return joules * fromJoules[toUnit];
  };
  
  // Area converter
  export const convertArea = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to square meters first (base unit)
    const toSquareMeters: Record<string, number> = {
      mm2: 0.000001,
      cm2: 0.0001,
      m2: 1,
      ha: 10000,
      km2: 1000000,
      in2: 0.00064516,
      ft2: 0.092903,
      yd2: 0.836127,
      acre: 4046.86,
      mi2: 2589988.11
    };
  
    // Convert from square meters to target unit
    const fromSquareMeters: Record<string, number> = {
      mm2: 1000000,
      cm2: 10000,
      m2: 1,
      ha: 0.0001,
      km2: 0.000001,
      in2: 1550.0031,
      ft2: 10.7639,
      yd2: 1.19599,
      acre: 0.000247105,
      mi2: 3.861e-7
    };
  
    const squareMeters = value * toSquareMeters[fromUnit];
    return squareMeters * fromSquareMeters[toUnit];
  };
  
  // Pressure converter
  export const convertPressure = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to pascals first (base unit)
    const toPascals: Record<string, number> = {
      Pa: 1,
      kPa: 1000,
      bar: 100000,
      atm: 101325,
      torr: 133.322,
      psi: 6894.76
    };
  
    // Convert from pascals to target unit
    const fromPascals: Record<string, number> = {
      Pa: 1,
      kPa: 0.001,
      bar: 0.00001,
      atm: 9.86923e-6,
      torr: 0.00750062,
      psi: 0.000145038
    };
  
    const pascals = value * toPascals[fromUnit];
    return pascals * fromPascals[toUnit];
  };
  
  // Angle converter
  export const convertAngle = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to radians first (base unit)
    const toRadians: Record<string, number> = {
      deg: 0.0174533,
      rad: 1,
      grad: 0.015708,
      arcmin: 0.000290888,
      arcsec: 4.84814e-6
    };
  
    // Convert from radians to target unit
    const fromRadians: Record<string, number> = {
      deg: 57.2958,
      rad: 1,
      grad: 63.662,
      arcmin: 3437.75,
      arcsec: 206265
    };
  
    const radians = value * toRadians[fromUnit];
    return radians * fromRadians[toUnit];
  };
  
  // Quantity converter
  export const convertQuantity = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to units first (base unit)
    const toUnits: Record<string, number> = {
      unit: 1,
      dozen: 12,
      gross: 144,
      score: 20,
      hundred: 100,
      thousand: 1000,
      million: 1000000,
      billion: 1000000000
    };
  
    // Convert from units to target unit
    const fromUnits: Record<string, number> = {
      unit: 1,
      dozen: 1/12,
      gross: 1/144,
      score: 1/20,
      hundred: 1/100,
      thousand: 1/1000,
      million: 1/1000000,
      billion: 1/1000000000
    };
  
    const units = value * toUnits[fromUnit];
    return units * fromUnits[toUnit];
  };
  
  // Concentration converter
  export const convertConcentration = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to moles per cubic meter first (base unit)
    const toMolesPerCubicMeter: Record<string, number> = {
      'mol/m3': 1,
      'mmol/L': 1,
      'mol/L': 1000,
      'percent': 10, // Assuming 1% = 10 mol/m³ (simplified)
      'ppm': 0.01,   // Assuming 1 ppm = 0.01 mol/m³ (simplified)
      'ppb': 0.00001 // Assuming 1 ppb = 0.00001 mol/m³ (simplified)
    };
  
    // Convert from moles per cubic meter to target unit
    const fromMolesPerCubicMeter: Record<string, number> = {
      'mol/m3': 1,
      'mmol/L': 1,
      'mol/L': 0.001,
      'percent': 0.1,
      'ppm': 100,
      'ppb': 100000
    };
  
    const molesPerCubicMeter = value * toMolesPerCubicMeter[fromUnit];
    return molesPerCubicMeter * fromMolesPerCubicMeter[toUnit];
  };
  
  // Density converter
  export const convertDensity = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to kilograms per cubic meter first (base unit)
    const toKgPerCubicMeter: Record<string, number> = {
      'kg/m3': 1,
      'g/cm3': 1000,
      'lb/ft3': 16.0185,
      'lb/gal': 119.826
    };
  
    // Convert from kilograms per cubic meter to target unit
    const fromKgPerCubicMeter: Record<string, number> = {
      'kg/m3': 1,
      'g/cm3': 0.001,
      'lb/ft3': 0.0624279,
      'lb/gal': 0.00834541
    };
  
    const kgPerCubicMeter = value * toKgPerCubicMeter[fromUnit];
    return kgPerCubicMeter * fromKgPerCubicMeter[toUnit];
  };
  
  // Currency converter (simplified - would need real exchange rates in production)
  export const convertCurrency = (value: number, fromUnit: string, toUnit: string): number => {
    // Example exchange rates (as of a specific date)
    const toUSD: Record<string, number> = {
      USD: 1,
      EUR: 1.09,
      GBP: 1.27,
      JPY: 0.0067,
      CAD: 0.74,
      AUD: 0.66,
      CHF: 1.13,
      CNY: 0.14,
      INR: 0.012,
      RUB: 0.011
    };
  
    // Convert from USD to target currency
    const fromUSD: Record<string, number> = {
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      JPY: 149.25,
      CAD: 1.35,
      AUD: 1.52,
      CHF: 0.88,
      CNY: 7.14,
      INR: 83.33,
      RUB: 90.91
    };
  
    const usd = value * toUSD[fromUnit];
    return usd * fromUSD[toUnit];
  };
  
  // Force converter
  export const convertForce = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to newtons first (base unit)
    const toNewtons: Record<string, number> = {
      N: 1,
      kN: 1000,
      lbf: 4.44822,
      dyn: 0.00001,
      kgf: 9.80665
    };
  
    // Convert from newtons to target unit
    const fromNewtons: Record<string, number> = {
      N: 1,
      kN: 0.001,
      lbf: 0.224809,
      dyn: 100000,
      kgf: 0.101972
    };
  
    const newtons = value * toNewtons[fromUnit];
    return newtons * fromNewtons[toUnit];
  };
  
  // Voltage converter
  export const convertVoltage = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to volts first (base unit)
    const toVolts: Record<string, number> = {
      uV: 0.000001,
      mV: 0.001,
      V: 1,
      kV: 1000,
      MV: 1000000
    };
  
    // Convert from volts to target unit
    const fromVolts: Record<string, number> = {
      uV: 1000000,
      mV: 1000,
      V: 1,
      kV: 0.001,
      MV: 0.000001
    };
  
    const volts = value * toVolts[fromUnit];
    return volts * fromVolts[toUnit];
  };
  
  // Sound converter (simplified)
  export const convertSound = (value: number, fromUnit: string, toUnit: string): number => {
    // Convert to decibels first (base unit)
    const toDecibels: Record<string, number> = {
      dB: 1,
      B: 10,
      Np: 8.686,
      phon: 1, // Simplified
      sone: 10  // Simplified
    };
  
    // Convert from decibels to target unit
    const fromDecibels: Record<string, number> = {
      dB: 1,
      B: 0.1,
      Np: 0.115129,
      phon: 1, // Simplified
      sone: 0.1 // Simplified
    };
  
    const decibels = value * toDecibels[fromUnit];
    return decibels * fromDecibels[toUnit];
  };