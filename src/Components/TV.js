import React from 'react'
import Main from './Main';

let type = ['Popular','Top Rated','Trending'];
let url_type = ['/tv/popular?api_key=','/tv/top_rated?api_key=','/trending/tv/week?api_key=',
                '/search/tv?api_key=7df2ae268ce4ddefdcfc55ae3ab35c86&query='];

export default function TV() {
  return (
    <div>
          <Main type={type} url_type = {url_type} show ='tv'/>
    </div>
    
  )
}
