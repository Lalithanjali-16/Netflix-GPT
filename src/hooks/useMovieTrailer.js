import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store.movies.trailerVideo);

  useEffect(() => {
    if (!movieId) return;

    const getMoviesBackground = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          API_OPTIONS
        );
        const json = await response.json();

        const filteredData = json.results.filter((video) => video.type === 'Trailer');
        const trailer = filteredData.length > 0 ? filteredData[0] : json.results[0];

        dispatch(addTrailerVideo(trailer));
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    getMoviesBackground();
  }, [movieId, dispatch]); 

  return trailer;
};

export default useMovieTrailer;
