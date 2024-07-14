import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Post() {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    return (
        <div className='container bg-black mx-auto font-serif'>
            <h2 className='text-white text-2xl font-bold mb-4'>Trending Movies</h2>
            <div className='relative bg-black '>
                <button 
                    className='absolute left-0 top-1/2  rounded transform -translate-y-1/2 bg-[rgba(51,51,51,0.5)] hover:text-black hover:bg-[#e6e6e6] text-white px-2 py-1 z-10'
                    onClick={handlePrev}
                >
                    prev
                </button>
                <div className='flex  overflow-x-hidden space-x-4'>
                    {movies.slice(currentIndex, currentIndex + 6).map((movie, index) => (
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

export default Post;
