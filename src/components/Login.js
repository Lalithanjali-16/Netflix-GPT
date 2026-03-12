import React, { useRef, useState } from 'react';
import Header from './Header';
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
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-900 overflow-hidden font-sans">
      <Header />

      {/* Decorative Blob Backgrounds */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-60 animate-pulse"></div>
      <div className="absolute top-0 -right-40 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-60 animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute -bottom-40 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-60 animate-pulse" style={{ animationDelay: "4s" }}></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>

      <div className="relative z-10 w-full max-w-md px-6">

        <form className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 sm:p-12 text-white rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]" 
        onSubmit={(e) => {e.preventDefault()}}>
          <h1 className="font-extrabold text-4xl mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-200 drop-shadow-sm text-center">
            {isSignInForm ? 'Welcome Back' : 'Create Account'}
          </h1>

          <div className="space-y-6">
            {!isSignInForm && (
              <div className="relative group">
                <input ref={fullname}
                  placeholder="Full Name"
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 px-2 py-3 text-white placeholder-white/50 focus:outline-none focus:border-teal-400 focus:bg-white/5 transition-all duration-300 rounded-t-md"
                />
              </div>
            )}

            <div className="relative group">
              <input ref={email} 
                placeholder="Email Address" type='email'
                className="w-full bg-transparent border-b-2 border-white/20 px-2 py-3 text-white placeholder-white/50 focus:outline-none focus:border-teal-400 focus:bg-white/5 transition-all duration-300 rounded-t-md"
              />
            </div>

            <div className="relative group">
              <input ref={password}
                placeholder="Password" type='password'
                className="w-full bg-transparent border-b-2 border-white/20 px-2 py-3 text-white placeholder-white/50 focus:outline-none focus:border-teal-400 focus:bg-white/5 transition-all duration-300 rounded-t-md"
              />
            </div>
          </div>

          <p className='text-rose-400 font-medium text-sm pt-4 text-center h-8'>{errorMessage}</p>

          <button className="relative w-full py-4 mt-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-white font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_30px_rgba(20,184,166,0.6)] transform hover:-translate-y-1 transition-all duration-300 ease-out" onClick={handleButtonClick}>
            <span className="relative z-10 tracking-wide text-lg">{isSignInForm ? 'Sign In' : 'Sign Up'}</span>
          </button>

          <div className="mt-8 text-center">
            <p
              className="inline-block text-gray-300 hover:text-white cursor-pointer font-medium transition-colors border-b border-transparent hover:border-white pb-1"
              onClick={toggleforSignIn}
            >
              {isSignInForm
                ? 'Ready to join? Create an account'
                : 'Already have an account? Sign In'}
            </p>
          </div>

          <p className="text-xs text-gray-500/80 text-center mt-8 tracking-wide">
          Designed for a modern web experience
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
