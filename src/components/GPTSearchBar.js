import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import together from "../utils/together"; // Correct SDK for Together.ai
import {API_OPTIONS} from '../utils/constants'
const GPTSearchBar = () => {
  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async(movie) =>{
    const data = await fetch
    ("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1" , API_OPTIONS

    )
    const json = await data.json()
    return json.results;
  }

  const handleGPTSearchClick = async () => {
    const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query : " + searchText.current.value + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example: RRR, 2 states, Interstellar, Bahubali, Gravity";

    try {
      const response = await together.chat.completions.create({
        model: "deepseek-ai/DeepSeek-V3",
        messages: [
          {
            role: "user",
            content: gptQuery,
          },
        ],
      });
      console.log("GPT Response:", response.choices[0].message?.content);

      const responseMovies = response.choices[0].message?.content.split(",")

      const promiseArray = responseMovies.map(movie => searchMovieTMDB(movie)) 
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults)


      const dispatch = useDispatch();
      dispatch(addGptMovieResult({movieNames: responseMovies,movieResults: tmdbResults}))

    } catch (error) {
      console.error("Error from Together API:", error);
    }
  };

  return (
    <div className="pt-[8%] flex justify-center">
      <form onSubmit={(e) => e.preventDefault()}
        className="flex flex-col sm:flex-row items-center bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <input
          type="text"
          ref={searchText}
          className="p-4 m-2 w-[300px] sm:w-[500px] rounded-lg shadow-md outline-none bg-white/30 backdrop-blur-sm placeholder:text-white text-white"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGPTSearchClick}
          className="py-2 px-4 m-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition">
          {lang[langKey].search}
        </button>


      </form>
    </div>
  );
};

export default GPTSearchBar;
