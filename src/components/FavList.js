import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FavList.css";

const FavList = () => {
  const [movies, setMovies] = useState([]);
  const [updatedComment, setUpdatedComment] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [showMoreMap, setShowMoreMap] = useState({});

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_GET_MOVIES);
      setMovies(response.data);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_DELETE_MOVIE}/${id}`);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.log("Error deleting movie:", error);
    }
  };

  const handleUpdateComment = async (id) => {
    try {
      const movieToUpdate = movies.find((movie) => movie.id === id);
      const updatedMovie = { ...movieToUpdate, comments: updatedComment };
      await axios.put(
        `${process.env.REACT_APP_API_UPDATE_MOVIE}/${id}`,
        updatedMovie
      );

      const updatedMovies = movies.map((movie) =>
        movie.id === id ? { ...movie, comments: updatedComment } : movie
      );
      setMovies(updatedMovies);
      setUpdatedComment("");
    } catch (error) {
      console.log("Error updating comment:", error);
    }
  };

  const handleEditComment = (id) => {
    const movie = movies.find((m) => m.id === id);
    setUpdatedComment(movie.comments || "");
    setSelectedMovieId(id);
  };

  const handleCancelEdit = () => {
    setUpdatedComment("");
    setSelectedMovieId(null);
  };

  const toggleShowMore = (id) => {
    setShowMoreMap((prevMap) => ({
      ...prevMap,
      [id]: !prevMap[id],
    }));
  };

  const truncateOverview = (overview, id) => {
    if (showMoreMap[id]) {
      return overview;
    }
    if (overview.length > 100) {
      const truncatedOverview = overview.slice(0, 100) + "...";
      return truncatedOverview;
    }
    return overview;
  };

  return (
    <div className="fav-list-container">
      <h2>Favorite Movies</h2>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4 mb-4" key={movie.id}>
            <div className="fav-list-card">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="fav-list-card-img"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="fav-list-card-title">{movie.title}</h5>
                <p className="fav-list-card-text">
                  {truncateOverview(movie.overview, movie.id)}
                </p>
                {movie.overview.length > 100 && (
                  <button
                    className="btn btn-link show-more-button"
                    onClick={() => toggleShowMore(movie.id)}
                  >
                    {showMoreMap[movie.id] ? "Less" : "More"}
                  </button>
                )}
                {selectedMovieId === movie.id ? (
                  <div className="fav-list-card-edit">
                    <input
                      type="text"
                      className="fav-list-comment-input"
                      placeholder="Add comment..."
                      value={updatedComment}
                      onChange={(e) => setUpdatedComment(e.target.value)}
                    />
                    <div>
                      <button
                        className="btn fav-list-btn-update"
                        onClick={() => handleUpdateComment(movie.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn fav-list-btn-cancel"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="fav-list-card-comment">
                      {movie.comments || "-"}
                    </p>
                    <div className="fav-list-card-buttons">
                      <button
                        className="btn fav-list-btn-edit"
                        onClick={() => handleEditComment(movie.id)}
                      >
                        Add comment
                      </button>
                      <button
                        className="btn fav-list-btn-delete"
                        onClick={() => deleteMovie(movie.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavList;
