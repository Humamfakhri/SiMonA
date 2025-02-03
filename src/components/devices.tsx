"use client"
import { M2MDevices } from '@/types/antares-type';
import { useEffect, useState } from 'react';

interface DevicesProps {
  countDevices?: (value: number) => void;
}

export default function Devices({ countDevices }: DevicesProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<String[]>([]);
  const [devices, setDevices] = useState<String[]>([]);

  const fetchAllDataOfDevice = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/antares/fetchAllDevice`);
      if (!response.ok) {
        throw new Error('Data fetch failed');
      }

      // Parsing data dengan tipe yang sesuai
      const result: M2MDevices = await response.json();

      // Set state jika ada list data
      setData(result["m2m:uril"] || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseDeviceList = (data: String[]) => {
    const parsedDevice = data.map((item) => item.split("SiMonA/")[1]);
    setDevices(parsedDevice);
  };

  useEffect(() => {
    fetchAllDataOfDevice()
  }, [])

  useEffect(() => {
    if (data) {
      const parsedDeviceList = parseDeviceList(data);
      // countDevices(data.length.toString())
      console.log(parsedDeviceList);
    }
  }, [data])


  return (
    <div>
      {loading ? (
        <p>Memuat perangkat ...</p>
      ) : (
        <>
          <ul>
            {devices.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
