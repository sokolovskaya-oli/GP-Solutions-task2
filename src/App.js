import { useState, useEffect } from "react";
import Pizza from "./Components/Pizza";
import TotalTable from "./Components/TotalTable";


function App() {

  const apiUrlGetGuests = 'https://gp-js-test.herokuapp.com/pizza/guests';
  const apiUrlGetCurrency = 'https://gp-js-test.herokuapp.com/pizza/currency';
  const apiUrlGetDrink = `https://gp-js-test.herokuapp.com/pizza/order-cola/12`;
  
    const [guests, setGuests]=useState([])
    const [vegan, setVegan]=useState([])  
    const [orders,setOrders]=useState([])
    const [currencyEx, setCurrencyEx]=useState([])
    const [drinks, setDrinks]= useState([])
    
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
     if(vegan.length >= 12 / 2){
        let randomNum = Math.floor(Math.random() * 2)
         return `https://gp-js-test.herokuapp.com/pizza/order/${pizzaTypesVegan[randomNum]}/12`
    }else{
         return `https://gp-js-test.herokuapp.com/pizza/order/meat/12`
    }
  }

   const order = async() => {
      let response = await fetch(getPizzaType(guests))
      let json2 = await response.json()
      setOrders(json2)
  }

  const currensyEx = async () => {
      let response = await fetch(apiUrlGetCurrency)
      let json1 = await response.json()
     setCurrencyEx(json1)
  }

  const drink = async () => {
    let response = await fetch(apiUrlGetDrink)
    let json3 = await response.json()
    setDrinks(json3)
}

 
 
      //   setEaters(getCommonState(guests, vegan))
  // let promises= [currensyEx(), order()];   

  // const loadPromises = async () => {
  //   Promise.all(promises)
  //   .then(results => {
  //    setOrders(results);
  //   });
  // }

  useEffect(() => {  
      loadGuests().then(dataURl => {
        if(dataURl) {
          loadVegans(dataURl)
        }
       })
      
        order()
        currensyEx()
        drink()
    }, [])   
  
  
  return (
    <div className="App">
       <button className="loading_btn loading">Загрузить</button>
        <div className="preloader">Waiting...</div>
        <TotalTable guests={guests} orders={orders} currencyEx={currencyEx} drinks={drinks} />
        <Pizza guests={guests} />
        
    </div>
  );
}

export default App;
