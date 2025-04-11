"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useDeviceStore } from "@/stores/deviceStore";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

type EntityCardProps = {
    icon: JSX.Element;
    description: string;
    content: string | number;
    className?: string;
    iconClassName?: string;
};

export default function EntityCard({
    icon,
    description,
    content,
    className,
    iconClassName,
}: EntityCardProps) {
    const { devices, isLoadingDevices } = useDeviceStore();

    return (
        <Card className="py-1 shadow-none">
            <CardHeader>
                <CardTitle>
                    <div className={clsx("flexCenter p-2 rounded w-fit", className)}>
                        <div className={iconClassName}>{icon}</div>
                    </div>
                </CardTitle>
                <CardDescription className="pt-3">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <p className="font-bold text-lg">10</p>
                </div>
            </CardContent>
        </Card>
    );
}
