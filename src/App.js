import { useState, useEffect } from "react";
import Pizza from "./Components/Pizza";
import TotalTable from "./Components/TotalTable";



function App() {
  let countEatingPizza = 0;
  
   const apiUrlGetGuests = 'https://gp-js-test.herokuapp.com/pizza/guests';
  const apiUrlGetVegans = `https://gp-js-test.herokuapp.com/pizza/world-diets-book/{name}`;
  const apiUrlGetCurrency = 'https://gp-js-test.herokuapp.com/pizza/currency';
  // const apiUrlGetDrink = `https://gp-js-test.herokuapp.com/pizza/order-cola/${countEatingPizza}`;
  // const apiUrlGetPizza = `https://gp-js-test.herokuapp.com/pizza/order/${orderPizza}/${countEatingPizza}`
  
  const [guests, setGuests]=useState([])
  const [vegan, setVegan]=useState([])  
  const [eaters, setEaters]= useState([])
 
    useEffect(() => {
       fetch(apiUrlGetGuests)
        .then((response) => response.json())
        .then((json) => setGuests(json.party))
      // .catch((error) => alert(error))
    }, [setGuests])

    useEffect(() => {
      fetch(apiUrlGetVegans)
        .then((res) => res.json())
        .then((repos) => setVegan(repos.party));
      }, [setVegan])
   


// Promise.all([
//   httpGet('/article/promise/user.json'),
//   httpGet('https://gp-js-test.herokuapp.com/pizza/currency')
// ]).then(results => {
//   console.log(results);
// });

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
