import React from 'react';
import  './Modal.css';



const ModalMovie = ({ movie, comment, setComment, onClose, onAddToFavorites }) => {
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddToFavorites = () => {
    onAddToFavorites();
    onClose();
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content" style={{backgroundColor: 'black'}}>
          <div className="modal-header">
            <h5 className="modal-title">{movie.title || movie.name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <img className="img-fluid" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title || movie.name} />
            <p>{movie.overview}</p>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Add a comment..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleAddToFavorites}>
              Add to Favorites
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMovie;
