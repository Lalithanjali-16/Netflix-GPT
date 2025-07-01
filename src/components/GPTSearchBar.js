import React from 'react';
import { useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
const GPTSearchBar = () => {
    const langKey = useSelector(store => store.config.lang);
     console.log(langKey)
  return (
    <div className="pt-[8%] flex justify-center">
       
      <form className="flex flex-col sm:flex-row items-center bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <input
          type="text"
          className="p-4 m-2 w-[300px] sm:w-[500px] rounded-lg shadow-md outline-none bg-white/30 backdrop-blur-sm placeholder:text-white text-white"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="py-2 px-4 m-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
