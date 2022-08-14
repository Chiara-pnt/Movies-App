import Movie from './compoents/Movie'
import React, { useEffect, useState } from 'react';



const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&=";


function App() {

  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

useEffect(() => {
 getMovies(APIURL);
}, []);

const getMovies = (API) => {
  fetch(API)
  .then((res) => res.json())
  .then((data) => {
    setMovies(data.results);
  });
}

const handleOnSubmit = (e) => {
  e.prevntDefault();

  getMovies( `https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&=${searchTerm}`);
  setSearchTerm('');

};

const handleOnChange =  (e) => {
  setSearchTerm(e.target.value);
};


  return (
    <div >
     <div className="header">
            <form onSubmit={handleOnSubmit}>
                <input 
                        className="search" 
                        type="text" 
                        placeholder="Search..." 
                        value={searchTerm}
                        onChange={handleOnChange}
                        >
                  </input>
            </form>
      </div>
      <div className="movie-container">
      {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
      ))}
      </div>
    </div>
  );
}

export default App;
