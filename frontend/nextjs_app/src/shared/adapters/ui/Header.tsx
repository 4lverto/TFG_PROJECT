// shared/adapters/ui/Header.tsx

import {Navbar} from "./Navbar";

function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md fixed top-0 w-full z-50">
      <Navbar />
    </header>
  );
}

export { Header };