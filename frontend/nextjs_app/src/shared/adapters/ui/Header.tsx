/////////////////////
// Requirements
/////////////////////

import {Navbar} from "./Navbar";

/////////////////////
// Helpers
/////////////////////

function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md fixed top-0 w-full z-50">
      <Navbar />
    </header>
  );
}

/////////////////////
// Public Interface
/////////////////////

export { Header };