"use client"
import LineChart from "./LineChart";

type LineChartProps = {
  data: any;
}

export default function LineChartHome({data}: LineChartProps) {
  return (
    <>
    {data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LineChart data={data} label="tds" />
          <LineChart data={data} label="ph" />
          <LineChart data={data} label="temperature" />
          <LineChart data={data} label="water-level" />
          <LineChart data={data} label="atemperature" />
          <LineChart data={data} label="ahumidity" />
        </div>
      )}
    </>
  )
}
