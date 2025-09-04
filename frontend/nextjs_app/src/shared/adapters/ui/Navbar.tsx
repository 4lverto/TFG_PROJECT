"use client";

/////////////////////
// Requirements
/////////////////////

import Link from "next/link";

/////////////////////
// Helpers
/////////////////////

function Navbar() {
  return (
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link href="/" className="text-4xl font-bold cursor-pointer hover:text-blue-400 transition">
        🏠 Inicio
      </Link>
    </nav>
  );
}

/////////////////////
// Public Interface
/////////////////////

export { Navbar };