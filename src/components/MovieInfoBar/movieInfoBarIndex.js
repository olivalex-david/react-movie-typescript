import React from "react";
// helpers
import { calcTime, convertMoney } from '../../helpers';
import { Wrapper, Content } from "./MovieInfoBar.styles";

import PropTypes from 'prop-types';

const MovieInfoBar = ({ time, budget, revenue }) => (

    <Wrapper>
        <Content>
            <div className="column">
                <p>Running time: {calcTime(time)}</p>
            </div>
            <div className="column">
                <p>Budget: {convertMoney(budget)}</p>
            </div>
            <div className="column">
                <p>Revenue: {convertMoney(revenue)}</p>
            </div>
        </Content>
    </Wrapper>
    
);

MovieInfoBar.propTypes = {
    time: PropTypes.number.isRequired,
    budget: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired
};

export default MovieInfoBar;