import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-12 text-white bg-gradient-to-r from-black via-transparent to-transparent absolute w-full aspect-video">
      <h1 className="text-3xl md:text-6xl font-extrabold drop-shadow-lg">{title}</h1>
      <p className="py-6 text-lg md:text-xl w-full md:w-1/3 leading-relaxed drop-shadow-md">
        {overview}
      </p>
      <div className="flex gap-4">
        <button className="bg-white text-black px-6 py-3 text-lg font-semibold rounded hover:bg-gray-300 transition duration-200 flex items-center gap-2">
          <FontAwesomeIcon icon={faPlay} style={{ color: "#000000" }} />
          Play
        </button>
        <button className="bg-gray-700 text-white px-6 py-3 text-lg font-semibold rounded hover:bg-gray-600 transition duration-200 flex items-center gap-2">
          <FontAwesomeIcon icon={faInfoCircle} style={{ color: "#ffffff" }} />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

