import React, { Children, useRef } from "react";

const Pizza =({guests})=>{
    const div= useRef();

    const cutPizza = ()=> {
        let countEatingPizza = guests.length;
 
   // let sliseStep = 360/countEatingPizza ;
    let part=countEatingPizza/2
      for(let i = 0; i < part; i++){ 
        
           let cutLine = React.createElement("div", {className: "cut_line"}, Children)
         //  cutLine.style.transform = `rotate(${sliseStep*i}deg)`
       }}
       cutPizza()

    return(
        <div className="pizza_wrapper">
        <div ref={div} className="pizza_container"></div>
        <div className="descriptions"></div>
    </div>
    )
}
export default Pizza