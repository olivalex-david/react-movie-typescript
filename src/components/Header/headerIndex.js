import React from 'react';
import RMDBLogo from '../../images/react-movie-logo.svg';
import TMDBLogo from '../../images/tmdb_logo.svg';
import { Wrapper, Content, LogoImg, TMDBLogoImg } from './Header.styles';
import ErrorBoundary from '../ErrorBoundary';
import { Link } from 'react-router-dom';

const Header = () => (
    <Wrapper>
        <Content>
            <ErrorBoundary>
                <Link to='/'>
                    <LogoImg src={RMDBLogo} alt='rmdb-logo' />
                </Link>
            </ErrorBoundary>
            <ErrorBoundary>
                <Link to='/'>
                    <TMDBLogoImg src={TMDBLogo} alt='rmdb-logo' />
                </Link>
            </ErrorBoundary>
        </Content>
    </Wrapper>
);

export default Header;