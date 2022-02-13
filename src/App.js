import { useState, useEffect } from "react";
import Pizza from "./Components/Pizza";
import TotalTable from "./Components/TotalTable";


function App() {
  
  const apiUrlGetGuests = 'https://gp-js-test.herokuapp.com/pizza/guests';
  const apiUrlGetCurrency = 'https://gp-js-test.herokuapp.com/pizza/currency';
  
  // const apiUrlGetDrink = `https://gp-js-test.herokuapp.com/pizza/order-cola/${countEatingPizza}`;
  //
    const [guests, setGuests]=useState([])
    const [vegan, setVegan]=useState([])  
    const [orders,setOrders]=useState({})
  //const [eaters, setEaters]= useState([])
    
  const loadGuests = async()=>{
    const response = await fetch(apiUrlGetGuests);
    const data = await response.json()
      if (data) {
        setGuests(data.party.filter(note => note.eatsPizza === true )) 
      }
  }

  // let link = guests.map(guest=>guest.name).toString().replace(/ /ig, '%20')
  // console.log(link)
  // const apiUrlGetVegans = `https://gp-js-test.herokuapp.com/pizza/world-diets-book/${link}`;  
  // console.log(apiUrlGetVegans)

  const loadVegans = async() => {
    console.log(apiUrlGetVegans)   
 
    const response = await fetch(apiUrlGetVegans);
    const data = await response.json()
      if (data) {
        setVegan(data.diet.filter(({isVegan})=> isVegan === true))
      } 
  }
  
    let link = guests.map(guest=>guest.name).toString().replace(/ /ig, '%20')
    console.log(link)
    const apiUrlGetVegans = `https://gp-js-test.herokuapp.com/pizza/world-diets-book/${link}`;  

  const currensyEx = async () => {
    let response = await fetch(apiUrlGetCurrency)
    let json1 = await response.json()
     return json1
  }
  console.log(guests.length)  
  console.log(vegan.length)  

 const getPizzaType = () => {
  let pizzaTypesVegan = ['vegan', 'cheese']
  if(vegan.length > guests.length / 100 * 50 ){
    let randomNum = Math.floor(Math.random() * 2)
       return pizzaTypesVegan[randomNum]
  }else{
       return 'meat'
  }
}
 
     
  const order = async() => {
      const apiUrlGetPizza = `https://gp-js-test.herokuapp.com/pizza/order/${getPizzaType()}/${guests.length}`
      let response = await fetch(apiUrlGetPizza)
      let json2 = await response.json()
      return json2
      }

  let promises= [currensyEx(), order()];   

  const loadPromises = async () => {
    Promise.all(promises)
    .then(results => {
     setOrders(results);
    });
  }

  useEffect(() => {
    

      loadGuests(apiUrlGetGuests);  
      loadVegans(apiUrlGetVegans);
      loadPromises()
    }, [])   
  

    // const LoadButton = () => {

    //   const [members, setMembers] = useState([])
    //   const [currency, setCurrency] = useState({})
    //   const [diet, setDiet] = useState([])
    //   const [veganPizza, setVeganPizza] = useState({})
    //   const [drinks, setDrinks] = useState({})
    //   const [collectedMoney, setCollectedMoney] = useState(0)
    
    //   useEffect(() => {
    //     const commonLink = "https://gp-js-test.herokuapp.com/pizza/"
    
    //     const getDataGuests = async () => {
    //       const response = await fetch(`${commonLink}guests`)
    //       const data = await response.json()
    //       setMembers(data.party)
    //     }
    
    //     const getDataCurrency = async () => {
    //       const response = await fetch(`${commonLink}currency`)
    //       const data = await response.json()
    //       setCurrency(data)
    //     }
    
    //     const getDataDiet = async (queryStr) => {
    //       const response = await fetch(`${commonLink}world-diets-book/${queryStr}`)
    //       const data = await response.json()
    //       setDiet(data.diet)
    //     }
    
    //     const getDataVeganPizza = async (vegansNumber) => {
    //       const response = await fetch(`${commonLink}order/vegan/${vegansNumber}`)
    //       const data = await response.json()
    //       setVeganPizza(data)
    //     }
    
    //     const getDataDrinks = async (membersNumber) => {
    //       const response = await fetch(`${commonLink}order-cola/${membersNumber}`)
    //       const data = await response.json()
    //       setDrinks(data)
    //     }
    
    //     getDataGuests()
    //     getDataCurrency()
    //     getDataDiet(members.map(guest => guest.name).join(",").split(" ").join("%20"))
    //     getDataVeganPizza(diet.filter(guest => guest.isVegan === true).length)
    //     getDataDrinks(members.length)
    
    //   }, [members, currency, diet, veganPizza, drinks])
    
    //   const checkFunction = () => {
    //     let appWrapper = document.querySelector(".app-wrapper")
    //     let button = document.querySelector(".button")
    //     if (appWrapper.childElementCount > 1) {
    //       if (appWrapper.lastChild === button) {
    //         return
    //       }
    //       appWrapper.removeChild(appWrapper.lastChild)
    //       checkFunction()
    //     }
    //   }
    
    //   const pizzaEaters = members.filter(member => member.eatsPizza === true)
    
    //   const veganPizzaFullPriceBYN = (veganPizza, currency) => {
    //     return veganPizza.price.endsWith("USD")
    //   ? Number(veganPizza.price.slice(-4)) / currency.USD
    //   : veganPizza.price.endsWith("EUR")
    //     ? Number(veganPizza.price.slice(-4)) / currency.EUR
    //     : veganPizza.price
    //   }
    
    //   const drinksFullPriceBYN = (drinks, currency) => {
    //     return drinks.price.endsWith("USD")
    //   ? Number(drinks.price.slice(-4)) / currency.USD
    //   : veganPizza.price.endsWith("EUR")
    //     ? Number(drinks.price.slice(-4)) / currency.EUR
    //     : drinks.price
    //   }
    

  return (
    <div className="App">
       <button className="loading_btn loading">Загрузить</button>
        <div className="preloader">Waiting...</div>
        <Pizza />
        <TotalTable />
    </div>
  );
}

export default App;
