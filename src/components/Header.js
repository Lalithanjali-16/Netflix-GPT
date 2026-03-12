import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        navigate('/error');
      });
  };

  const handleGPTSearchClick = () =>{
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange = (e) => {
  dispatch(changeLanguage(e.target.value));
};

  return (
    <div className="absolute top-0 left-0 px-8 py-4 bg-gradient-to-b from-black/80 z-10 w-full flex justify-between items-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 drop-shadow-lg">
        MovieGPT
      </h1>

      {user && (
        <div className="flex items-center gap-4">
          {showGptSearch && 
          (<select className="bg-gray-800 text-white p-2 rounded-md" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>))}
          </select>)}
          <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGPTSearchClick}>
            {showGptSearch ? "Home Page" : "GPT Search"}</button>
          <img
            src={AVATAR}
            alt="User"
            className="h-8 w-8 rounded"
          />
          <button
            onClick={handleSignOut}
            className="text-white font-bold hover:underline"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
