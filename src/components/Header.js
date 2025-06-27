import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/'); 
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center'>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        className="h-10"
      />

      {user && (<div className="flex items-center gap-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="User"
          className="h-8 w-8 rounded-full"
        />
        <button
          onClick={handleSignOut}
          className="text-white font-bold hover:underline"
        >
          Sign Out
        </button>
      </div>)}
    </div>
  );
};

export default Header;
