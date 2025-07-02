import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { AVATAR, LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
import { useEffect } from 'react';
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        if (window.location.pathname === '/') navigate('/browse');
      } else {
        dispatch(removeUser());
        if (window.location.pathname !== '/') navigate('/');
      }
    });
    //Unsubscribe when component unmounts
    return () => unsubscribe(); 
  }, []);

  const handleGPTSearchClick = () =>{
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange = (e) => {
  dispatch(changeLanguage(e.target.value));
};

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center">
      <img
        src={LOGO}
        alt="Netflix Logo"
        className="h-10"
      />

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
