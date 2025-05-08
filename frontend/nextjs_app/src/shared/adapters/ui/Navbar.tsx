'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-lg font-bold">TFG · Visión Artificial</span>
        <div className="flex gap-4">
          <Link href="/manual" className="hover:underline">Manual</Link>
          <Link href="/autodeteccion" className="hover:underline">Autodetección</Link>
        </div>
      </div>
    </nav>
  );
}
