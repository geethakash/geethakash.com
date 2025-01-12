import React from 'react';
import NavbarButton from './NavbarButton';

function Navbar() {
  const [isSideMenuOpen, setIsSideMenuOpen] = React.useState(false);
  return (
    <nav className=" w-full fixed z-50">
      <div className="flex mx-auto top-0 container justify-between items-center px-8 lg:px-20 pt-10 lg:pt-14">
        <a href="#" className="brand-logo">
          <span className="text-2xl font-bold tracking-wider text-gray-300">
            GeethAkash
          </span>
        </a>

        <NavbarButton/>
      </div>
    </nav>
  );
}

export default Navbar;
