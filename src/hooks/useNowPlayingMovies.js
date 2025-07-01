import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addNowPlayingMovies } from '../utils/moviesSlice';

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const data = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?page=1',
          API_OPTIONS
        );
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
      } catch (err) {
        console.error("Failed to fetch now playing movies:", err);
      }
    };

    if (!nowPlayingMovies || nowPlayingMovies.length === 0) {
      getNowPlayingMovies();
    }
  }, [dispatch, nowPlayingMovies]);
};

export default useNowPlayingMovies;
