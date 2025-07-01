import Header from './Header'
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import useTrendingMovies from '../hooks/useTrendingMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import useHorrorMovies from '../hooks/useHorrorMovies'
import GPTSearch from './GPTSearch'
import { useSelector } from 'react-redux'

const Browse = () => {
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch);

  useNowPlayingMovies();
  useTopRatedMovies();
  useTrendingMovies();
  useUpcomingMovies();
  useHorrorMovies();
  return (
    <div>
      <Header/>
      {
        showGptSearch ? <GPTSearch /> :
        <>
         <MainContainer/>
         <SecondaryContainer/>
        </>
      }
      
     
    </div>
  )
}

export default Browse
