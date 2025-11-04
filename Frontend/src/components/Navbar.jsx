import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { AiOutlineHome} from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";


const Navbar = () => {

    return (
        <>
        <div className="sticky top-0 z-50 flex justify-center items-center pt-4 text-black">
            <div className="navbar bg-transparent backdrop-blur-xl shadow-2xl w-11/12 rounded-2xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to="/" className="text-black transition duration-300 ease-in-out rounded-2xl active:text-cyan-300 active:bg-transparent active:scale-95 hover:text-cyan-300 hover:bg-transparent hover:scale-105"><AiOutlineHome size={24} />Home</Link></li>
                            <li><Link to="/HowItWorks" className="text-black transition duration-300 ease-in-out rounded-2xl active:text-cyan-300 active:bg-transparent active:scale-95 hover:text-cyan-300 hover:bg-transparent hover:scale-105"><LuBrain size={24} />HowItWorks</Link></li>
                            <li><Link to="/About" className="text-black transition duration-300 ease-in-out rounded-2xl active:text-cyan-300 active:bg-transparent active:scale-95 hover:text-cyan-300 hover:bg-transparent hover:scale-105"><IoInformationCircleOutline size={24} />About</Link></li>
                        </ul>
                    </div>
                    <a className="bg-transparent border-0"><img src={logo} alt="logo" className="h-16 w-20 rounded-full" /></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-6 px-1 ">
                        <li><Link to="/" className="text-black text-xl transition duration-300 ease-in-out rounded-2xl active:text-cyan-300 active:bg-transparent active:scale-95 hover:text-cyan-300 hover:bg-transparent hover:scale-105 "><AiOutlineHome size={24} />Home</Link></li>
                        <li><Link to="/HowItWorks" className="text-black text-xl transition duration-300 ease-in-out rounded-2xl active:text-cyan-300 active:bg-transparent active:scale-95 hover:text-cyan-300 hover:bg-transparent hover:scale-105 "><LuBrain size={24} />HowItWorks</Link></li>
                        <li><Link to="/About" className="text-black text-xl transition duration-300 ease-in-out rounded-2xl active:text-cyan-300 active:bg-transparent active:scale-95 hover:text-cyan-300 hover:bg-transparent hover:scale-105 "><IoInformationCircleOutline size={24} />About</Link></li>
                    </ul>
                </div>
            </div>
            </div>

        </>
    )
}

export default Navbar