export interface M2MDevices {
  "m2m:uril" : String[]
}

export interface M2MResponse {
  'm2m:list'?: M2MList[];
}

export interface M2MList {
  'm2m:cin': M2MCin;
  // "m2m:cin": {
  //   "rn": "cin_TjfUakGfQNlB3BezRLjYuX7A0PPm7dJ9",
  //   "ty": 4,
  //   "ri": "/antares-cse/cin-TjfUakGfQNlB3BezRLjYuX7A0PPm7dJ9",
  //   "pi": "/antares-cse/cnt-A2f3z8XxP6l8VZup",
  //   "ct": "20250122T044846",
  //   "lt": "20250122T044846",
  //   "st": 0,
  //   "cnf": "text/plain:0",
  //   "cs": 111,
  //   "con": "{\"tds\":\"186\",\"ph\":\"7.5\",\"temperature\":\"22.06\",\"water-level\":\"24.80\",\"atemperature\":\"23.60\",\"ahumidity\":\"83.70\"}"
  // }
}

export interface M2MCin {
  con: string;
  ct: string;
}

// src/types/sensor.ts
export interface SensorData {
  "tds": string;
  "ph": string;
  "temperature": string;
  "water-level": string;
  "atemperature": string;
  "ahumidity": string;
}
