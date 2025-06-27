import React, { useRef, useState } from 'react';
import Header from './Header';
import background from '../the_netflix_login_background.jpg';
import {checkValidateData} from '../utils/validate';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);
  const [errorMessage,setErrorMessage]=useState(null);
  const navigate = useNavigate();
  const dispatch= useDispatch();

  const toggleforSignIn = () => {
    setisSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
      const name = fullname?.current?.value;
      const message = checkValidateData(email.current.value, password.current.value, name);
      setErrorMessage(message);

      if (message) return;

      if (!isSignInForm) {
        // Sign Up Logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
            return updateProfile(user, {
              displayName: name,
            });
          })
          .then(() => {
            const {uid,email,displayName,photoUrl}=auth.currentUser;
            dispatch(addUser({uid:uid, email:email, displayName:displayName}));
            navigate('/browse');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      } else {
        // Sign In Logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            navigate("/browse");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
    };

  return (
    <div className="relative h-screen w-full">
      <Header />

      <div className="absolute inset-0 -z-10">
        <img
          alt="Netflix Background"
          src={background}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-center items-center h-full">

        <form className="w-11/12 sm:w-3/12 bg-black bg-opacity-80 p-8 text-white rounded-lg" 
        onSubmit={(e) => {e.preventDefault()}}>
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </h1>

          {!isSignInForm && (
            <input ref={fullname}
              placeholder="Full Name"
              type="text"
              className="p-4 my-4 w-full bg-gray-700 rounded"
            />
          )}

          <input ref={email}
            placeholder="Email"
            className="p-4 my-4 w-full bg-gray-700 rounded"
          />

          <input ref={password}
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700 rounded"
          />

          <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>

          <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </button>

          <p
            className="py-4 text-center cursor-pointer"
            onClick={toggleforSignIn}
          >
            {isSignInForm
              ? 'New to Netflix? Sign Up Now'
              : 'Already Registered? Sign In Now'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
