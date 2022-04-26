import './App.css';
import React from 'react';
import { Route } from "react-router-dom";

import Inicio from './Components/Inicio/Inicio.jsx';
import NavBar from './Components/Navbar/Navbar.jsx'; 
import Home from './Components/Home/Home.jsx';
import RecipeDetail from './Components/Recipe_detail/Recipe_detail.jsx';
import Creator from './Components/Recipe_creator/Recipe_creator.jsx'


function App() {
  return (
    <React.Fragment>
      <Route exact path= '/' component= {Inicio} />
      <Route path = '/Recipe_Book' component= {NavBar} />
      <Route exact path= '/Recipe_Book' component= {Home} />
      <Route path= '/Recipe_Book/Recipe/:id' component= {RecipeDetail} />
      <Route path= '/Recipe_Book/create' component= {Creator} />
    </React.Fragment>
    
  );
}

export default App;
