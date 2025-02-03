import CardBeranda from "@/components/card-beranda";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Fish, Leaf, Ruler, Waves } from "lucide-react";
import LineChart from '@/components/LineChart';
import { fetchAntaresData } from '@/utils/fetchAntaresData';
import { M2MDevices, M2MResponse } from "@/types/antares-type";
import LineChartHome from "@/components/line-chart";
import Devices from "@/components/devices";

export default async function Home() {
  // const fetchAllDevice = async () => {
  //   // setLoading(true);
  //   try {
  //     const response = await fetch(`/api/antares/fetchAllDevice`);
  //     if (!response.ok) {
  //       throw new Error('Data fetch failed');
  //     }

  //     // Parsing data dengan tipe yang sesuai
  //     const result: M2MDevices = await response.json();
  //     return result;
  //     // Set state jika ada list data
  //     // setData(result["m2m:uril"] || []);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  // const allDevice = await fetchAllDevice();
  // console.log("all Device", allDevice);



  return (
    <>
      <Input placeholder="Cari" className="border-0 shadow-sm mb-5" />
      <div className="grid grid-cols-4 gap-4">
        {/* <CardBeranda icon={Waves} description="Kolam Ikan" content={"2"} className="bg-sky-100 text-primary" /> */}
        <CardBeranda
          icon={<Waves />}
          description="Kolam Ikan"
          content={"2"}
          className="bg-sky-100 text-primary"
        />
        <CardBeranda
          icon={<Fish />}
          description="Ikan"
          content={"15"}
          className="bg-fuchsia-100 text-fuchsia-600"
        />
        <CardBeranda
          icon={<Leaf />}
          description="Tanaman"
          content={"20"}
          className="bg-green-100 text-green-600"
        />
        <CardBeranda
          icon={<Ruler />}
          description="Tinggi Tanaman"
          content={"7cm"}
          className="bg-green-100 text-green-600"
        />
        {/* <CardBeranda icon={Fish} description="Ikan" content="15" className="bg-fuchsia-100 text-fuchsia-600" />
        <CardBeranda icon={Leaf} description="Tanaman" content="20" className="bg-green-100 text-green-600" />
        <CardBeranda icon={Ruler} iconClassName="rotate-45" description="Tinggi Tanaman" content="7cm" className="bg-green-100 text-green-600" /> */}
      </div>
      <h1 className="text-2xl font-bold mb-4">IoT Data Charts</h1>
      <Devices />
    </>
  );
}
