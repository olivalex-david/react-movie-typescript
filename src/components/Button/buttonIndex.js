import React from 'react';
// styled component
import { Wrapper } from './Button.styles';
import PropTypes from 'prop-types';

const Button = ({text, callBack}) => (
    <Wrapper type="button" onClick={callBack} >
        {text}
    </Wrapper>
);

Button.propTypes = {
    text: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired
};

export default Button;