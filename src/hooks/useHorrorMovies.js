import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addHorrorMovies } from '../utils/moviesSlice';

const useHorrorMovies = () => {
  const dispatch = useDispatch();
  const horrorMovies = useSelector((store) => store.movies.horrorMovies);

  useEffect(() => {
    if (horrorMovies.length > 0) return;

    const getHorrorMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?with_genres=27',
          API_OPTIONS
        );
        const data = await response.json();
        dispatch(addHorrorMovies(data.results));
      } catch (error) {
        console.error('Failed to fetch horror movies:', error);
      }
    };

    getHorrorMovies();
  }, [horrorMovies.length, dispatch]);
};

export default useHorrorMovies;
