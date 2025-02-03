"use client"
import { M2MDevices } from '@/types/antares-type';
import { useEffect, useState } from 'react';
import { useDeviceStore } from "@/stores/deviceStore";


interface DevicesProps {
  countDevices?: (value: number) => void;
}

export default function Devices({ countDevices }: DevicesProps) {
  const { isLoadingDevices, setLoadingDevices } = useDeviceStore();
  const { devices, setDevices } = useDeviceStore();
  const [data, setData] = useState<String[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      setLoadingDevices(true);
      try {
        const response = await fetch("/api/antares/fetchAllDevice");
        const result = await response.json();
        setDevices(result["m2m:uril"] || []);
      } catch (error) {
        console.error("Failed to fetch devices", error);
      } finally {
        setLoadingDevices(false);
      }
    };
    fetchDevices();
  }, [setDevices, setLoadingDevices]);

  const parseDeviceList = (data: String[]) => {
    const parsedDevice = data.map((item) => item.split("SiMonA/")[1]);
    setData(parsedDevice);
  };

  useEffect(() => {
    if (devices) {
      const parsedDeviceList = parseDeviceList(devices);
      console.log(parsedDeviceList);
    }
  }, [devices])

  return (
    <div>
      {isLoadingDevices ? (
        <p>Memuat perangkat ...</p>
      ) : (
        <>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
