/////////////////////
// Requirements
/////////////////////

import {Navbar} from "./Navbar";

/////////////////////
// Helpers
/////////////////////

function Header() {
  return (
    <header className="w-full h-20 fixed top-0 bg-gray-900 text-white shadow-md ">
      <Navbar />
    </header>
  );
}

/////////////////////
// Public Interface
/////////////////////

export { Header };