import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrendingMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((store) => store.movies.trendingMovies);

  useEffect(() => {
    if (trendingMovies.length === 0) {
      const getTrendingMovies = async () => {
        const data = await fetch(
          'https://api.themoviedb.org/3/trending/movie/day?page=1',
          API_OPTIONS
        );
        const json = await data.json();
        dispatch(addTrendingMovies(json.results));
      };

      getTrendingMovies();
    }
  }, [trendingMovies.length, dispatch]); 
};

export default useTrendingMovies;
