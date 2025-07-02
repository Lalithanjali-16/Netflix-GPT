import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addUpcomingMovies } from '../utils/moviesSlice';

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies); // ✅ Fixed key

  useEffect(() => {
    if (upcomingMovies.length > 0) return;

    const getUpcomingMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/upcoming?page=1',
          API_OPTIONS
        );
        const data = await response.json();
        dispatch(addUpcomingMovies(data.results));
      } catch (err) {
        console.error('Failed to fetch upcoming movies:', err);
      }
    };

    getUpcomingMovies();
  }, [upcomingMovies.length, dispatch]); 
};

export default useUpcomingMovies;
