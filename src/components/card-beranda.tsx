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
        {isLoadingDevices ? (
        // {isLoadingDevices && description === "Kolam Ikan" ? (
          <div className="animate-pulse duration-800 space-y-2">
            <div className="h-5 bg-gray-300 rounded w-8"></div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="font-bold text-lg">
              {description === "Kolam Ikan" ? devices.length : content}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
