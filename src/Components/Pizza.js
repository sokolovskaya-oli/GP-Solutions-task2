import React from "react";

const Pizza =({guests, active})=>{
      
    return(
        <div className={`pizza_wrapper ${active ? 'active' : null}`}>
        <div className="pizza_container">
            {guests.map((step, index)=>{
              let styleLine= {
                transform:`rotate(${360/guests.length*index}deg)`
              }
              return (
                <div className="cut_line" key={index} style={styleLine}></div>
              )
            })}
        </div>
        <div className="descriptions"></div>
    </div>
    )
}
export default Pizza