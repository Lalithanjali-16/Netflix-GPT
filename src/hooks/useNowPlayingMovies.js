import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addNowPlayingMovies } from '../utils/moviesSlice';

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

  useEffect(() => {
    if (nowPlayingMovies.length > 0) return;

    const getNowPlayingMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?page=1',
          API_OPTIONS
        );
        const json = await response.json();
        dispatch(addNowPlayingMovies(json.results));
      } catch (err) {
        console.error('Failed to fetch now playing movies:', err);
      }
    };

    getNowPlayingMovies();
  }, [nowPlayingMovies.length, dispatch]);
};

export default useNowPlayingMovies;
