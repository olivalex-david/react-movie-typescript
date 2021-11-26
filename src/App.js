import React from 'react';
// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {GlobalStyle} from './GlobalStyle'
import Header from './components/Header/headerIndex.js';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Movie from './components/Movie';

const App = () => (
      <Router >
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/*' element={<NotFound />}/>
          <Route path='/:movieId/' element={<Movie />} />
        </Routes>
        <GlobalStyle/>
      </Router>
  );

export default App;
