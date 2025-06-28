import React, { useRef, useState } from 'react';
import Header from './Header';
import background from '../the_netflix_login_background.jpg';
import {checkValidateData} from '../utils/validate';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);
  const [errorMessage,setErrorMessage]=useState(null);
  const dispatch= useDispatch();

  const toggleforSignIn = () => {
    setisSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleButtonClick = () => {
  const name = fullname?.current?.value;
  const emailVal = email.current.value;
  const passwordVal = password.current.value;

  const message = checkValidateData(emailVal, passwordVal, !isSignInForm ? name : null);
  setErrorMessage(message);

  if (message) return;

  if (!isSignInForm) {
    // Sign Up Logic
    createUserWithEmailAndPassword(auth, emailVal, passwordVal)
      .then(() => {
        return updateProfile(auth.currentUser, {
          displayName: name,
        });
      })
      .then(() => {
        const updatedUser = auth.currentUser;
        dispatch(addUser({
          uid: updatedUser.uid,
          email: updatedUser.email,
          displayName: updatedUser.displayName,
          photoURL: updatedUser.photoURL || null,
        }));

      })
      .catch((error) => {
        setErrorMessage(error.code + " - " + error.message);
      });
  } else {
    // Sign In Logic
    signInWithEmailAndPassword(auth, emailVal, passwordVal)
      .then(() => {
        const signedInUser = auth.currentUser;
        dispatch(addUser({
          uid: signedInUser.uid,
          email: signedInUser.email,
          displayName: signedInUser.displayName,
          photoURL: signedInUser.photoURL || null,
        }));
      })
      .catch((error) => {
        setErrorMessage(error.code + " - " + error.message);
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
            placeholder="Email" type='email'
            className="p-4 my-4 w-full bg-gray-700 rounded"
          />

          <input ref={password}
            placeholder="Password" type='password'
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
