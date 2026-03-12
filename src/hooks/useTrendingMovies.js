import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTrendingMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useTrendingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getTrendingMovies = async () => {
      const data = await fetch(
        'https://api.themoviedb.org/3/trending/movie/day?page=1',
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addTrendingMovies(json?.results || []));
    };

    getTrendingMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTrendingMovies;
