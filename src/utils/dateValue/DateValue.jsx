import { useState } from "react";
import "./datevalue.scss";

export default function DateValue() {
    const [selectedButton, setSelectedButton] = useState(1);

    const handleBtnClick = (buttonId) => {
        setSelectedButton(buttonId);
    };

    return (
        <div className="datevalue">
            <button onClick={() => handleBtnClick(1)}
                className={selectedButton === 1 ? 'active' : ''}>1D</button>
            <button onClick={() => handleBtnClick(2)}
                className={selectedButton === 2 ? 'active' : ''}>1W</button>
            <button onClick={() => handleBtnClick(3)}
                className={selectedButton === 3 ? 'active' : ''}>1M</button>
            <button onClick={() => handleBtnClick(4)}
                className={selectedButton === 4 ? 'active' : ''}>3M</button>
            <button onClick={() => handleBtnClick(5)}
                className={selectedButton === 5 ? 'active' : ''}>6M</button>
            <button onClick={() => handleBtnClick(6)}
                className={selectedButton === 6 ? 'active' : ''}>1Y</button>
        </div>
    )
};