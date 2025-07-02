import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import together from "../utils/together";
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice'; // ⬅️ Make sure to import this action

const GPTSearchBar = () => {
  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          encodeURIComponent(movie) +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (err) {
      console.error("TMDB fetch failed for:", movie, err);
      return [];
    }
  };

  const handleGPTSearchClick = async () => {
    const userInput = searchText.current.value.trim();
    if (!userInput) {
      alert("Please enter a movie preference.");
      return;
    }

    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query: " +
      userInput +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example: RRR, 2 states, Interstellar, Bahubali, Gravity";

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

      const responseText = response.choices[0].message?.content;
      console.log("GPT Response:", responseText);

      const responseMovies = responseText?.split(",").map((movie) => movie.trim());
      const promiseArray = responseMovies.map(searchMovieTMDB);
      const tmdbResults = await Promise.all(promiseArray);

      console.log("TMDB Results:", tmdbResults);

      // ✅ Dispatch inside the function after receiving results
      dispatch(
        addGptMovieResult({
          movieNames: responseMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      console.error("Error from Together API:", error);
    }
  };

  return (
    <div className="pt-[8%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col sm:flex-row items-center bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          ref={searchText}
          className="p-4 m-2 w-[300px] sm:w-[500px] rounded-lg shadow-md outline-none bg-white/30 backdrop-blur-sm placeholder:text-white text-white"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGPTSearchClick}
          className="py-2 px-4 m-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
