import React from "react";


const TotalTable = ()=>{
    return(
        
        <table className="total-table_wrapper">
        <tbody>
            <tr>
                <td>Name</td>
                <td>Share to pay</td>
                <td>Pay</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td><button>Pay</button></td>
            </tr>
            <tr>
                <td>Total order</td>
                <td colSpan="2"></td>
            </tr>
            <tr>
                <td>Money to collect</td>
                <td colSpan="2"></td>
            </tr>
            <tr>
                <td>Money collected</td>
                <td colSpan="2"></td>
            </tr>
        </tbody>
    </table>

    )
}
export default TotalTable

