import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice'; 
import userReducer from './userSlice';    
import gptReducer from './gptSlice';
import configReducer from './configSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

export default store;
