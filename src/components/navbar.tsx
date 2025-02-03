"use client";
import Link from 'next/link'
import ProfileBtn from "./profile-btn";
import Image from 'next/image';
import SearchInput from "./search-input";
import { usePathname } from 'next/navigation';

// Menu items.
const items = [
  {
    title: "Beranda",
    url: "/",
    // icon: Home,
  },
  {
    title: "Arus Kas",
    url: "/arus-kas",
    // icon: Wallet,
  },
  {
    title: "Kalender",
    url: "/kalender",
    // icon: Calendar,
  },
  // {
  //   title: "Cari",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
]

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className='flex justify-center items-center gap-4 bg-white border-b'>
      <div className='my-container flex justify-between items-center w-full'>
        <div className="flex items-center gap-9">
          <Image src={"/favicon.ico"} width={24} height={24} alt={"logo"} />
          <ul className='flex items-center gap-7 text-sm'>
            {items.map((item) => (
              <li className={pathname == item.url ? 'border-b-2 border-primary py-5' : ''}>
                <Link href={item.url} className={pathname == item.url ? 'text-primary' : 'text-slate-500'}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput />
          <ProfileBtn />
        </div>
      </div>
    </nav>
  )
}
