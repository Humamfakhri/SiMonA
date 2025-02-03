export interface M2MDevices {
  "m2m:uril": String[]
}

export interface M2MResponse {
  'm2m:list'?: M2MList[];
}

export interface M2MList {
  'm2m:cin': M2MCin;
}

export interface M2MCin {
  rn: string
  ty: number
  ri: string
  pi: string
  ct: string
  lt: string
  st: number
  cnf: string
  cs: number
  con: string
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
