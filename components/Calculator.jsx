import React, { useEffect, useRef, useState } from 'react'

function Calculator(props) {
    console.log(props.loaded);

    const refEndpoints = useRef()
    const [tableData, setTableData] = useState([])
    const [loaded, setLoaded] = useState()

    const handleInputChange = (key, value) => {
        updateTableData(key, 'count', value)
    };

    const initTableData = () => {
        const rows = props.pkg.cost.map(row => ({
            id: row.slug,
            name: row.name,
            cost: row.cost,
            price: row.price,
            count: 0,
            totalCost: 0,
            totalPrice: 0,
            margin: 0,
            requiredMin: row.requiredMin
        }))

        const monthlyRow = {
            id: 'monthly',
            name: "Monthly Total",
            totalCost: 0,
            totalPrice: 0,
            margin: 0,
        }

        const annualRow = {
            id: 'annually',
            name: "Annual Total",
            totalCost: 0,
            totalPrice: 0,
            margin: 0,
        }

        setTableData([...rows, monthlyRow, annualRow])
    }

    const updateTableData = (id, fieldName, value) => {

        const updatedData = tableData.map((row) => {
            if (row.id === id || row.id === undefined) {
                const totalCost = row.cost * value
                const totalPrice = calculateTotalPrice(value, row.requiredMin, row.price)
                const updatedRow = {
                    ...row, [fieldName]: value,
                    ['totalCost']: formatNumber(totalCost),
                    ['totalPrice']: formatNumber(totalPrice),
                    ['margin']: formatNumber(totalPrice - totalCost)
                }
                return updatedRow
            }
            return row
        })

        // Calculate totals for the "monthly" row
        const monthlyTotals = updatedData.reduce(
            (totals, row) => {
                if (row.id !== 'monthly' && row.id !== 'annually') {
                    totals.totalCost += parseFloat(row.totalCost || 0);
                    totals.totalPrice += parseFloat(row.totalPrice || 0);
                    totals.margin += parseFloat(row.margin || 0);
                }
                return totals;
            },
            { totalCost: 0, totalPrice: 0, margin: 0 }
        );

        // Update the "monthly" row
        const finalData = updatedData.map((row) => {
            if (row.id === 'monthly') {
                return {
                    ...row,
                    totalCost: formatNumber(monthlyTotals.totalCost),
                    totalPrice: formatNumber(monthlyTotals.totalPrice),
                    margin: formatNumber(monthlyTotals.margin),
                };
            }

            if (row.id === 'annually') {
                return {
                    ...row,
                    totalCost: formatNumber(monthlyTotals.totalCost * 12),
                    totalPrice: formatNumber(monthlyTotals.totalPrice * 12),
                    margin: formatNumber(monthlyTotals.margin * 12),
                };
            }

            return row;
        });

        // Update the state
        setTableData(finalData);

    }

    useEffect(() => {
        initTableData()
        setLoaded(props.loaded)
        setLoaded(true)

    }, [])

    // useEffect(() => {
    //     console.log("Loaded: ", loaded);
    // }, [loaded])


    const formatNumber = (value) => {
        return value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const calculateTotalPrice = (count, minCount, price) => {
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
        <div
            className={`mt-6 bg-blue-50 p-6 w-full flex flex-col justify-start items-start rounded shadow-md origin-top transform ${loaded ? 'scale-y-100' : 'scale-y-0'} transition-transform duration-700 ease-in-out`}
        >
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
                            {props.pkg.inputs.map((row, index) => (
                                <tr key={index} className="w-full mb-6">
                                    <td className="font-semibold w-1/4">{row.name}</td>
                                    <td><input
                                        className="border border-indigo-800 px-2 py-1"
                                        type="number"
                                        ref={refEndpoints}
                                        onKeyDown={(e) => {
                                            // Allow: Backspace, Tab, Arrow keys, Delete
                                            if (
                                                e.key === 'Backspace' ||
                                                e.key === 'Tab' ||
                                                e.key === 'ArrowLeft' ||
                                                e.key === 'ArrowRight' ||
                                                e.key === 'Delete'
                                            ) {
                                                return;
                                            }

                                            // Prevent non-numeric characters or negative values
                                            if (!/^\d$/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            // Ensure the value is a valid number >= 0
                                            if (value === '' || parseInt(value) >= 0) {
                                                handleInputChange(`${row.slug}`, value);
                                            } else {
                                                e.target.value = ''; // Reset invalid input
                                            }
                                        }}
                                    /></td>
                                </tr>
                            ))}
                            {/* <tr className="w-full mb-6">
                                <td className="font-semibold w-1/4">Endpoints</td>
                                <td><input className=" border border-indigo-800 px-2 py-1" type="number" ref={refEndpoints} onChange={handleCalculate} /></td>
                            </tr> */}
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
                            <th className="p-2">Selling Price</th>
                            <th className="p-2">Count</th>
                            <th className="p-2">Total Cost Price</th>
                            <th className="p-2">Total Selling Price</th>
                            <th className="p-2">Margin</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {tableData.map((row, index) => (
                            <tr key={index} className={`${row.id === 'monthly' ? 'font-bold bg-gray-100' : row.id === 'annually' ? 'font-bold bg-gray-300' : 'border-b border-indigo-200'}`}>

                                <td colSpan={row.id === 'monthly' || row.id === 'annually' ? 4 : 0}
                                    className={`${row.id === 'monthly' || row.id === 'annually' ? 'py-2 text-center' : ''}`}>{row.name}</td>

                                {(row.id !== 'monthly' && row.id !== 'annually') && <>
                                    <td>{row.cost}</td>
                                    <td>{row.price}</td>
                                    <td>{row.count}</td>
                                </>}

                                <td>{row.totalCost}</td>
                                <td>{row.totalPrice}</td>
                                <td>{row.margin}</td>
                            </tr>
                        ))}
                        {/* 
                        <tr className='font-bold bg-gray-100'>
                            <td colSpan={3} className='py-2 text-center'>Monthly Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='text-blue-600'></td>
                            <td className='text-blue-600'></td>
                        </tr>

                        <tr className='font-bold bg-gray-300'>
                            <td colSpan={3} className='py-2 text-center'>Annual Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='text-blue-600'></td>
                            <td className='text-blue-600'></td>
                        </tr> */}

                        {/* {props.pkg.cost.map((row, index) => (
                            <tr key={index} className="border-b border-indigo-200">
                                <td>{row.name}</td>
                                <td>{formatNumber(row.cost)}</td>
                                <td>{showCount(row.slug)}</td>
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
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calculator