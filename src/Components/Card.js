import React from 'react'
import { useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Card(props) {
   let favIcon = useRef();

    let img_path='https://image.tmdb.org/t/p/w500';
    let rating = JSON.stringify(props.info.vote_average).slice(0,3);
    let ids = [];

   useEffect(()=>{
      let localData = localStorage.getItem(props.type);
      if(localData != undefined) ids = localData.split(',');
      if(favIcon.current!= undefined && !ids.includes(`${props.info.id}`)){
      unMarkFavIcon();
     }
     if(ids.includes(`${props.info.id}`)){
        markFavIcon();
     }
   },[props.info.id]);

   function unMarkFavIcon(){
      favIcon.current.style.color = 'white';
      favIcon.current.className = 'fa-regular fa-heart';
      favIcon.current.style.animation = '';
   }
   function markFavIcon(){
      favIcon.current.className = 'fa-solid fa-heart';
      favIcon.current.style.color = 'red';
      favIcon.current.style.animation = 'pulse 1.5s linear';
   }
   function storeId(e){
      let localData = localStorage.getItem(props.type);
      if(localData != undefined) ids = localData.split(',');
      if(ids.includes(`${props.info.id}`)){
      unMarkFavIcon();
         ids.splice(ids.indexOf(`${props.info.id}`),1);
         localStorage.setItem(props.type,ids);
      }
      else{
           markFavIcon();
           ids.unshift(`${props.info.id}`);
           localStorage.setItem(props.type,ids);
      }
   }

  return (
   <>  
      <Link to={`/${props.type}/${props.info.id}`}>
        <img src={img_path+props.info.poster_path} onClick={()=>window.scrollTo(0,0)} className='poster'></img>
        <div className='card-play'><i className='fa-solid fa-play'></i></div>
       </Link> 
      <div className='movie-details'>
           <div className='box'>
              <div className='starIcon'><i className='fa fa-star'> {rating}</i></div>
              <div className='heart'>
               <i onClick={storeId} className='fa-regular fa-heart' ref={favIcon} id={props.Id} ></i>
              </div>
           </div>
            <div className='title'>
               <h4>{props.info.title?props.info.title:props.info.name}</h4>
           </div>
      </div>   
       
   </>
  )
}
