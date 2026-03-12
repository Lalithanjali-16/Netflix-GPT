import logo from "../logo_image.png";

export const LOGO = logo;
export const AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_BEARER,
  },
};

export const API_KEY = process.env.REACT_APP_TMDB_KEY;

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "telugu", name: "Telugu" },
  { identifier: "tamil", name: "Tamil" },
  { identifier: "malayalam", name: "Malayalam" },
  { identifier: "spanish", name: "Spanish" },
];

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;