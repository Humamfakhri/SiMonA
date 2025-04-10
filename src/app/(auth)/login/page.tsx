"use client"

import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setLoading(false);
      router.push("/");
    } else {
      const data = await res.json();
      setLoading(false);
      setError(data.error);
    }
  };

  return (
    // <form className="bg-white p-8 rounded-xl shadow-lg text-center min-w-96">
    // <form onSubmit={handleLogin} className="glassmorphism-login bg-gradient-to-b from-primary/50 from-1% via-white/90 to-white/90 p-8 text-center min-w-96">
    <form onSubmit={handleLogin} className="glassmorphism-login p-8 text-center min-w-96">
      <div className="mb-10">
        <Image src="/images/logo.png" alt="logo" width={80} height={80} className="mx-auto mb-5" />
        <h1 className="text-xl font-bold mb-2">Selamat Datang!</h1>
        <p className="text-sm text-slate-600">Masukkan username dan password untuk masuk.</p>
      </div>
      <div className="div flex items-center gap-3 bg-gray-200/80 border px-3 py-2 text-sm rounded-lg mb-3">
        <UserRound width={24} className={username ? "text-slate-800" : "text-slate-500"} />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full bg-transparent outline-none text-slate-500 ${username ? "text-slate-800" : "text-slate-500"}`}
        />
      </div>
      <div className="div text-start flex flex-col gap-1 mb-5">
        <div className="div flex items-center gap-3 bg-gray-200/80 border px-3 py-2 text-sm rounded-lg mb-3">
          <LockKeyhole width={24} className={password ? "text-slate-800" : "text-slate-500"} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full bg-transparent outline-none ${password ? "text-slate-800" : "text-slate-500"} ${password && !showPassword ? "tracking-[0.2em]" : ""}`}
          />
          {showPassword ? (
            <button type="button" onClick={() => setShowPassword(false)}>
              <Eye
                className="cursor-pointer text-slate-500"
                width={22}
              />
            </button>
          ) : (
            <button type="button" onClick={() => setShowPassword(true)}>
              <EyeOff
                className="cursor-pointer text-slate-500"
                width={22}
              />
            </button>
          )}
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        onClick={() => setLoading(true)}
        className={`w-full text-white py-2 text-sm rounded-lg mt-5 flex justify-center items-center ${username && password ? "bg-primary" : "bg-slate-400 cursor-not-allowed"
          }`}
        disabled={!username || !password}
      >
        {loading ? (
          <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
          >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
          </svg>
        ) : (
          "Masuk"
        )}
      </button>
    </form>
  );
}
