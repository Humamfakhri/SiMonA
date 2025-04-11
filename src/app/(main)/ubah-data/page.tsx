import CardBeranda from "@/components/card-beranda";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EntityCard from "@/components/ui/entity-card";
import { Fish, Leaf, Ruler, Waves } from "lucide-react";


export default function UbahData() {
    return (
        <div className="main-content px-5 mt-5 flex flex-col gap-5">
            <Card className="border-0 pt-3 pb-5">
                <CardHeader>
                    <CardTitle>
                        Ubah Data
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="border-0 pt-3 pb-5">
                <CardHeader>
                    <CardContent className="px-0">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <EntityCard
                                icon={<Waves />}
                                description="Kolam Ikan"
                                content={"2"}
                                className="bg-sky-100 text-primary"
                            />
                            <EntityCard
                                icon={<Fish />}
                                description="Ikan"
                                content={"180"}
                                className="bg-fuchsia-100 text-fuchsia-600"
                            />
                            <EntityCard
                                icon={<Leaf />}
                                description="Tanaman"
                                content={"240"}
                                className="bg-green-100 text-green-600"
                            />
                            <EntityCard
                                icon={<Ruler className="rotate-45" />}
                                description="Tinggi Tanaman ±"
                                content={"9cm"}
                                className="bg-green-100 text-green-600"
                            />
                        </div>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}