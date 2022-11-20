import './App.css';
import Navbar from './Components/Navbar';
import TV from './Components/TV';
import Movies from './Components/Movies';
import {useState} from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import ShowDetails from './Components/ShowDetails';
// import People from './Components/People';
import Home from './Components/Home';
function App() {
  const [fav,setFav] = useState(false);
  function setfav(navData){
      setFav(navData);
  }
  return (
    <>
     <Router>
       <div >
          <Navbar func = {setfav} favourite = {fav}/>
         <div onClick={()=>setFav(false)}>
          <Routes>
            <Route path='movieshowapp/' element={<Home/>}/>
            {/* <Route path='/home' element={<Home/>}/> */}
            <Route path='/movie' element={<Movies/>}/>
            <Route path='/tv' element={<TV/>}/>
            <Route path='movie/:id' element={<ShowDetails type='movie'/>}/>
            <Route path='tv/:id' element={<ShowDetails type='tv'/>}/>
          </Routes>
        </div>
      </div>
     </Router>
    </>
  );
}

export default App;
