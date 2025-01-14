'use client'
import Calculator from "@/components/Calculator";
import { packages } from "@/data/mspPricing";
import { useEffect, useRef, useState } from "react";
import logo from '@/public/gw-logo.png'
import Image from "next/image";

export default function Home() {
  const [pkg, setPkg] = useState()
  const [logged, setLogged] = useState(false)
  const [error, setError] = useState()

  const refPasscode = useRef()

  const selectPackage = (pkg) => {
    setPkg(pkg.name)
  }

  const handleLogin = () => {
    if (refPasscode.current.value === 'x!PzPIZ6mk') {
      setLogged(true)
    } else {
      setError("Incorrect password!")
    }
  }

  return (
    <>

      <div className="w-full h-dvh flex flex-col bg-indigo-950">
        {/* <h2 className="bg-indigo-950 text-3xl px-6 text-white font-extrabold pt-2">MSP Calculator</h2> */}

        <div className="w-full h-fit flex justify-center  overflow-visible">
          {!logged ?
            (<div className="bg-indigo-50 h-fit mt-20 p-10 rounded">
              <div className="mb-4"><center><Image src={logo} alt="logo" width={200} /></center></div>
              <div className="font-bold text-3xl mb-20 text-indigo-950 italic">Login - MSP Calculator</div>
              <form action={handleLogin}>
                <div className="text-lg flex flex-col gap-2"><span>Passcode</span><input type="password" className="text-2xl px-4 border border-gray-300 shadow-sm rounded" ref={refPasscode} defaultValue={'x!PzPIZ6mk'} /></div>
                <div className="text-red-500 mt-4">{error}</div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded mt-10 w-full text-xl font-bold">Login</button>
                <div className="text-center mt-10">&copy; gatewayict - 2025</div>
              </form>
            </div>) :
            (<div className="bg-indigo-950 flex flex-col justify-evenly items-center px-32 py-10">
              {packages.map((row, index) => (
                <div key={index} className={` ${pkg === row.name ? 'bg-indigo-200' : 'bg-indigo-50'} w-full  m-6 p-4 shadow-lg rounded`} onClick={() => selectPackage(row)}>
                  <div className="text-2xl font-bold text-center uppercase text-red-700">{row.name}</div>
                  <div className="flex gap-4 justify-between">
                    {row.features.map((item, index) => (
                      <ul key={index} className={`bg-white px-4 py-4 mt-4 rounded-md shadow-md list-disc list-inside w-1/3`}><span className="font-bold inline-block text-nowrap">{item.name}</span>
                        {item.list.map((row, index2) => (
                          <li key={index2}>{row.name}</li>
                        ))}
                      </ul>
                    ))}
                  </div>

                  {pkg && pkg === row.name && <Calculator pkg={row} />}
                </div>
              ))}
            </div>)}


          {/* {pkg && ()} */}
        </div>
      </div>
    </>
  );
} 
