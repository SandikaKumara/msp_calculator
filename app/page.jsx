'use client'
import { packages } from "@/data/mspPricing";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [pkg, setPkg] = useState()
  const [agents, setAgents] = useState([])
  const [users, setUsers] = useState([])
  const [learners, setLearners] = useState([])
  const [endpointCount, setEndpointCount] = useState(0)
  const [userCount, setUserCount] = useState(0)
  const [learnerCount, setLearnerCount] = useState(0)
  const [minAgents, setMinAgents] = useState()
  const [ninjaOne, setNinjaOne] = useState(3.61)
  const [backupCost, setBackupCost] = useState(5.76)
  const [endpointCost, setEndpointCost] = useState(0)
  const [userCost, setUserCost] = useState(0)
  const [learnerCost, setLearnerCost] = useState(0)


  const refEndpoints = useRef()
  const refUsers = useRef()
  const refLearners = useRef()

  const selectPackage = (pkg) => {
    setPkg(pkg.name)
    setAgents(pkg.agents)
    setUsers(pkg.users)
    setLearners(pkg.learners)
    setMinAgents(pkg.minAgents)
  }

  const handleCalculate = () => {
    setEndpointCount(refEndpoints.current.value);
    setUserCount(refUsers.current.value)
    setLearnerCount(refLearners.current.value)
  }

  // useEffect(() => {
  //   refEndpoints.current.value = 0
  //   refUsers.current.value = 0
  //   refLearners.current.value = 0
  // }, [])

  const findCost = (list, listCount) => {
    // Sort the list array in ascending order of count to ensure proper range checking
    list.sort((a, b) => a.count - b.count);

    // Find the relevant cost
    for (let i = 0; i < list.length; i++) {
      if (listCount <= list[i].count) {
        return list[i].cost;
      }
    }

    // If listCount exceeds all available ranges, return the cost of the highest range
    return list[list.length - 1].cost;
  };

  const formatNumber = (value) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    // return value
  };

  useEffect(() => {
    const calculate = () => {
      let cost = 0
      let price = 0

      const agentCost = findCost(agents, endpointCount)
      setEndpointCost(agentCost)

      const userCost = findCost(users, userCount)
      setUserCost(userCost)

      const learnerCost = findCost(learners, learnerCount)
      setLearnerCost(learnerCost)

      // if (endpointCount < minAgents) {
      //   cost = endpointCost * minAgents
      // } else {
      //   cost = endpointCost * endpointCount
      // }

      // console.log(cost);
    }

    pkg && calculate()
  }, [pkg, endpointCount, userCount, learnerCount])

  const calculateCost = (itemCost, count) => {
    if (!count || count < 1) {
      return 0
    }

    return itemCost * count
  }

  const calculatePrice = (itemCost, count) => {
    if (!count || count < 1) {
      return 0
    }

    itemCost = itemCost * 150 / 100
    if (count < minAgents) {
      return itemCost * minAgents
    } else {
      return itemCost * count
    }
  }

  const totalCost = () => {
    const endpointCostValue = calculateCost(endpointCost, endpointCount)

    const userCostValue = calculateCost(userCost, userCount)

    const learnerCostValue = calculateCost(learnerCost, learnerCount)

    const ninjaOneCost = calculateCost(ninjaOne, endpointCount)

    const apBackupCost = calculateCost(backupCost, endpointCount)

    return endpointCostValue + userCostValue + learnerCostValue + ninjaOneCost + apBackupCost
    // return (endpointCostValue + userCostValue + learnerCostValue + ninjaOneCost + apBackupCost)
  }

  const totalPrice = () => {
    const endpointCostValue = calculatePrice(endpointCost, endpointCount)

    const userCostValue = calculatePrice(userCost, userCount)

    const learnerCostValue = calculatePrice(learnerCost, learnerCount)

    const ninjaOneCost = calculatePrice(ninjaOne, endpointCount)

    const apBackupCost = calculatePrice(backupCost, endpointCount)

    return endpointCostValue + userCostValue + learnerCostValue + ninjaOneCost + apBackupCost
  }

  const handleReset = () => {
    setEndpointCount(0)
    setUserCount(0)
    setLearnerCount(0)
    refEndpoints.current.value = 0
    refUsers.current.value = 0
    refLearners.current.value = 0
  }


  return (
    <div className="w-full h-screen flex flex-col">
      {/* <h2 className="bg-indigo-950 text-3xl px-6 text-white font-extrabold pt-2">MSP Calculator</h2> */}

      <div className="w-full h-screen flex bg-indigo-950">
        <div className="bg-indigo-950 flex flex-col justify-evenly items-center">

          {packages.map((row, index) => (
            <div key={index} className={` ${pkg === row.name ? 'bg-indigo-200' : 'bg-indigo-50'} ${!pkg && 'w-2/3'}  m-6 p-4 shadow-lg rounded`} onClick={() => selectPackage(row)}>
              <div className="text-2xl font-bold text-center uppercase text-red-700">{row.name}</div>
              <div className="flex gap-4 justify-between">
                {row.features.map((item, index) => (
                  <ul key={index} className="bg-white px-4 py-4 mt-4 rounded-md shadow-md list-disc list-inside"><span className="font-bold inline-block text-nowrap">{item.name}</span>
                    {item.list.map((row, index2) => (
                      <li key={index2}>{row.name}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}

        </div>

        {pkg && (<div className="bg-blue-50 p-6 w-full flex flex-col justify-start ">
          <h1 className="text-3xl mb-10 font-extrabold">Selected Package : <span className="text-blue-500">{pkg} (Min.agents {minAgents})</span></h1>
          <div className="flex items-end">
            <table className="w-1/2">
              <tbody>
                <tr className="w-full mb-10">
                  <td className="w-1/2  font-semibold">Endpoints</td>
                  <td><input className=" border border-indigo-800 px-2 py-1" type="number" ref={refEndpoints} onChange={handleCalculate} /></td>
                </tr>
                <tr className="w-full">
                  <td className="w-1/2  font-semibold">Users</td>
                  <td><input className=" border border-indigo-800 px-2 py-1" type="number" ref={refUsers} onChange={handleCalculate} /></td>
                </tr>
                <tr className="w-full">
                  <td className="w-1/2  font-semibold">Learners</td>
                  <td><input className=" border border-indigo-800 px-2 py-1" type="number" ref={refLearners} onChange={handleCalculate} /></td>
                </tr>
              </tbody>
            </table>
            <div className="flex gap-4 px-4">
              {/* <button className="bg-blue-500 text-blue-50 px-4 py-2 rounded uppercase" onClick={handleCalculate}>Calculate</button> */}
              <button className="bg-emerald-500 text-emerald-50 px-4 py-2 rounded uppercase" onClick={handleReset}>Reset</button>
            </div>
          </div>

          <div className="mt-20 bg-white shadow-gray-700 shadow-inner p-6">
            <table className="w-full">
              <thead className="bg-blue-800 text-white uppercase">
                <tr >
                  <th className="p-2">#</th>
                  <th className="p-2">Per Cost</th>
                  <th className="p-2">Count</th>
                  <th className="p-2">Per Price</th>
                  <th className="p-2">Total Cost</th>
                  <th className="p-2">Total Price</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="border-b border-indigo-200">
                  <td>Endpoints</td>
                  <td>{formatNumber(endpointCost)}</td>
                  <td>{endpointCount}</td>
                  <td>{formatNumber(endpointCost * 150 / 100)}</td>
                  <td>{formatNumber(calculateCost(endpointCost, endpointCount))}</td>
                  <td>{formatNumber(calculatePrice(endpointCost, endpointCount))}</td>
                </tr>
                <tr className="border-b border-indigo-200">
                  <td>Users</td>
                  <td>{formatNumber(userCost)}</td>
                  <td>{userCount}</td>
                  <td>{formatNumber(userCost * 150 / 100)}</td>
                  <td>{formatNumber(calculateCost(userCost, userCount))}</td>
                  <td>{formatNumber(calculatePrice(userCost, userCount))}</td>
                </tr>
                <tr className="border-b border-indigo-200">
                  <td>Learners</td>
                  <td>{formatNumber(learnerCost)}</td>
                  <td>{learnerCount}</td>
                  <td>{formatNumber(learnerCost * 150 / 100)}</td>
                  <td>{formatNumber(calculateCost(learnerCost, learnerCount))}</td>
                  <td>{formatNumber(calculatePrice(learnerCost, learnerCount))}</td>
                </tr>
                <tr className="border-b border-indigo-200">
                  <td>NinjaOne</td>
                  <td>{formatNumber(ninjaOne)}</td>
                  <td>{endpointCount}</td>
                  <td>{formatNumber(ninjaOne * 150 / 100)}</td>
                  <td>{formatNumber(calculateCost(ninjaOne, endpointCount))}</td>
                  <td>{formatNumber(calculatePrice(ninjaOne, endpointCount))}</td>
                </tr>
                <tr className="border-b border-indigo-200">
                  <td>Avepoint Backup</td>
                  <td>{backupCost}</td>
                  <td>{endpointCount}</td>
                  <td>{backupCost * 150 / 100}</td>
                  <td>{formatNumber(calculateCost(backupCost, endpointCount))}</td>
                  <td>{formatNumber(calculatePrice(backupCost, endpointCount))}</td>
                </tr>
                <tr className="font-bold">
                  <td colSpan={4} className="py-2 uppercase">Total Monthly</td>
                  <td>{formatNumber(totalCost())}</td>
                  <td>{formatNumber(totalPrice())}</td>
                </tr>
                <tr className="bg-gray-600 text-white font-bold">
                  <td colSpan={4} className="py-2 uppercase">Total Annual</td>
                  <td>{formatNumber(totalCost() * 12)}</td>
                  <td>{formatNumber(totalPrice() * 12)}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>)}
      </div>
    </div>
  );
} 
