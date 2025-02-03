"use client"
import { useEffect, useState } from 'react';
import { M2MResponse, M2MCin, M2MList, SensorData } from "@/types/antares-type";

export default function HomePage() {
  const [device, setDevice] = useState<string>('SiMonA-115749');
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [item, setItem] = useState<M2MCin>();

  const fetchAllDataOfDevice = async (selectedDevice: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/antares/fetchAllDataOfDevice?device=${selectedDevice}`);
      if (!response.ok) {
        throw new Error('Data fetch failed');
      }

      // Parsing data dengan tipe yang sesuai
      const result: M2MResponse = await response.json();

      // Set state jika ada list data
      setData(result["m2m:list"] || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestDataOfDevice = async (selectedDevice: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/antares/fetchLatestDataOfDevice?device=${selectedDevice}`);
      if (!response.ok) {
        throw new Error('Data fetch failed');
      }

      // Parsing data dengan tipe yang sesuai
      const result: M2MList = await response.json();

      // Set state jika ada list data
      setItem(result["m2m:cin"] || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract sensor values from M2MItem[]
  const parseSensorValues = (data: M2MList[]) => {
    return data.map((item) => {
      try {
        const parsedCon = JSON.parse(item["m2m:cin"].con);
        return {
          tds: parseFloat(parsedCon.tds),
          ph: parseFloat(parsedCon.ph),
          temperature: parseFloat(parsedCon.temperature),
          waterLevel: parseFloat(parsedCon["water-level"]),
          atemperature: parseFloat(parsedCon.atemperature),
          ahumidity: parseFloat(parsedCon.ahumidity),
          timestamp: item["m2m:cin"].ct, // Timestamp for x-axis
        };
      } catch (error) {
        console.error("Failed to parse con value", error);
        return null;
      }
    }).filter(Boolean); // Remove null values
  };

  const parseSensorValue = (data: M2MCin) => {
    try {
      const parsedCon: SensorData = JSON.parse(data.con);
      // const parsedCon: SensorData = JSON.parse(data.con);
      return {
        tds: parseFloat(parsedCon.tds),
        ph: parseFloat(parsedCon.ph),
        temperature: parseFloat(parsedCon.temperature),
        waterLevel: parseFloat(parsedCon["water-level"]),
        atemperature: parseFloat(parsedCon.atemperature),
        ahumidity: parseFloat(parsedCon.ahumidity),
        timestamp: data.ct, // Timestamp for x-axis
      };
    } catch (error) {
      console.error("Failed to parse con value", error);
      return null;
    }
  };

  useEffect(() => {
    // fetchAllDataOfDevice(device);
    fetchLatestDataOfDevice(device);
  }, [device]);

  useEffect(() => {
    if (item) {
      const sensorData = parseSensorValue(item);
      console.log(item);
      console.log("Parsed Sensor Data:", sensorData);

      // Handle item for chart rendering here
    }
  }, [item]);

  // Contoh pemakaian
  // useEffect(() => {
  //   if (data) {
  //     const sensorData = parseSensorValues(data);
  //     console.log("Parsed Sensor Data:", sensorData);
  //     // Handle data for chart rendering here
  //   }
  // }, [data]);

  return (
    <>
      <h1 className="text-2xl font-bold">Data from Antares ({device})</h1>
      <input
        className="border p-2 mb-4"
        type="text"
        value={device}
        onChange={(e) => setDevice(e.target.value)}
        placeholder="Enter device name"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={() => fetchAllDataOfDevice(device)}
      >
        Fetch Data
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            <li key={0}>{JSON.stringify(data[0])}</li>
          </ul>
          <h1>Pembatas</h1>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
  // return (
  //   <h1>
  //     Hello World
  //   </h1>
  // )
}
