import React from 'react'
import { useState } from 'react';
import FavItem from './FavItem';

export default function Favourtite() {
  const [type,setType] = useState('movie');
     let Ids = [];
     let data = localStorage.getItem(type);
      if(data !== null){
       Ids = data.split(',');
       if(Ids.includes('')) Ids.splice(Ids.indexOf(''),1);
      } 
  return (
    <div className='favourites'>
        <div className='fav-button'>
          <button className={type === 'movie'?'fab-btn':''}
           onClick={()=>setType('movie')}>Movies</button>
          <button className={type === 'tv'?'fab-btn':''} onClick={()=>setType('tv')}>TV Shows</button></div>
        <div>
        <h2 className='fav-head'>{type === 'movie'?<>Favourite Movies</>:<>Favourite TV Shows</>}</h2>

             {Ids.length == 0?<p className='fav-notfound'>Not Found</p>:Ids.map((id,ind)=>{
                return(
                  <>
                     <FavItem type = {type} id = {id} key = {ind}/>
                  </>
                )
             })}  
        </div>  
    </div>
  )
}
