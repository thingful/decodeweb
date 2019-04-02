const sensors = {
  "14": {
    name: "BH1730FVC",
    description: "Digital Ambient Light Sensor",
    unit: "Lux"
  },
  "53": {
    name: "ICS43432 - Noise",
    description: "I2S Digital Mems Microphone with custom Audio Processing Algorithm",
    unit: "dBA"
  },
  "58": {
    name: "MPL3115A2 - Barometric Pressure",
    description: "Digital Barometric Pressure Sensor",
    unit: "K Pa"
  },
  "10": {
    name: "Battery SCK 1.1",
    description: "Custom Circuit",
    unit: "%",
  },
  "55": {
    name: "SHT31 - Temperature",
    description: "Temperature",
    unit: "ºC"
  },
  "87": {
    name: "PMS5003_AVG-PM2.5",
    description: "Particle Matter PM 2.5",
    unit: "ug/m3"
  },
  "88": {
    name: "PMS5003_AVG-PM10",
    description: "Particle Matter PM 10",
    unit: "ug/m3"
  },
  "89": {
    name: "PMS5003_AVG-PM1",
    description: "Particle Matter PM 1",
    unit: "ug/m3"
  },
  "56": {
    name: "SHT31 - Humidity",
    description: "Humidity",
    unit: "%"
  }
}

export default function sensorDetails(id) {
  return sensors[(id).toString()];
}