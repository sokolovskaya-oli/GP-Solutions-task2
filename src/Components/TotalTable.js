import React from "react";


const TotalTable = ({guests, orders,currencyEx,drinks})=>{
    const totalCosts = ()=>{
        let count = guests.length;
        console.log(count)
        let pizzaCost = orders.price;
        console.log(pizzaCost)
        let curs = currencyEx.EUR
        let cola = drinks.price
        console.log(cola)
        let total = (pizzaCost+cola)/count
         console.log(total)
      }
    
    return(
        
        <table className="total-table_wrapper">
        <tbody>
            <tr>
                <td>Name</td>
                <td>Share to pay</td>
                <td>Pay</td>
            </tr>
            {guests.map(item=>
            <tr key={Date.now()}>
               
                    <td>{item.name}</td>
                
                
                <td>{totalCosts()}</td>
                <td><button>Pay</button></td>
            </tr>)}
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

