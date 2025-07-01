export const LOGO = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
export const AVATAR = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer " + process.env.REACT_APP_TMDB_KEY
  }
};

export const API_KEY = "9b97f63b2a2d696aaa60a0946a1f315a";

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "telugu", name: "Telugu" },
  { identifier: "tamil", name: "Tamil" },
  { identifier: "malayalam", name: "Malayalam" },
  { identifier: "spanish", name: "Spanish" }
];

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;