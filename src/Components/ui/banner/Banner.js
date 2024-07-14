import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=a30f0c4ee0b96cbbedc6dc67f27b20aa');
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, [movies.length]);

  const fetchMovieTrailer = async (movieId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=a30f0c4ee0b96cbbedc6dc67f27b20aa`);
      const trailers = response.data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube');
      return trailers.length ? trailers[0].key : null;
    } catch (error) {
      console.error('Error fetching movie trailer:', error);
      return null;
    }
  };

  const handlePlayClick = async (movie) => {
    const videoId = await fetchMovieTrailer(movie.id);
    setSelectedMovie({ ...movie, videoId });
    setShowModal(true);
  };

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative lg:h-[600px] md:h-[350px] sm:h-[100px] h-[500px] text-white font-serif">
      <img
        className='absolute inset-0 w-full h-full object-cover'
        alt={currentMovie.title || currentMovie.name}
        src={`https://image.tmdb.org/t/p/original${currentMovie.poster_path}`}
      />
      <div className="relative z-10 pt-20 sm:pt-28 md:pt-36 h-[190px] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold pb-1 sm:mt-[40px] mt-[80px] lg:mt-[180px]">
          {currentMovie.title || currentMovie.name}
        </h1>
        <div className="flex space-x-2 sm:space-x-3 md:space-x-4 lg:mt-[30px]">
          <button
            className="text-white font-bold rounded-md px-3 sm:px-4 md:px-6 lg:px-8 py-2 bg-[rgba(51,51,51,0.5)] hover:text-black hover:bg-[#e6e6e6]"
            onClick={() => handlePlayClick(currentMovie)}
          >
            Play
          </button>
          <button className="text-white font-bold rounded-md px-3 sm:px-4 md:px-6 lg:px-8 py-2 bg-[rgba(51,51,51,0.5)] hover:text-black hover:bg-[#e6e6e6]">
            My List
          </button>
        </div>
        <h1 className="w-full md:w-[45rem] leading-[1.3] pt-4 text-xs sm:text-sm md:text-base max-w-[360px] md:max-w-none h-[80px]">
          {currentMovie.overview}
        </h1>
      </div>
      <div className="absolute bottom-0 h-[7.4rem] w-full bg-gradient-to-t from-[#111] via-[rgba(37,37,37,0.61)] to-transparent"></div>
      <Modal show={showModal} onClose={() => setShowModal(false)} movie={selectedMovie} />
    </div>
  );
}

export default Banner;
