import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addHorrorMovies } from '../utils/moviesSlice'; 

const useHorrorMovies = () => {
  const dispatch = useDispatch();
  const horrorMovies = useSelector((store) => store.movies.horrorMovies);


  const getHorrorMovies = async () => {
   
      const response = await fetch(
        'https://api.themoviedb.org/3/discover/movie?with_genres=27',
        API_OPTIONS
      );
      const data = await response.json();
      dispatch(addHorrorMovies(data.results));
  
  };

  useEffect(() => {
    if(horrorMovies.length === 0)getHorrorMovies();
  }, []);
};

export default useHorrorMovies;
