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
import { Droplet, Wind, Check, CircleChevronRight, CircleChevronLeft, ChevronsRight, ChevronsLeft, LoaderCircle } from 'lucide-react';
import MyTooltip from "./my-tooltip";

// Registrasi komponen yang diperlukan
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DetailKolam() {
    // const { setLoadingDevices } = useDeviceStore();
    // const { setDevices } = useDeviceStore();

    const { devices, setDevices, isLoadingDevices, setLoadingDevices } = useDeviceStore();
    const { deviceData, setDeviceData } = useKolamStore();
    const [isDataFetched, setIsDataFetched] = useState(false); // Prevent repeated fetching
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 15;
    const [uniqueDays, setUniqueDays] = useState<string[]>([]);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = (totalPages: number) => {
        setCurrentPage(totalPages);
    };

    const handleDaySelection = (day: string) => {
        setSelectedDay(day);
        setCurrentPage(1); // Reset to the first page when a new day is selected
    };

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
        setSelectedDay(uniqueDays[0]);
    }, [uniqueDays]);

    useEffect(() => {
        const baseUrl = "api/antares/fetchAllDataOfDevice"; // Contoh URL base API
        const fetchDataForDevice = async (deviceName: string) => {
            // console.log(`Fetching data for device: ${deviceName}`); // Tambahkan log
            try {
                const response = await fetch(`${baseUrl}?device=${deviceName}`);
                if (!response.ok) {
                    console.error(`Error fetching device ${deviceName}: ${response.status}`);
                    return;
                }
                const result = await response.json();
                const data = result["m2m:list"]?.map((item: any) => item["m2m:cin"]).reverse() || [];
                // console.log(`Data for ${deviceName}:`, data);
                setDeviceData(deviceName, data);

                // Update uniqueDays
                const sensorData: SensorData[] = data.map((item: M2MCin) => ({
                    ...JSON.parse(item.con),
                    day: format(parse(item.ct, "yyyyMMdd'T'HHmmss", new Date()), 'dd-MM')
                }));
                const days = Array.from(new Set(sensorData.map(data => data.day)));
                setUniqueDays(days.filter(day => sensorData.some(data => data.day === day && data.tds && data.ph && data.temperature && data["water-level"] && data.atemperature && data.ahumidity)));
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

    useEffect(() => {
        if (selectedDevice) {
            const device = deviceData.find((device) => device.name === selectedDevice);
            if (device) {
                setTotalPages(Math.ceil(device.data.length / itemsPerPage));
            }
        }
    }, [selectedDevice, deviceData]);

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
                    Detail Sensor
                </CardTitle>
            </CardHeader>
            {isLoadingDevices ? (
                <LoaderCircle className="animate-spin size-12 rounded-full text-primary mx-auto p-0" />
            ) : (
                <CardContent>
                    <div className="sticky top-0 pt-11 pb-0 bg-white z-10">
                        {/* <div className="sticky top-0 pt-10 pb-5 bg-white z-10"> */}
                        <div className="flex items-stretch justify-between">
                            <div>
                                <div className='flex items-center gap-3'>
                                    {devices.map((item, index) => {
                                        return (
                                            <button type='button' key={index} onClick={() => setSelectedDevice(item)} className={`h-8 w-8 rounded-full flexCenter ${selectedDevice == (item) ? 'bg-primary text-white font-bold' : 'bg-gray-100 text-gray-400 hover:bg-primary-foreground'}`}>{index + 1}</button>
                                        )
                                    })}
                                </div>
                                <CardDescription className="my-4">Device: {selectedDevice}</CardDescription>
                            </div>
                            <div className="flex flex-col self-stretch h-full gap-3">
                                <div className="flex items-end justify-end gap-3">
                                    {uniqueDays.map((day, index) => (
                                        <button type='button' className={`text-sm px-4 py-1 rounded-full ${selectedDay === day ? 'bg-primary-fg text-primary font-bold' : 'bg-gray-100 text-gray-400'}`} key={index} onClick={() => handleDaySelection(day)}>{day}</button>
                                    ))}
                                </div>
                                <div className="flex items-center justify-end gap-3">
                                    <MyTooltip text="First" onClick={handleFirstPage} disabled={currentPage === 1}>
                                        <ChevronsLeft className={currentPage === 1 ? "text-gray-300" : "text-gray-500 hover:text-primary"} />
                                    </MyTooltip>
                                    <MyTooltip text="Previous" onClick={handlePreviousPage} disabled={currentPage === 1}>
                                        <CircleChevronLeft size={30} strokeWidth={1.5} className={currentPage === 1 ? "text-gray-300" : "text-primary"} />
                                    </MyTooltip>
                                    <MyTooltip text="Next" onClick={() => handleNextPage()} disabled={currentPage === totalPages}>
                                        <CircleChevronRight size={30} strokeWidth={1.5} className={currentPage === totalPages ? "text-gray-300" : "text-primary"} />
                                    </MyTooltip>
                                    <MyTooltip text="Last" onClick={() => handleLastPage(totalPages)} disabled={currentPage === totalPages}>
                                        <ChevronsRight className={currentPage === totalPages ? "text-gray-300" : "text-gray-500"} />
                                    </MyTooltip>
                                </div>
                            </div>
                        </div>
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
                                        const filteredData = selectedDay
                                            ? device.data.filter(item => format(parse(item.ct, "yyyyMMdd'T'HHmmss", new Date()), 'dd-MM') === selectedDay)
                                            : device.data;

                                        const startIndex = (currentPage - 1) * itemsPerPage;
                                        const endIndex = startIndex + itemsPerPage;
                                        const sensorData: SensorData[] = filteredData.slice(startIndex, endIndex).map(item => ({
                                            ...JSON.parse(item.con),
                                            timestamp: item.ct,
                                            // timestamp: format(parse(item.ct, "yyyyMMdd'T'HHmmss", new Date()), 'dd-MM-yyyy HH:mm:ss'),
                                            day: format(parse(item.ct, "yyyyMMdd'T'HHmmss", new Date()), 'dd-MM'),
                                            hour: format(parse(item.ct, "yyyyMMdd'T'HHmmss", new Date()), 'HH:mm')
                                        }));

                                        // const uniqueDays: string[] = Array.from(new Set(sensorData.map(data => data.day)));

                                        // tds
                                        const minTds = Math.min(...sensorData.map(data => Number(data.tds)));
                                        const maxTds = Math.max(...sensorData.map(data => Number(data.tds)));
                                        const tdsData = sensorData.map(data => Number(data.tds));
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
                                                {/* <pre className="text-gray-500"> : {device.data.length}</pre>
                                                <pre className="text-gray-500">
                                                    {
                                                        // sensorData.map((data, index) => (
                                                        //     <pre key={index}>{JSON.stringify(data, null, 2)}</pre>
                                                        // ))
                                                        sensorData.map(data => `${data.timestamp}: ${Number(data.tds)}`).join('\n')
                                                    }
                                                </pre> */}
                                                <div className="grid grid-cols-12xl:grid-cols-2 gap-10">
                                                    <div>
                                                        <div className="flex my-5 mx-6 gap-4 items-center">
                                                            <Droplet size={35} color={"gray"} />
                                                            <div>
                                                                <h1 className="lg:text-lg 2xl:text-xl"><span className="font-bold text-primary">Nutrisi</span> <span className="text-gray-400 text-sm">(PPM)</span></h1>
                                                                <p className="text-gray-700">{minTds < 0 ? ("(-" + minTds + ")") : minTds} - {maxTds}</p>
                                                            </div>
                                                        </div>
                                                        {/* <div className="flex my-5 mx-6 gap-4 items-center">
                                                        <Droplet size={35} color={"gray"} className="invisible" />
                                                    </div> */}
                                                        <div className="pe-6 2xl:pe-0 h-60 2xl:h-80">
                                                            <ResponsiveContainer>
                                                                <LineChart data={sensorData}>
                                                                    <CartesianGrid strokeDasharray="3 3" />
                                                                    <XAxis dataKey="hour" className="text-xs" interval={0} tickMargin={15} />
                                                                    {/* <XAxis dataKey="hour" className="text-xs" interval={1} tickMargin={15} /> */}
                                                                    <YAxis domain={[(minTds >= 5 ? (minTds - 5) : (minTds)), (maxTds + 5)]} className="text-sm" tickMargin={5} />
                                                                    <Tooltip />
                                                                    {/* <Legend /> */}
                                                                    <Line type="monotone" dataKey="tds" stroke="#1A75D1" name="TDS" />
                                                                </LineChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex my-5 mx-6 gap-4 items-center">
                                                            <Droplet size={35} color={"gray"} />
                                                            <div>
                                                                <h1 className="lg:text-lg 2xl:text-xl text-gray-700"><span className="font-bold text-primary">pH Air</span> <span className="text-gray-400 text-sm">(pH)</span></h1>
                                                                <p className="text-gray-700">{minPh < 0 ? ("(-" + minPh + ")") : minPh} - {maxPh}</p>
                                                            </div>
                                                        </div>
                                                        <div className="pe-6 2xl:pe-0 h-60 2xl:h-80">
                                                            <ResponsiveContainer>
                                                                <LineChart data={sensorData}>
                                                                    <CartesianGrid strokeDasharray="3 3" />
                                                                    <XAxis dataKey="hour" className="text-xs" interval={0} tickMargin={15} />
                                                                    {/* <XAxis dataKey="hour" className="text-xs" interval={1} tickMargin={15} /> */}
                                                                    <YAxis domain={[(minPh >= 0.5 ? (minPh - 0.5) : (minPh)), (maxPh + 0.5)]} className="text-sm" tickMargin={5} />
                                                                    <Tooltip />
                                                                    {/* <Legend /> */}
                                                                    <Line type="monotone" dataKey="ph" stroke="#1A75D1" name="pH" />
                                                                </LineChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex my-5 mx-6 gap-4 items-center">
                                                            <Droplet size={35} color={"gray"} />
                                                            <div>
                                                                <h1 className="lg:text-lg 2xl:text-xl text-gray-700"><span className="font-bold text-primary">Ketinggian Air</span> <span className="text-gray-400 text-sm">(cm)</span></h1>
                                                                <p className="text-gray-700">{minWater_Level < 0 ? ("(-" + minWater_Level + ")") : minWater_Level} - {maxWater_Level}</p>
                                                            </div>
                                                        </div>
                                                        <div className="pe-6 2xl:pe-0 h-60 2xl:h-80">
                                                            <ResponsiveContainer>
                                                                <LineChart data={sensorData}>
                                                                    <CartesianGrid strokeDasharray="3 3" />
                                                                    <XAxis dataKey="hour" className="text-xs" interval={0} tickMargin={15} />
                                                                    {/* <XAxis dataKey="hour" className="text-xs" interval={1} tickMargin={15} /> */}
                                                                    <YAxis domain={[(minWater_Level >= 1 ? (minWater_Level - 1) : (minWater_Level)), (maxWater_Level + 1)]} className="text-sm" tickMargin={5} />
                                                                    <Tooltip />
                                                                    {/* <Legend /> */}
                                                                    <Line type="monotone" dataKey="water-level" stroke="#1A75D1" name="Water Level" />
                                                                </LineChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex my-5 mx-6 gap-4 items-center">
                                                            <Droplet size={35} color={"gray"} />
                                                            <div>
                                                                <h1 className="lg:text-lg 2xl:text-xl text-gray-700"><span className="font-bold text-primary">Suhu Air</span> <span className="text-gray-400 text-sm">(°C)</span></h1>
                                                                <p className="text-gray-700">{minTemperature < 0 ? ("(-" + minTemperature + ")") : minTemperature} - {maxTemperature}</p>
                                                            </div>
                                                        </div>
                                                        <div className="pe-6 2xl:pe-0 h-60 2xl:h-80">
                                                            <ResponsiveContainer>
                                                                <LineChart data={sensorData}>
                                                                    <CartesianGrid strokeDasharray="3 3" />
                                                                    <XAxis dataKey="hour" className="text-xs" interval={0} tickMargin={15} />
                                                                    {/* <XAxis dataKey="hour" className="text-xs" interval={1} tickMargin={15} /> */}
                                                                    <YAxis domain={[(minTemperature >= 1 ? (minTemperature - 1) : (minTemperature)), (maxTemperature + 1)]} className="text-sm" tickMargin={5} />
                                                                    <Tooltip />
                                                                    {/* <Legend /> */}
                                                                    <Line type="monotone" dataKey="temperature" stroke="#1A75D1" name="Temperature" />
                                                                </LineChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex my-5 mx-6 gap-4 items-center">
                                                            <Wind size={35} color={"gray"} />
                                                            <div>
                                                                <h1 className="lg:text-lg 2xl:text-xl text-gray-700"><span className="font-bold text-primary">Suhu Udara</span> <span className="text-gray-400 text-sm">(°C)</span></h1>
                                                                <p className="text-gray-700">{minAtemperature < 0 ? ("(-" + minAtemperature + ")") : minAtemperature} - {maxAtemperature}</p>
                                                            </div>
                                                        </div>
                                                        <div className="pe-6 2xl:pe-0 h-60 2xl:h-80">
                                                            <ResponsiveContainer>
                                                                <LineChart data={sensorData}>
                                                                    <CartesianGrid strokeDasharray="3 3" />
                                                                    <XAxis dataKey="hour" className="text-xs" interval={0} tickMargin={15} />
                                                                    {/* <XAxis dataKey="hour" className="text-xs" interval={1} tickMargin={15} /> */}
                                                                    <YAxis domain={[(minAtemperature >= 1 ? (minAtemperature - 1) : (minAtemperature)), (maxAtemperature + 1)]} className="text-sm" tickMargin={5} />
                                                                    <Tooltip />
                                                                    {/* <Legend /> */}
                                                                    <Line type="monotone" dataKey="atemperature" stroke="#1A75D1" name="Air Temperature" />
                                                                    {/* <Line type="monotone" dataKey="atemperature" stroke="#FF7300" name="Air Temperature" /> */}
                                                                </LineChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex my-5 mx-6 gap-4 items-center">
                                                            <Wind size={35} color={"gray"} />
                                                            <div>
                                                                <h1 className="lg:text-lg 2xl:text-xl text-gray-700"><span className="font-bold text-primary">Kelembapan Udara</span> <span className="text-gray-400 text-sm">(%)</span></h1>
                                                                <p className="text-gray-700">{minAhumidity < 0 ? ("(-" + minAhumidity + ")") : minAhumidity} - {maxAhumidity}</p>
                                                            </div>
                                                        </div>
                                                        <div className="pe-6 2xl:pe-0 h-60 2xl:h-80">
                                                            <ResponsiveContainer>
                                                                <LineChart data={sensorData}>
                                                                    <CartesianGrid strokeDasharray="3 3" />
                                                                    <XAxis dataKey="hour" className="text-xs" interval={0} tickMargin={15} />
                                                                    {/* <XAxis dataKey="hour" className="text-xs" interval={1} tickMargin={15} /> */}
                                                                    <YAxis domain={[(minAhumidity >= 1 ? (minAhumidity - 1) : (minAhumidity)), (maxAhumidity + 1)]} className="text-sm" tickMargin={5} />
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
            )}
        </Card>
    )
}
