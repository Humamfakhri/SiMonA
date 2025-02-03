"use client"
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
        const data:String[] = result["m2m:uril"] || [];
        const parsedDevice = data.map((item) => item.split("SiMonA/")[1]) 
        setDevices(parsedDevice);
      } catch (error) {
        console.error("Failed to fetch devices", error);
      } finally {
        setLoadingDevices(false);
      }
    };
    fetchDevices();
  }, [setDevices, setLoadingDevices]);

  return (
    <div>
      {isLoadingDevices ? (
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
