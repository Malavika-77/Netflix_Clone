import React from 'react';
import PropTypes from 'prop-types';

function Modal({ show, onClose, movie }) {
  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={handleOverlayClick}>
      <div className="bg-black text-white rounded-lg overflow-hidden w-full max-w-3xl mx-4">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">{movie.title || movie.name}</h2>
          <p className="mb-4">{movie.overview}</p>
          {movie.videoId ? (
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${movie.videoId}`}
              title={movie.title || movie.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>Trailer not available</p>
          )}
        </div>
        <button className="absolute top-0 right-0 mt-4 mr-4 text-black" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  movie: PropTypes.object
};

export default Modal;
