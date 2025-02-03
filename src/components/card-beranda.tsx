import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import clsx from "clsx";
import { LucideIcon, LucideProps, Warehouse } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

type CardBerandaProps = {
  icon: LucideIcon,
  description: string,
  content: string | number,
  className?: string;
  iconClassName?: string;
}

export default function CardBeranda({icon: Icon, description, content, className, iconClassName}: CardBerandaProps) {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>
        <div className={clsx("flexCenter p-2 rounded w-fit", className)}>
            <Icon size={15} strokeWidth={2} className={iconClassName}/>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-bold">{content}</p>
      </CardContent>
      {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
    </Card>
  )
}
