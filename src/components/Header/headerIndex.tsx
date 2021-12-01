import React, { useContext } from 'react';
import RMDBLogo from '../../images/react-movie-logo.svg';
import TMDBLogo from '../../images/tmdb_logo.svg';
import { Wrapper, Content, LogoImg, TMDBLogoImg } from './Header.styles';
import ErrorBoundary from '../ErrorBoundary';
import { Link } from 'react-router-dom';
import { Context } from '../../context';


const Header: React.FC = () => {
    const [user] = useContext(Context);
    console.log(user);

    return (
        <Wrapper>
            <Content>
                <ErrorBoundary>
                    <Link to='/'>
                        <LogoImg src={RMDBLogo} alt='rmdb-logo' />
                    </Link>
                </ErrorBoundary>
                <ErrorBoundary>
                    {user ? ( 
                        <span>
                            Logged in as: {user.username}
                        </span>) :
                        <Link to='/login'>
                            <span>Log in</span>
                        </Link>
                    }
                </ErrorBoundary>
                <ErrorBoundary>
                    <Link to='/'>
                        <TMDBLogoImg src={TMDBLogo} alt='rmdb-logo' />
                    </Link>
                </ErrorBoundary>
            </Content>
        </Wrapper>
    );
}
    

export default Header;