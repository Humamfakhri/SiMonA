"use client"
import Link from "next/link";
import Image from "next/image";
import { AlignJustify, Bell, Calendar, ChevronLeft, ChevronRight, ChevronsRight, CircleHelp, HandCoins, LayoutDashboard, LogOut, Settings2, Sparkles } from "lucide-react";
import { useState } from 'react';
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "POST",
      // body: JSON.stringify({ username, password }),
      // headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <aside className={`relative z-10 transition-all duration-300 ${showSidebar ? "w-[264px]" : "w-[102px]"}`}>
      <div className="absolute top-12 right-0 translate-x-1/2">
        <button className="bg-primary rounded-full p-[2px]" onClick={() => setShowSidebar(!showSidebar)}>
          <ChevronRight strokeWidth={1.5} className={`text-white ${showSidebar && "rotate-180"}`} />
        </button>
      </div>
      {/* w-48 2xl:w-56 */}
      <nav className="flex flex-col gap-8 px-5 py-7 h-full">
        <div className={`logo flex items-center justify-between gap-2`}>
          <Image src="/images/logo.png" alt="logo" width={62} height={62} />
        </div>
        <ul className="nav-links grow flex flex-col gap-5">
          {[
            { href: "/", label: "Beranda", icon: LayoutDashboard },
            { href: "/ubah-data", label: "Ubah Data", icon: Settings2 },
            { href: "/analisis-prediksi", label: "Analisis & Prediksi", icon: Sparkles },
            { href: "/notifikasi", label: "Notifikasi", icon: Bell },
            { href: "/panduan", label: "Panduan", icon: CircleHelp },
          ].map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href} className="w-full">
          <Link
            href={href}
            className={`${
              isActive ? "bg-primary text-white" : "hover:bg-primary-foreground text-slate-600"
            } ${showSidebar ? "w-48 2xl:w-56" : "w-full"} transition-all duration-300 whitespace-nowrap flex items-center gap-6 px-5 py-3 rounded-sm text-sm`}
          >
            <Icon size={20} strokeWidth={isActive ? 3 : 2} className="flex-shrink-0" />
            {showSidebar && <p>{label}</p>}
          </Link>
              </li>
            );
          })}
        </ul>
        <div className="px-3">
          {/* <div className={`${showSidebar && "px-4"}`}> */}
          {showSidebar && (
            <div className="mb-4 border rounded-sm p-3">
              <p className="text-gray-500 text-sm mb-1 whitespace-nowrap">Anda masuk sebagai:</p>
              <p className="font-bold">Admin</p>
            </div>
          )}
          <form onSubmit={handleLogout}>
            <button type="submit" className="relative flex w-full items-center gap-6 my-3 text-sm text-red-500 rounded slideBgButton before:bg-red-100">
              <div className="flexCenter bg-red-100 px-2 py-3 rounded">
                <LogOut size={20} strokeWidth={2} className="rotate-180" />
              </div>
              {showSidebar && (
                <span>Keluar</span>
              )}
            </button>
          </form>
          {/* <Link href={"/login"} className="relative flex items-center gap-6 my-3 text-sm text-red-500 rounded slideBgButton before:bg-red-100">
            <div className="flexCenter bg-red-100 px-2 py-3 rounded">
              <LogOut size={20} strokeWidth={2} className="rotate-180" />
            </div>
            {showSidebar && (
              <span>Keluar</span>
            )}
          </Link> */}
        </div>
      </nav>
    </aside>
  )
}
