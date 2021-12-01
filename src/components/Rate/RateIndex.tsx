import { render } from '@testing-library/react';
import React, { useState } from 'react';

interface RateInterface {
    callBack: (value:number) => void;
}

const Rate: React.FC<RateInterface> = ({ callBack }) => {
    const [value, setValue] = useState(5);

    const settingValue = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement;
        const value = Number(target.value);

        setValue(value);
    }

    return (
        <div>
            <input 
                type="range" 
                min='1'
                max='10'
                value={value}
                onChange={settingValue}
            />
            {value}
            <p>
                <button onClick={() => callBack(value)}>Rate</button>
            </p>
        </div>

    );
}

export default Rate;