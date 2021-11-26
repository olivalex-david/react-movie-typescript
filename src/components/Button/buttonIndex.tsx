import React from 'react';
// styled component
import { Wrapper } from './Button.styles';

// Types
type Props = {
    text: string;
    callBack: () => void;
}

const Button: React.FC<Props> = ({text, callBack}) => (
    <Wrapper type="button" onClick={callBack} >
        {text}
    </Wrapper>
);


export default Button;