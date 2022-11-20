import React from 'react'

import Main from './Main';

export default function Movies() {
  let type = ['Popular','Trending','Upcoming'];
  let url_type = [
    '/discover/movie?sort_by=popularity.desc&api_key=',
    '/trending/movie/week?api_key=',
    '/movie/upcoming?&api_key=',
    '/search/movie?api_key=7df2ae268ce4ddefdcfc55ae3ab35c86&query='
  ]
  return (
    <div>
       <Main type = {type} url_type = {url_type} show = 'movie'/>
    </div>
  )
}
