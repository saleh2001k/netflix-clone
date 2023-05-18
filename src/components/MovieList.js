import React from 'react';
import Movie from './Movie';

const MovieList = ({ movies }) => {
  return (
   
    <div className="row">
      {movies.map((movie) => (
        <div className="col-md-3" key={movie.id}>
          <Movie movie={movie} />
        </div>
      ))}
    </div>

  );
};

export default MovieList;
