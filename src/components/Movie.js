import React, { useState } from "react";
import axios from "axios";
import ModalMovie from "./ModalMovie";

const Movie = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_ADD_MOVIE, {
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        overview: movie.overview,
        comments: "",
      });

      console.log("Movie added to favorites:", response.data);
    } catch (error) {
      console.log("Error adding movie to favorites:", error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="card-container">
        <div className="card">
          <img
            className="card-img-top img-fluid img-thumbnail"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title || movie.name}
          />
          <div className="card-body">
            <h5 className="card-title">{movie.title || movie.name}</h5>
            <button className="btn btn-primary" onClick={handleAddToFavorites}>
              Add to Favorites
            </button>
            <button className="btn btn-secondary" onClick={handleShowModal}>
              Details
            </button>
          </div>
          {showModal && (
            <ModalMovie
              movie={movie}
              comment={comment}
              setComment={setComment}
              onClose={handleCloseModal}
              onAddToFavorites={handleAddToFavorites}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
