import React from 'react'

const ProductTable =({ rows, loading })=> {
    console.log("Rows in ProductTable:", rows);
return (
    <section className=" flex justify-center border border-gray-300 rounded-md p-4 mt-4">
            <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-xs">
                        
                            <thead className='bg-gray-100'>
                                    <tr>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Bid Price</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Competitor</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Won</th>
                                    </tr>
                            </thead>
                            
                            <tbody>
                                
                                {
                                    
                                    loading ? (
                                        <tr>
                                            <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) :

                                    rows.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">
                                                No data available.
                                            </td>
                                        </tr>
                                    ) :

                                    rows.map(row => {
                                        return (
                                                <tr key={row._id} className="hover:bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2">{row.productName}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{row.bidPrice}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{row.year || "-"}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{row.competitor || "-"}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{row.won ? "Yes" : "No"}</td>
                                                </tr>
                                        )
                                })}
                            </tbody>
                    </table>
            </div>
    </section>
)
}

export default ProductTable;

// Product
// Bid Price
// Year
// Competitor
// Won