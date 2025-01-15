import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";


function Loader() {
    return (
        <div className='absolute w-full h-full z-50 backdrop-blur-3xl bg-indigo-900 bg-opacity-75'>
            <div className='absolute text-white text-6xl top-1/2 left-1/2 animate-spin'><AiOutlineLoading3Quarters /></div>
        </div>
    )
}

export default Loader