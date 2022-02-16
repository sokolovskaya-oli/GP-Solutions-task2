import React, {useEffect, useState} from "react";


const TotalTable = ({guests, orders,currencyEx})=>{

    const orderPriceBYN = (orders, currencyEx) => {
        return orders.price.endsWith("USD") == orders.price.slice(-3) &&
            orders.price.endsWith("EUR")== orders.price.slice(-3) ? parseInt(orders.price)*currencyEx.orders.price.slice(-3)
           : parseInt(orders.price)
   }
    let allOrders = orderPriceBYN(orders, currencyEx);
    let oneOrder = Number.parseFloat(orderPriceBYN(orders, currencyEx) / guests.length);

    const [allMoneyCollected, setAllMoneyCollected] = useState(0);
    const [moneyToCollect, setMoneyToCollect]=useState(allOrders)
    const [buttonDisable, setButtonDisable]= useState(false)
    const [changePay, setChangePay]= useState(true)
    const payPart=()=>{
          setAllMoneyCollected(allMoneyCollected+oneOrder)
          setMoneyToCollect(moneyToCollect-oneOrder)
          setButtonDisable(!buttonDisable) 
          setChangePay(!changePay)     
    }
     
    return(
        <table className="total-table_wrapper">
        <tbody>
            <tr>
                <td>Name</td>
                <td>Share to pay</td>
                <td>Pay</td>
            </tr>
            {guests.map((item, index)=>
            <tr key={index}>
                <td>{item.name}</td>
                               
                <td>{oneOrder} BYN</td>
                <td key={index}> 
                    {changePay === true ? 
                    <button onClick={payPart} disabled={buttonDisable} value={index} className="table-btn btn">Pay</button> 
                    : <button disabled={buttonDisable} value={index} className="table-btn btn-dis">Paid
                    </button>}
                </td>
               
            </tr>)}
            <tr>
                <td>Total order</td>
                <td colSpan="2">{allOrders} BYN</td>
            </tr>
            <tr>
                <td>Money to collect</td>
                <td colSpan="2">{moneyToCollect} BYN</td>
            </tr>
            <tr>
                <td>Money collected</td>
                <td colSpan="2">{allMoneyCollected} BYN</td>
            </tr>
        </tbody>
    </table>

    )
}
export default TotalTable

