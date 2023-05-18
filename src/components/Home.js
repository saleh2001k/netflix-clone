import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieList from './MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {/* <Link to="/favorites"><h3>Go to Favorites</h3></Link> */}
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
