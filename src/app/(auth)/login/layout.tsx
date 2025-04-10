import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 400 500 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 400 500 900",
});

export const metadata: Metadata = {
  title: "Login | SiMonA",
  description: "Generated by create next app",
};

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("user");

  if (userCookie) {
    redirect("/"); // 🚫 Redirect ke halaman login jika belum login
  }
  return (
    // <div className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-center justify-center min-h-screen w-full bg-gray-100`}>
    // <div className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-center justify-center min-h-screen w-full bg-gradient-to-t from-primary to-white`}>
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-center justify-center min-h-screen w-full login-bg`}>
      {children}
    </div>
  );
}
