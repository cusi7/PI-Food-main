import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

export default function NavBar() {
     return (
         <nav id="elNav">
             <ul className="nav">

               <li className="liNav">
                 <p id='logo'>Recipe book</p>
               </li>
                
                 <li className="liNav">
                   <Link to="/Recipe_Book" className='link'>Home</Link>
                 </li>
                 
                 <li className="liNav">
                   <Link to="/Recipe_Book/create" className='link'>Crea tu receta</Link>
                 </li>
                 
             </ul>
         </nav>
     )
};