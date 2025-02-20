import Link from "next/link";
import Image from "next/image";
import { Calendar, HandCoins, LayoutDashboard, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside>
      <nav className="flex flex-col gap-5 px-5 py-7 h-full">
        <div className="logo flex items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={55} height={55} />
          {/* <h5 className="font-bold text-xl text-primary">Simona</h5> */}
        </div>
        <ul className="nav-links grow flex flex-col gap-1">
          <li>
            <Link href="/" className="flex items-center gap-6 w-56 bg-primary px-4 py-3 rounded-sm text-sm text-white">
              <LayoutDashboard size={15} strokeWidth={3} />
              Beranda
            </Link>
          </li>
          <li>
            <Link href="/arus-kas" className="flex items-center gap-6 w-56 px-4 py-3 rounded-sm text-sm text-slate-600">
              <HandCoins size={15} strokeWidth={2} />
              Arus Kas
            </Link>
          </li>
          <li>
            <Link href="/kalender" className="flex items-center gap-6 w-56 px-4 py-3 rounded-sm text-sm text-slate-600">
              <Calendar size={15} strokeWidth={2} />
              Kalender
            </Link>
          </li>
        </ul>
        <Link href={"#"} className="flex items-center gap-6 w-56 px-4 py-3 text-sm text-red-500">
          <div className="flexCenter bg-red-100 p-2 rounded">
            <LogOut size={15} strokeWidth={2} className="rotate-180"/>
          </div>
          <span>Logout</span>
        </Link>
      </nav>
    </aside>
  )
}
