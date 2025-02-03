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

type CardBerandaProps = {
  icon: JSX.Element;
  description: string;
  content: string | number;
  className?: string;
  iconClassName?: string;
};

export default function CardBeranda({
  icon,
  description,
  content,
  className,
  iconClassName,
}: CardBerandaProps) {
  const { devices, isLoadingDevices } = useDeviceStore();  

  return (
    <Card className="border-0 py-1">
      <CardHeader>
        <CardTitle>
          <div className={clsx("flexCenter p-2 rounded w-fit", className)}>
            <div className={iconClassName}>{icon}</div>
          </div>
        </CardTitle>
        <CardDescription className="pt-3">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingDevices && description === "Kolam Ikan" ? (
          <div className="flex items-center">
            <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
            {/* <p className="ml-2 text-sm text-gray-500">Loading...</p> */}
          </div>
        ) : (
          <p className="font-bold text-lg">
            {description === "Kolam Ikan" ? devices.length : content}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
