import React, { useState, useEffect } from 'react';
import axios from 'axios';

const genreList = [
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' },
  ];
  

function GenreSelector({ onGenreSelect }) {
  return (
    <select onChange={(e) => onGenreSelect(e.target.value)} className='bg-black text-white p-2 rounded'>
      <option value="">Select Genre</option>
      {genreList.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}

function MoviesByGenre({ genreId, defaultMovies }) {
  const [movies, setMovies] = useState(defaultMovies);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response;
        if (genreId) {
          response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a30f0c4ee0b96cbbedc6dc67f27b20aa&with_genres=${genreId}`);
        } else {
          response = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=a30f0c4ee0b96cbbedc6dc67f27b20aa');
        }
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [genreId]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 6));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 6 >= movies.length ? prevIndex : prevIndex + 6));
  };

  return (
    <div className='container bg-black mx-auto font-serif'>
      <h2 className='text-white text-2xl font-bold mb-4'>Movies</h2>
      <div className='relative bg-black'>
        <button
          className='absolute left-0 top-1/2 rounded transform -translate-y-1/2 bg-[rgba(51,51,51,0.5)] hover:text-black hover:bg-[#e6e6e6] text-white px-2 py-1 z-10'
          onClick={handlePrev}
        >
          Prev
        </button>
        <div className='flex overflow-x-hidden space-x-4 font-serif'>
          {movies.slice(currentIndex, currentIndex + 6).map((movie) => (
            <div key={movie.id} className='bg-black lg:w-[300px] rounded-lg overflow-hidden shadow-lg min-w-[200px]'>
              <img
                className='w-full h-64 object-cover'
                alt={movie.title || movie.name}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              />
              <div className='p-4 bg-black'>
                <h3 className='text-white font-bold'>{movie.title || movie.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <button
          className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-[rgba(51,51,51,0.5)] hover:text-black hover:bg-[#e6e6e6] rounded text-white px-2 py-1 z-10'
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function TvShow() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [defaultMovies, setDefaultMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=a30f0c4ee0b96cbbedc6dc67f27b20aa');
        setDefaultMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className='bg-black h-auto p-4 font-serif '>
      <h1 className='text-white text-3xl font-bold mb-4'>TV Shows</h1>
      <GenreSelector onGenreSelect={setSelectedGenre} />
      <MoviesByGenre genreId={selectedGenre} defaultMovies={defaultMovies} />
    </div>
  );
}

export default TvShow;
