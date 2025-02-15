import React from 'react';
import { useEffect,useState,useRef} from 'react';
import {Link} from 'react-router-dom';

export default function FavItem(props) {
    let img_path='https://image.tmdb.org/t/p/w500';
    const [detail,setDetail] = useState([]);
    const item = useRef();
    useEffect(()=>{
        let url = `https://api.themoviedb.org/3/${props.type}/${props.id}?api_key=7df2ae268ce4ddefdcfc55ae3ab35c86`;
        fetch(url).then((data)=>data.json()).then((details)=>setDetail(details));
        item.current.style.display = 'flex';
    },[props.id])
    function RemoveItem(){
        let localData = localStorage.getItem(props.type);
        let ids = localData.includes(',')? localData.split(','): localData.split();
        ids.splice(ids.indexOf(`${props.id}`),1);
         localStorage.setItem(props.type,ids);
        item.current.style.display = 'none';
    }

  return (
     <div>
      <div className='favItem' ref={item}> 
         <div className='fav-image' onClick={()=>window.scrollTo(0,0)}>
           <Link to={`/${props.type}/${props.id}`}>
           <img src={img_path+detail.poster_path} className='favImage'></img>
           </Link> 
         </div>
          <div className='fav-detail'>
            <div className='fav-title'>
                <h3>{detail.title?detail.title:detail.name}</h3>
                <div className='fav-rating'><div className='favIcon'><i className='fa fa-star'></i></div><b>{detail.vote_average}</b></div>
            </div>
             <div className='fav-block'>
                <div>{detail.runtime?detail.runtime:detail.episode_run_time} min |</div>
                <div> {detail.release_date?detail.release_date :detail.first_air_date} |</div>
                <div>{detail.spoken_languages && detail.spoken_languages[0] && <>{detail.spoken_languages[0].name}</>}</div>
             </div>
             <div className='fav-block2'>
                 <Link to={`/${props.type}/${props.id}`}><div className='play' onClick={()=>window.scrollTo(0,0)}>
                    <i className='fa-solid fa-play'></i> Play</div></Link>
                  <div onClick={RemoveItem} className='fav-remove'><i className ="fa fa-circle-minus"></i> Remove</div>  
             </div>
          </div>
    </div>
     </div>
   
  )
}
