import React, { useRef, useState } from 'react';

const Button = ({loading, buttonLoad}) => {
    const btnRef = useRef();
    
    return (
        <button
            ref={btnRef}
            className={`loading_btn ${loading ? 'loading' : ''}`}
            onClick={()=>buttonLoad()}
        >
           Загрузить
        </button>
        
    );
};
 
export default Button;