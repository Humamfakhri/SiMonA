"use client"
import Link from "next/link";
import Image from "next/image";
import { AlignJustify, Bell, Calendar, ChevronLeft, ChevronRight, ChevronsRight, CircleHelp, HandCoins, LayoutDashboard, LogOut, Settings2, Sparkles } from "lucide-react";
import { useState } from 'react';

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <aside className={`relative z-10 transition-all duration-300 ${showSidebar ? "w-[264px]" : "w-[102px]"}`}>
      <div className="absolute top-12 right-0 translate-x-1/2">
      <button className="bg-primary rounded-full p-[2px]" onClick={() => setShowSidebar(!showSidebar)}>
        <ChevronRight strokeWidth={1.5} className={`text-white ${showSidebar && "rotate-180"}`}/>
      </button>
      </div>
      {/* w-48 2xl:w-56 */}
      <nav className="flex flex-col gap-8 px-5 py-7 h-full">
        <div className={`logo flex items-center justify-between gap-2`}>
          <Image src="/images/logo.png" alt="logo" width={62} height={62} />
        </div>
        <ul className="nav-links grow flex flex-col gap-5">
          {/* {showSidebar ? "T" : "F"} */}
          <li className="w-full">
            <Link href="/" className={` ${showSidebar ? "w-48 2xl:w-56" : "w-full"} transition-all duration-300 whitespace-nowrap flex items-center gap-6 bg-primary px-5 py-3 rounded-sm text-sm text-white`}>
              <LayoutDashboard size={20} strokeWidth={3} />
              {showSidebar && (
                <p>Beranda</p> 
              )}
            </Link>
          </li>
          <li className="w-full">
            <Link href="/prediksi" className={` ${showSidebar ? "w-48 2xl:w-56" : "w-full"} hover:bg-primary-foreground whitespace-nowrap flex items-center gap-6 px-5 py-3 rounded-sm text-sm text-slate-600`}>
              <Sparkles size={20} strokeWidth={2} />
              {showSidebar && (
                <p>Prediksi</p> 
              )}
            </Link>
          </li>
          <li className="w-full">
            <Link href="/ubah-parameter" className={` ${showSidebar ? "w-48 2xl:w-56" : "w-full"} hover:bg-primary-foreground whitespace-nowrap flex items-center gap-6 px-5 py-3 rounded-sm text-sm text-slate-600`}>
              <Settings2 size={20} strokeWidth={2} />
              {showSidebar && (
                <p>Ubah Parameter</p> 
              )}
            </Link>
          </li>
          <li className="w-full">
            <Link href="/notifikasi" className={` ${showSidebar ? "w-48 2xl:w-56" : "w-full"} hover:bg-primary-foreground whitespace-nowrap flex items-center gap-6 px-5 py-3 rounded-sm text-sm text-slate-600`}>
              <Bell size={20} strokeWidth={2} />
              {showSidebar && (
                <p>Notifikasi</p> 
              )}
            </Link>
          </li>
          <li className="w-full">
            <Link href="/bantuan" className={` ${showSidebar ? "w-48 2xl:w-56" : "w-full"} hover:bg-primary-foreground transition-all duration-300 whitespace-nowrap flex items-center gap-6 px-5 py-3 rounded-sm text-sm text-slate-600`}>
              <CircleHelp size={20} strokeWidth={2} />
              {showSidebar && (
                <p>Bantuan</p> 
              )}
            </Link>
          </li>
        </ul>
        <div className="px-3">
        {/* <div className={`${showSidebar && "px-4"}`}> */}
          {showSidebar && (
            <div className="mb-4 border rounded-sm p-3">
              <p className="text-gray-500 text-sm mb-1 whitespace-nowrap">Anda masuk sebagai:</p>
              <p className="font-bold">Admin</p>
            </div>
          )}
            <Link href={"#"} className="relative flex items-center gap-6 my-3 text-sm text-red-500 rounded slideBgButton before:bg-red-100">
            <div className="flexCenter bg-red-100 px-2 py-3 rounded">
              <LogOut size={20} strokeWidth={2} className="rotate-180" />
            </div>
            {showSidebar && (
              <span>Keluar</span>
            )}
          </Link>
        </div>
      </nav>
    </aside>
  )
}
