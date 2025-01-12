import React from 'react';

function NavbarButton({ open=true, onClick }) {
  return (
    <>
      <button className="group cursor-pointer w-8 h-10 flex justify-center items-center flex-col gap-y-2">
        <div
          className={`w-full h-[2px] bg-gray-400 -translate-x-2 transition-all duration-300 group-hover:translate-x-2`}
        ></div>
        <div className="w-full h-[2px] bg-gray-400 translate-x-2 transition-all duration-300 group-hover:-translate-x-2"></div>
      </button>
    </>
  );
}

export default NavbarButton;