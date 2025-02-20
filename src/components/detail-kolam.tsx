"use client"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    // Tooltip,
    // Legend,
} from "chart.js";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer,
} from 'recharts';
import { Bar } from "react-chartjs-2";
import { format, parse } from 'date-fns';
import { useDeviceStore, useKolamStore } from '@/stores/deviceStore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card'
import { useState, useEffect } from 'react';
import { M2MCin, SensorData } from "@/types/antares-type";
import { Droplet, Wind } from "lucide-react";

// Registrasi komponen yang diperlukan
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DetailKolam() {
    // const { setLoadingDevices } = useDeviceStore();
    // const { setDevices } = useDeviceStore();

    const { devices, setDevices, isLoadingDevices, setLoadingDevices } = useDeviceStore();
    const { deviceData, setDeviceData } = useKolamStore();
    const [isDataFetched, setIsDataFetched] = useState(false); // Prevent repeated fetching
    const [isActive, setIsActive] = useState(1)
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);


    // Proses data
    // const processData = (rawData: M2MCin[]) => rawData.map(item => {
    //     const content = JSON.parse(item.con);
    //     const timestamp = format(
    //         new Date(item.ct.replace("T", "")),
    //         "dd-MM-yyyy HH:mm:ss"
    //     );

    //     return {
    //         timestamp,
    //         tds: parseFloat(content.tds),
    //         ph: parseFloat(content.ph),
    //         temperature: parseFloat(content.temperature),
    //         waterLevel: parseFloat(content["water-level"]),
    //         airTemperature: parseFloat(content.atemperature),
    //         airHumidity: parseFloat(content.ahumidity),
    //     };
    // });

    useEffect(() => {
        const fetchDevices = async () => {
            setLoadingDevices(true);
            try {
                const response = await fetch("/api/antares/fetchAllDevice");
                const result = await response.json();
                const data: String[] = result["m2m:uril"] || [];
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
    //     if (selectedDevice) {
    //         const processData = deviceData
    //             .filter((device) => device.name === selectedDevice)
    //             .map((device) => {
    //                 const content = JSON.parse(device.data.con);
    //                 const timestamp = format(
    //                     new Date(item["m2m:cin"].ct.replace("T", "")),
    //                     "dd-MM-yyyy HH:mm:ss"
    //                 );

    //                 return {
    //                     timestamp,
    //                     tds: parseFloat(content.tds),
    //                     ph: parseFloat(content.ph),
    //                     temperature: parseFloat(content.temperature),
    //                     waterLevel: parseFloat(content["water-level"]),
    //                     airTemperature: parseFloat(content.atemperature),
    //                     airHumidity: parseFloat(content.ahumidity),
    //                 };
    //             });

    //         deviceData
    //             .filter((device) => device.name === selectedDevice)
    //             .map((device, index) => {

    //             })
    //     }
    //     // console.log("Devices ", devices);
    //     // console.log("deviceData ", deviceData);

    // }, [deviceData, selectedDevice])


    return (
        <Card className="border-0 mt-5 py-5">
            <CardHeader>
                <CardTitle>
                    Detail Kolam
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="sticky top-0 pt-11 pb-0 bg-white z-10">
                    {/* <div className="sticky top-0 pt-10 pb-5 bg-white z-10"> */}
                    <div className='flex items-center gap-3'>
                        {devices.map((item, index) => {
                            return (
                                <button type='button' key={index} onClick={() => setSelectedDevice(item)} className={`h-8 w-8 rounded-full flexCenter ${selectedDevice == (item) ? 'bg-primary-fg text-primary font-bold' : 'bg-gray-100 text-gray-400'}`}>{index + 1}</button>
                                // <button type='button' key={index} onClick={() => setSelectedDevice(item)} className={`px-3 py-1 rounded-full flexCenter ${selectedDevice == (item) ? 'bg-primary-fg text-primary font-bold' : 'text-gray-400'}`}>{item}</button>
                                // <button type='button' key={index} onClick={() => setIsActive(index + 1)} className={`h-8 w-8 rounded-full flexCenter ${isActive == (index + 1) ? 'bg-primary-fg text-primary font-bold' : 'text-gray-400'}`}>{index + 1}</button>
                            )
                        })}
                    </div>
                    <CardDescription className="my-4">Device: {selectedDevice}</CardDescription>
                    <hr />
                </div>
                <div className="mt-5">
                    {isLoadingDevices && <p>Loading devices...</p>}
                    {!isLoadingDevices && deviceData.length > 0 && (
                        <div>
                            {deviceData
                                .filter((device) => device.name === selectedDevice)
                                .map((device, index) => {
                                    // Ambil dan proses data sensor
                                    const sensorData: SensorData[] = device.data.slice(0, 30).map(item => ({
                                        ...JSON.parse(item.con),
                                        timestamp: format(parse(item.ct, "yyyyMMdd'T'HHmmss", new Date()), 'dd-MM-yyyy HH:mm:ss')
                                    }));

                                    sensorData.map(data => {
                                        console.log(data.ph);

                                    })

                                    // tds
                                    const minTds = Math.min(...sensorData.map(data => Number(data.tds)));
                                    const maxTds = Math.max(...sensorData.map(data => Number(data.tds)));
                                    // ph
                                    const minPh = Math.min(...sensorData.map(data => parseFloat(data.ph)));
                                    const maxPh = Math.max(...sensorData.map(data => parseFloat(data.ph)));
                                    // temperature
                                    const minTemperature = Math.min(...sensorData.map(data => Number(data.temperature)));
                                    const maxTemperature = Math.max(...sensorData.map(data => Number(data.temperature)));
                                    // Water_Level
                                    const minWater_Level = Math.min(...sensorData.map(data => parseFloat(data["water-level"])));
                                    const maxWater_Level = Math.max(...sensorData.map(data => parseFloat(data["water-level"])));
                                    // Atemperature
                                    const minAtemperature = Math.min(...sensorData.map(data => parseFloat(data.atemperature)));
                                    const maxAtemperature = Math.max(...sensorData.map(data => parseFloat(data.atemperature)));
                                    // Ahumidity
                                    const minAhumidity = Math.min(...sensorData.map(data => parseFloat(data.ahumidity)));
                                    const maxAhumidity = Math.max(...sensorData.map(data => parseFloat(data.ahumidity)));

                                    return (
                                        <div key={index}>
                                            <div className="grid grid-cols-2 gap-10">
                                                <div>
                                                    <div className="flex my-5 ms-6 gap-4 items-center">
                                                        <Droplet size={35} color={"gray"} />
                                                        <div>
                                                            <h1 className="text-xl"><span className="font-bold text-primary">Nutrisi</span> <span className="text-gray-400 text-sm">(PPM)</span></h1>
                                                            <p className="text-gray-700">{minTds < 0 ? ("(-" + minTds + ")") : minTds} - {maxTds}</p>
                                                        </div>
                                                    </div>
                                                    <div className="h-96">
                                                        <ResponsiveContainer>
                                                            <LineChart data={sensorData}>
                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                <XAxis dataKey="timestamp" />
                                                                <YAxis domain={[(minTds >= 10 ? (minTds - 10) : (minTds)), (maxTds + 10)]} />
                                                                <Tooltip />
                                                                {/* <Legend /> */}
                                                                <Line type="monotone" dataKey="tds" stroke="#1A75D1" name="TDS" />
                                                            </LineChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex my-5 ms-6 gap-4 items-center">
                                                        <Droplet size={35} color={"gray"} />
                                                        <div>
                                                            <h1 className="text-xl text-gray-700"><span className="font-bold text-primary">pH Air</span> <span className="text-gray-400 text-sm">(pH)</span></h1>
                                                            <p className="text-gray-700">{minPh < 0 ? ("(-" + minPh + ")") : minPh} - {maxPh}</p>
                                                        </div>
                                                    </div>
                                                    <div className="h-96">
                                                        <ResponsiveContainer>
                                                            <LineChart data={sensorData}>
                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                <XAxis dataKey="timestamp" />
                                                                <YAxis domain={[(minPh >= 1 ? (minPh - 1) : (minPh)), (maxPh + 1)]} />
                                                                <Tooltip />
                                                                {/* <Legend /> */}
                                                                <Line type="monotone" dataKey="ph" stroke="#1A75D1" name="pH" />
                                                            </LineChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex my-5 ms-6 gap-4 items-center">
                                                        <Droplet size={35} color={"gray"} />
                                                        <div>
                                                            <h1 className="text-xl text-gray-700"><span className="font-bold text-primary">Ketinggian Air</span> <span className="text-gray-400 text-sm">(cm)</span></h1>
                                                            <p className="text-gray-700">{minWater_Level < 0 ? ("(-" + minWater_Level + ")") : minWater_Level} - {maxWater_Level}</p>
                                                        </div>
                                                    </div>
                                                    <div className="h-96">
                                                        <ResponsiveContainer>
                                                            <LineChart data={sensorData}>
                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                <XAxis dataKey="timestamp" />
                                                                <YAxis domain={[(minWater_Level >= 1 ? (minWater_Level - 1) : (minWater_Level)), (maxWater_Level + 1)]} />
                                                                <Tooltip />
                                                                {/* <Legend /> */}
                                                                <Line type="monotone" dataKey="water-level" stroke="#1A75D1" name="Water Level" />
                                                            </LineChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex my-5 ms-6 gap-4 items-center">
                                                        <Droplet size={35} color={"gray"} />
                                                        <div>
                                                            <h1 className="text-xl text-gray-700"><span className="font-bold text-primary">Suhu Air</span> <span className="text-gray-400 text-sm">(°C)</span></h1>
                                                            <p className="text-gray-700">{minTemperature < 0 ? ("(-" + minTemperature + ")") : minTemperature} - {maxTemperature}</p>
                                                        </div>
                                                    </div>
                                                    <div className="h-96">
                                                        <ResponsiveContainer>
                                                            <LineChart data={sensorData}>
                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                <XAxis dataKey="timestamp" />
                                                                <YAxis domain={[(minTemperature >= 5 ? (minTemperature - 5) : (minTemperature)), (maxTemperature + 5)]} />
                                                                <Tooltip />
                                                                {/* <Legend /> */}
                                                                <Line type="monotone" dataKey="temperature" stroke="#1A75D1" name="Temperature" />
                                                            </LineChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex my-5 ms-6 gap-4 items-center">
                                                        <Wind size={35} color={"gray"} />
                                                        <div>
                                                            <h1 className="text-xl text-gray-700"><span className="font-bold text-primary">Suhu Udara</span> <span className="text-gray-400 text-sm">(°C)</span></h1>
                                                            <p className="text-gray-700">{minAtemperature < 0 ? ("(-" + minAtemperature + ")") : minAtemperature} - {maxAtemperature}</p>
                                                        </div>
                                                    </div>
                                                    <div className="h-96">
                                                        <ResponsiveContainer>
                                                            <LineChart data={sensorData}>
                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                <XAxis dataKey="timestamp" />
                                                                <YAxis domain={[(minAtemperature >= 1 ? (minAtemperature - 1) : (minAtemperature)), (maxAtemperature + 1)]} />
                                                                <Tooltip />
                                                                {/* <Legend /> */}
                                                                <Line type="monotone" dataKey="atemperature" stroke="#1A75D1" name="Air Temperature" />
                                                                {/* <Line type="monotone" dataKey="atemperature" stroke="#FF7300" name="Air Temperature" /> */}
                                                            </LineChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex my-5 ms-6 gap-4 items-center">
                                                        <Wind size={35} color={"gray"} />
                                                        <div>
                                                            <h1 className="text-xl text-gray-700"><span className="font-bold text-primary">Kelembapan Udara</span> <span className="text-gray-400 text-sm">(%)</span></h1>
                                                            <p className="text-gray-700">{minAhumidity < 0 ? ("(-" + minAhumidity + ")") : minAhumidity} - {maxAhumidity}</p>
                                                        </div>
                                                    </div>
                                                    <div className="h-96">
                                                        <ResponsiveContainer>
                                                            <LineChart data={sensorData}>
                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                <XAxis dataKey="timestamp" />
                                                                <YAxis domain={[(minAhumidity >= 1 ? (minAhumidity - 1) : (minAhumidity)), (maxAhumidity + 1)]} />
                                                                <Tooltip />
                                                                {/* <Legend /> */}
                                                                <Line type="monotone" dataKey="ahumidity" stroke="#1A75D1" name="Air Humidity" />
                                                                {/* <Line type="monotone" dataKey="ahumidity" stroke="#FF7300" name="Air Humidity" /> */}
                                                            </LineChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
