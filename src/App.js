import { useState, useEffect } from "react";
import Pizza from "./Components/Pizza";
import TotalTable from "./Components/TotalTable";



function App() {
  
 
  let namesArr= []
 
   const apiUrlGetGuests = 'https://gp-js-test.herokuapp.com/pizza/guests';
   const apiUrlGetCurrency = 'https://gp-js-test.herokuapp.com/pizza/currency';
  // const apiUrlGetDrink = `https://gp-js-test.herokuapp.com/pizza/order-cola/${countEatingPizza}`;
  //
    const [guests, setGuests]=useState([])
    const [vegan, setVegan]=useState([])  
  //const [eaters, setEaters]= useState([])
  //const [name, setName]= useState([])

  function Names(){
    guests.forEach(i=>namesArr.push(i.name))
   return namesArr
  }

  function getPizzaType(){
    let pizzaTypesVegan = ['vegan', 'cheese']
    if(vegan.length > guests.length / 100 * 50 ){
      let randomNum = Math.floor(Math.random() * 2)
         return pizzaTypesVegan[randomNum]
    }else{
         return 'meat'
    }
  }
  const loadGuests = async()=>{
    const response = await fetch(apiUrlGetGuests);
    const data = await response.json()
    setGuests(data.party.filter(note => note.eatsPizza === true ))
  }
  let link = Names().toString().replace(/ /ig, '%20')
  const apiUrlGetVegans = `https://gp-js-test.herokuapp.com/pizza/world-diets-book/${link}`;
  
  const loadVegans = async()=>{
    const response = await fetch(apiUrlGetVegans);
    const data = await response.json()
    setVegan(data.diet.filter(({isVegan})=> isVegan === true))
  }

  async function Currensy () {
    let response = await fetch(apiUrlGetCurrency)
    let json1 = await response.json()
    return json1
    }
          
  async function Order() {
      const apiUrlGetPizza = `https://gp-js-test.herokuapp.com/pizza/order/${getPizzaType()}/12`
      let response = await fetch(apiUrlGetPizza)
      let json2 = await response.json()
      return json2
      }

  let promises=[Currensy(), Order()]   

  useEffect(() => {
         loadGuests();  
         loadVegans();
        }, []) 
 

  
  
  Promise.all(promises)
    .then(results => {
   console.log(results);
 });

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
