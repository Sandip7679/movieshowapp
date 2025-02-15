import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import {useState} from 'react'
import Favourite from './Favourtite';
const logoimage = require('../assets/images/movieapplogo.png');
export default function Navbar(props) {

   const [fav,setFav] = useState(false);

   useEffect(()=>{
     props.func(fav);
   },[fav])
   
   useEffect(()=>{
    setFav(props.favourite);
   },[props.favourite])
   
  return (
    <>
        <div className='header' onClick={()=>props.func(false)}> 
        <nav >
            {/* <div className='movielogo'><img src="images/movieapplogo.png" alt="" /></div> */}
            <div className='movielogo'><img src={logoimage} alt="" /></div>
            <ul>
                <li><NavLink  to='/movieshowapp'>Home</NavLink></li>
                <li><NavLink to='/movie'>Movies</NavLink></li>
                <li><NavLink to='/tv'>TV Shows</NavLink></li>
            </ul>
            <ul>
                <li onClick={()=>setFav(!fav)}><i style={{color:'red'}} className='fa-solid fa-heart'></i> Favourites</li>
            </ul>
         </nav>
       </div>
       <div>
             {(fav && props.favourite) && <><Favourite/></>}
       </div>
    </>
  )
}
