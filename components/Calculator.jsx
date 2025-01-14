import React, { useRef, useState } from 'react'

function Calculator(props) {

    const [count, setCount] = useState(0)
    const refEndpoints = useRef()


    const handleCalculate = () => {
        setCount(refEndpoints.current.value)
    }

    const formatNumber = (value) => {
        return value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const calculateTotalSellingPrice = (count, minCount, price) => {
        if (count <= 0) {
            return 0
        }

        if (count < minCount) {
            return minCount * price
        } else {
            return count * price
        }
    }


    return (
        <div className="mt-6 bg-blue-50 p-6 w-full flex flex-col justify-start items-start rounded shadow-md">
            <div className='flex w-full'>
                <div className='w-1/3'>
                    <ul className="mb-4 list-disc list-inside text-red-600 font-bold">
                        <li>Minimum {props.pkg.minCount} endpoints</li>
                        {props.pkg.minRequirements.map((row, index) => (
                            <li key={index}>{row.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-start w-1/3">
                    <table className="w-full">
                        <tbody>
                            <tr className="w-full mb-6">
                                <td className="font-semibold w-1/4">Endpoints</td>
                                <td><input className=" border border-indigo-800 px-2 py-1" type="number" ref={refEndpoints} onChange={handleCalculate} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='w-1/3 border border-gray-300 p-4 text-blue-800 bg-lime-200 italic'>
                    <span className=' font-bold'>Vendors</span>
                    <ul className='list-inside list-disc'>
                        {props.pkg.vendors.map((row, index) => (
                            <li key={index}>{row.name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-white shadow-gray-700 shadow-inner p-6 h-full w-full mt-4">
                <table className="w-full">
                    <thead className="bg-blue-800 text-white uppercase">
                        <tr >
                            <th className="p-2">Products</th>
                            <th className="p-2">Cost Price</th>
                            <th className="p-2">Count</th>
                            <th className="p-2">Total Cost Price</th>
                            <th className="p-2">Total Selling Price</th>
                            <th className="p-2">Margin</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {props.pkg.cost.map((row, index) => (
                            <tr key={index} className="border-b border-indigo-200">
                                <td>{row.name}</td>
                                <td>{formatNumber(row.cost)}</td>
                                <td>{count}</td>
                            </tr>
                        ))}

                        <tr className='font-bold bg-gray-100'>
                            <td className='py-2'>Monthly Total</td>
                            <td>{props.pkg.costPrice}</td>
                            <td>{count}</td>
                            <td>{formatNumber(count * props.pkg.costPrice)}</td>
                            <td>{formatNumber(calculateTotalSellingPrice(count, props.pkg.minCount, props.pkg.sellingPrice))}</td>
                            <td className='text-blue-600'>{formatNumber(calculateTotalSellingPrice(count, props.pkg.minCount, props.pkg.sellingPrice) - (count * props.pkg.costPrice))}</td>
                        </tr>

                        <tr className='font-bold bg-gray-300'>
                            <td className='py-2'>Annual Total</td>
                            <td>{props.pkg.costPrice}</td>
                            <td>{count}</td>
                            <td>{formatNumber(count * props.pkg.costPrice * 12)}</td>
                            <td>{formatNumber(calculateTotalSellingPrice(count, props.pkg.minCount, props.pkg.sellingPrice) * 12)}</td>
                            <td className='text-blue-600'>{formatNumber((calculateTotalSellingPrice(count, props.pkg.minCount, props.pkg.sellingPrice) * 12) - (count * props.pkg.costPrice * 12))}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calculator