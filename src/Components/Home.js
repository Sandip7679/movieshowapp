import React from 'react'
import SlideShow from './SlideShow';
import {useState} from 'react';
import Main from './Main';
let url_type = '';
let title = '';
let type = [];
let show = '';
export default function Home() {

    let tv_trending = '/trending/tv/week?api_key=';
    let movie_trending = '/trending/movie/week?api_key=';
    let movie_popular = '/movie/popular?api_key=';
    let tv_popular = '/tv/popular?api_key=';
    const [allType,setType] = useState(true);

    function showData(url,title_type,showType){
           title = title_type;
           url_type = [`${url}`,`/search/${showType}?api_key=7df2ae268ce4ddefdcfc55ae3ab35c86&query=`]
           show = showType;
           setType(false);
    }

  return (
    <>
     {allType && <div className='home'>
          <SlideShow url = {movie_trending} title = 'Trending Movies' type='movie' func = {showData}/>
          <SlideShow url = {tv_trending} title='Trending TV Shows' type = 'tv'  func = {showData}/>
           <SlideShow url = {movie_popular} title= 'Popular Movies' type = 'movie'  func = {showData}/>
           <SlideShow url = {tv_popular} title= 'Popular TV Shows' type = 'tv'  func = {showData}/>
    </div>
    }
      {!allType && <>
         <div className='goback' onClick={()=>setType(true)}>
            <i className='fas fa-arrow-left'></i> Go Back
          </div>  
         <div className='slide_home'>{title}</div>
         <Main type = {type} url_type = {url_type} show = {show}/>
      </>}
    </>
  )
}
