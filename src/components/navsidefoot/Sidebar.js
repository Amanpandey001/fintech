"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import Footer from './Footer'
import { FiMenu } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const [toggleNav, setToggleNav] = useState(false)
    const router = useRouter()
    const logout = async () => {
    
        try {
            const res = await axios.post("/api/users/logout");
    
            if (res.status === 200) {
                // Redirect to the login page after successful logout
                router.push("/login");
            } else {
                console.log("Logout failed with status:", res.status);
            }
    
            console.log(res);
        } catch (error) {
            console.log("Error in logging out", error);
        }
    };
    
    return (
        <>
            <div className='hidden w-[20%] sm:flex flex-col items-center border-r-2 border-gray-700 rounded-r-lg bg-green-200 p-3 h-full'>
                <span className='text-3xl font-semibold'>Options</span>
                <ul className='flex flex-col w-full my-3 items-center gap-4 p-3'>
                    <li className='w-full flex justify-center items-center'><Link className='px-[25%] py-2 hover:bg-teal-600 hover:text-white active:bg-teal-500 rounded-lg transition-all duration-150 text-xl font-bold bg-teal-200 ' href='/home'>Home</Link></li>
                    <li className='w-full flex justify-center items-center'><Link className='px-[25%] py-2 hover:bg-teal-600 hover:text-white active:bg-teal-500 rounded-lg transition-all duration-150 text-xl font-bold bg-teal-200 ' href='/dashboard'>Dashboard</Link></li>
                    <li className='w-full flex justify-center items-center'><Link className='px-[25%] py-2 hover:bg-teal-600 hover:text-white active:bg-teal-500 rounded-lg transition-all duration-150 text-xl font-bold bg-teal-200 ' href='/tips'>Tips</Link></li>
                    <li className='w-full flex justify-center items-center '><button onClick={logout} className='px-[25%] py-2 hover:bg-teal-600 hover:text-white active:bg-teal-500 rounded-lg transition-all duration-150 text-xl font-bold bg-teal-200 ' >Logout</button></li>
                    
                </ul>
                <div className='fixed bottom-0'>
                    <Footer />
                </div>
            </div>
            <div className='sm:hidden'>
                <span className='absolute top-3 left-5' onClick={() => setToggleNav(true)}><FiMenu size={30} /></span>
                <div className={toggleNav ? 'absolute top-0 left-0 w-screen h-screen bg-slate-200' : 'hidden'}>
                    <span className=' mx-5' onClick={() => setToggleNav(false)}><IoIosCloseCircleOutline size={30} /></span>
                    <ul className='flex flex-col w-full my-3 items-center gap-4 p-3'>
                        <li className='w-full flex justify-center items-center'><Link onClick={()=>{setToggleNav(false)}} className='px-[25%] py-2 hover:bg-teal-600 hover:text-white active:bg-teal-500 rounded-lg transition-all duration-150 text-xl font-bold bg-teal-200 ' href='/home'>Home</Link></li>
                        <li className='w-full flex justify-center items-center'><Link onClick={()=>{setToggleNav(false)}} className='px-[25%] py-2 hover:bg-teal-600 hover:text-white active:bg-teal-500 rounded-lg transition-all duration-150 text-xl font-bold bg-teal-200 ' href='/dashboard'>Dashboard</Link></li>
                        <li className='w-full flex justify-center items-center'><Link onClick={()=>{setToggleNav(false)}} className='px-[25%] py-2 hover:bg-teal-600 hover:text-white active:bg-teal-500 rounded-lg transition-all duration-150 text-xl font-bold bg-teal-200 ' href='/tips'>Tips</Link></li>
                        <li onClick={()=>{setToggleNav(false)}} className='w-full flex justify-center items-center'><button   onClick={logout} className='px-[25%] py-2 hover:bg-teal-600 hover:text-white active:bg-teal-500 rounded-lg transition-all duration-150 text-xl font-bold bg-teal-200 ' >Logout</button></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
