import { useState, useEffect } from "react";
import Pizza from "./Components/Pizza";
import TotalTable from "./Components/TotalTable";
import Button from "./Components/Button";


function App() {

  const apiUrlGetGuests = 'https://gp-js-test.herokuapp.com/pizza/guests';
  const apiUrlGetCurrency = 'https://gp-js-test.herokuapp.com/pizza/currency';
  
    const [guests, setGuests]=useState([])
    const [vegan, setVegan]=useState([])  
    const [orders,setOrders]=useState([])
    const [currencyEx, setCurrencyEx]=useState({})
    const [loading, setLoading] = useState(true);
    const [buttonClick, setButtonClick]=useState(true)
   

  const loadGuests = async()=>{
    const response = await fetch(apiUrlGetGuests);
    const data = await response.json()
       if (data) {
         const guestFilterData = data.party.filter(({ eatsPizza }) => eatsPizza === true )
        setGuests(guestFilterData);
        return getGuestLink(guestFilterData);
      }
    }
    
  const getGuestLink = (guestFilterData) => {
    let link = guestFilterData.map(({ name })=> name).toString().replace(/ /ig, '%20')
    return `https://gp-js-test.herokuapp.com/pizza/world-diets-book/${link}`
  }
   
  const loadVegans = async(urlGuest) => {   
    const response = await fetch(urlGuest);
    const data = await response.json()
      if (data) {
        setVegan(data.diet.filter(({ isVegan })=> isVegan === true))
        } 
  }
  
  const getPizzaType = () => {
    let pizzaTypesVegan = ['vegan', 'cheese']
    let count = vegan.length*2+3;
     if(vegan.length >= count/ 2){
        let randomNum = Math.floor(Math.random() * 2)
         return `https://gp-js-test.herokuapp.com/pizza/order/${pizzaTypesVegan[randomNum]}/${count}`
    }else{
         return `https://gp-js-test.herokuapp.com/pizza/order/meat/${count}`
    }
  }

   const order = async() => {
      let response = await fetch(getPizzaType(guests))
      let json = await response.json()
      setOrders(json)
  }

  const currensyEx = async () => {
      let response = await fetch(apiUrlGetCurrency)
      let json = await response.json()
     setCurrencyEx(json)
  }

  const buttonLoad =()=>{
  setLoading(!loading)
  setButtonClick(buttonClick)
 }
   
  // let promises= [currensyEx(), order()];   
  // const loadPromises = async () => {
  //   Promise.all(promises)
  //   .then(results => {
  //    setOrders(results);
  //   });
  // }

   useEffect(() => {  
    
      loadGuests().then(URl => {
        if(URl) {
          loadVegans(URl)
        }
       })
        order()
        currensyEx()
        }, [buttonClick])   
  
  
  return (
    <div className="App">
      <Button loading ={loading} buttonLoad={buttonLoad}/> 
     {loading || orders.length === 0 ? (<p>loading...</p>) :
  
     <>
        <Pizza guests={guests}  />  
        <TotalTable guests={guests} orders={orders} currencyEx={currencyEx}  />
     </> }
        
    </div>
  );
}

export default App;
