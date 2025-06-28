import React, { useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { AVATAR, LOGO } from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

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

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center">
      <img
        src={LOGO}
        alt="Netflix Logo"
        className="h-10"
      />

      {user && (
        <div className="flex items-center gap-4">
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
