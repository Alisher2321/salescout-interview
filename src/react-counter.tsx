import React, { useState } from 'react';

function Counter() {
    // Initialize counter state with 0
    const [counter, setCounter] = useState(0);

    // Handle increase button click
    const handleIncrease = () => {
        setCounter(prevCounter => prevCounter + 1);
    };

    // Handle decrease button click
    const handleDecrease = () => {
        setCounter(prevCounter => prevCounter - 1);
    };

    return (
        <div>
            <p>Counter: {counter}</p>
            <button onClick={handleIncrease}>Increase</button>
            <button onClick={handleDecrease}>Decrease</button>
        </div>
    );
}

export default Counter;
