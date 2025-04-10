// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Berhasil logout" });
  response.cookies.set("user", "", { maxAge: 0, path: "/" });
  return response;
}
