import CardBeranda from "@/components/card-beranda";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Fish, Leaf, Ruler, Waves } from "lucide-react";
import DetailKolam from "@/components/detail-kolam";
import Devices from "@/components/devices";

export default async function Home() {

  return (
    <div className="relative">
      <div className="h-5 w-full sticky top-0 z-20 bg-slate-100"></div>
      <div className="glassmorphism px-5 pb-5">
        {/* <div className="glassmorphism px-5 py-5 z-10"> */}
        {/* <div className="sticky top-0 glassmorphism px-5 py-5 z-10"> */}
        <Input placeholder="Cari" className="border-0 shadow-sm" />
      </div>
      <div className="main-content px-5">
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
            icon={<Ruler className="rotate-45" />}
            description="Tinggi Tanaman ±"
            content={"7cm"}
            className="bg-green-100 text-green-600"
          />
          {/* <CardBeranda icon={Fish} description="Ikan" content="15" className="bg-fuchsia-100 text-fuchsia-600" />
        <CardBeranda icon={Leaf} description="Tanaman" content="20" className="bg-green-100 text-green-600" />
        <CardBeranda icon={Ruler} iconClassName="rotate-45" description="Tinggi Tanaman" content="7cm" className="bg-green-100 text-green-600" /> */}
        </div>
        <DetailKolam />
        {/* <Devices/> */}
      </div>
      {/* <div className="h-5 w-full bg-slate-100 fixed bottom-5 rounded-lg"></div> */}
    </div>
  );
}
