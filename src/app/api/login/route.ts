import { NextResponse } from "next/server";
import { users } from "@/lib/users";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "Akun tidak ditemukan" }, { status: 401 });
  }

  // Simpan session ke cookie (sederhana)
  const response = NextResponse.json({ message: "Berhasil masuk", user });

  response.cookies.set("user", JSON.stringify({ username: user.username, role: user.role }), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 hari
  });

  return response;
}
