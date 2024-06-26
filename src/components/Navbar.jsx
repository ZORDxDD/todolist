import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between  bg-slate-700 py-3 text-white ">
        <div className="logo mx-10">
            <span className="font-bold text-xl">The Done List</span>
        </div>
        <div className="navbar">
        <ul className=" flex gap-4 mx-10">
                <li>Home</li>
                <li>About Us</li>
                <li>Contact</li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
