"use client"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
import { format, parse } from 'date-fns';
import { useDeviceStore, useKolamStore } from '@/stores/deviceStore';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { useState, useEffect } from 'react';

// Registrasi komponen yang diperlukan
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DetailKolam() {
    const { devices, isLoadingDevices } = useDeviceStore();
    const { deviceData, setDeviceData } = useKolamStore();
    const [isDataFetched, setIsDataFetched] = useState(false); // Prevent repeated fetching
    const [isActive, setIsActive] = useState(1)
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

    useEffect(() => {
        const baseUrl = "api/antares/fetchAllDataOfDevice"; // Contoh URL base API

        // const fetchDataForDevice = async (deviceName: string) => {
        //     try {
        //         const response = await fetch(`${baseUrl}?device=${deviceName}`);
        //         if (!response.ok) {
        //             console.error(`Error fetching device ${deviceName}`);
        //             return;
        //         }
        //         const result = await response.json();
        //         const data = result["m2m:list"]?.map((item: any) => item["m2m:cin"]) || [];
        //         setDeviceData(deviceName, data);
        //     } catch (error) {
        //         console.error(`Failed to fetch device data: ${error}`);
        //     }
        // };

        const fetchDataForDevice = async (deviceName: string) => {
            // console.log(`Fetching data for device: ${deviceName}`); // Tambahkan log
            try {
                const response = await fetch(`${baseUrl}?device=${deviceName}`);
                if (!response.ok) {
                    console.error(`Error fetching device ${deviceName}: ${response.status}`);
                    return;
                }
                const result = await response.json();
                const data = result["m2m:list"]?.map((item: any) => item["m2m:cin"]) || [];
                // console.log(`Data for ${deviceName}:`, data);
                setDeviceData(deviceName, data);
            } catch (error) {
                console.error(`Failed to fetch device data: ${error}`);
            }
        };



        if (!isLoadingDevices && devices && !isDataFetched) {
            devices.forEach((deviceName) => {
                fetchDataForDevice(deviceName);
            });
            setSelectedDevice(devices[0])
            setIsDataFetched(true); // Avoid repeated fetch calls
        }
    }, [devices, isLoadingDevices, setDeviceData, isDataFetched]);

    // useEffect(() => {
    //     console.log("Devices ", devices);
    //     console.log("deviceData ", deviceData);

    // }, [devices, deviceData])


    return (
        <Card className="border-0 mt-5 py-5">
            <CardHeader>
                <CardTitle>
                    Detail Kolam
                </CardTitle>
                {/* <CardDescription className="pt-3">Description</CardDescription> */}
            </CardHeader>
            <CardContent>
                <div className='flex items-center gap-3 my-5'>
                    {devices.map((item, index) => {
                        return (
                            <button type='button' key={index} onClick={() => setSelectedDevice(item)} className={`h-8 w-8 rounded-full flexCenter ${selectedDevice == (item) ? 'bg-primary-fg text-primary font-bold' : 'bg-gray-100 text-gray-400'}`}>{index + 1}</button>
                            // <button type='button' key={index} onClick={() => setSelectedDevice(item)} className={`px-3 py-1 rounded-full flexCenter ${selectedDevice == (item) ? 'bg-primary-fg text-primary font-bold' : 'text-gray-400'}`}>{item}</button>
                            // <button type='button' key={index} onClick={() => setIsActive(index + 1)} className={`h-8 w-8 rounded-full flexCenter ${isActive == (index + 1) ? 'bg-primary-fg text-primary font-bold' : 'text-gray-400'}`}>{index + 1}</button>
                        )
                    })}
                </div>
                <div>
                    {isLoadingDevices && <p>Loading devices...</p>}
                    {!isLoadingDevices && deviceData.length > 0 && (
                        <div>
                            {deviceData
                                .filter((device) => device.name === selectedDevice)
                                .map((device, index) => (
                                    <div key={index}>
                                        <h2>Device: {device.name}</h2>
                                        {/* LIMIT JADI 3 AJA */}
                                        {device.data.slice(0, 3).map((item, index) => {
                                            const parsedData = JSON.parse(item.con);
                                            const data = {
                                                labels: Object.keys(parsedData),
                                                datasets: [
                                                  {
                                                    label: "Sensor Data",
                                                    data: Object.values(parsedData),
                                                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                                                    borderColor: "rgba(75, 192, 192, 1)",
                                                    borderWidth: 1,
                                                  },
                                                ],
                                              };
                                            let formattedDate = 'Invalid Date';
                                            try {
                                                const date = parse(item.ct, "yyyyMMdd'T'HHmmss", new Date());
                                                formattedDate = format(date, 'dd-MM-yyyy HH:mm:ss');
                                            } catch (error) {
                                                console.error("Date parsing error:", error);
                                            }
                                            return (
                                                <div key={index} className="mb-4">
                                                    {Object.entries(parsedData).map(([key, value]) => (
                                                        <p key={key}>
                                                            <strong>{formattedDate}</strong>{' '}
                                                            <strong>{key}:</strong> {String(value)}
                                                        </p>
                                                    ))}
                                                    <Bar data={data} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
