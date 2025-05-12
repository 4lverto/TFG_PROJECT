// shared/adapters/ui/Navbar.tsx

"use client";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-xl font-bold cursor-pointer hover:text-blue-400 transition">
          🏠 TFG - MediaPipe
        </span>
      </Link>

      <div className="space-x-4 text-sm">
        <Link href="/manual" className="hover:text-blue-300 transition">🎯 Manual</Link>
        <Link href="/autodeteccion" className="hover:text-blue-300 transition">🧠 Autodetección</Link>
      </div>
    </nav>
  );
}

export { Navbar };