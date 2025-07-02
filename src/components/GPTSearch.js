import GPTSearchBar from './GPTSearchBar';
import GPTMovieSuggestions from './GPTMovieSuggestions';
import background from '../the_netflix_login_background.jpg';

const GPTSearch = () => {
  return (
    <div>
      {/* Fixed background image */}
      <div className="fixed inset-0 -z-10">
        <img
          alt="Netflix Background"
          src={background}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Foreground content */}
      <GPTSearchBar />
      <GPTMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
