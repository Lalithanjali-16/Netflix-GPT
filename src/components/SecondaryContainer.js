import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const SecondaryContainer = () => {
  const movies= useSelector((store)=>store.movies)
  console.log(movies)

  return (
    <div className="bg-black">
      <div className=' mt-0 md:-mt-52 pl-4 md:pl-6 relative z-20'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Trending"} movies={movies.trendingMovies} />
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
        <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
        <MovieList title={"Horror"} movies={movies.horrorMovies}/>
      </div>
    </div>
  )
}

export default SecondaryContainer
