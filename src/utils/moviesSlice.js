import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: [],
    trendingMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    horrorMovies: [],
    trailerVideo: null
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addHorrorMovies: (state, action) => {
    state.horrorMovies = action.payload;
  },
  },
});

export const {
  addTrailerVideo,
  addNowPlayingMovies,
  addTrendingMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addHorrorMovies
} = moviesSlice.actions;

export default moviesSlice.reducer;
