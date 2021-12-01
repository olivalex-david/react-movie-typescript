import React, { useContext } from 'react';
// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {GlobalStyle} from './GlobalStyle'
import Header from './components/Header/headerIndex';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Movie from './components/Movie';
import Login from './components/Login';
//Context
import UserProvider from './context';
import Context from './context';

const App: React.FC = () => {
  //const [user] = useContext(Context);
  
  return(  
      <Router >
        <UserProvider>
          <Header/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/*' element={<NotFound />}/>
            <Route path='/:movieId/' element={<Movie />} />
          </Routes>
          <GlobalStyle/>
        </UserProvider>
      </Router>
  );
};
export default App;
