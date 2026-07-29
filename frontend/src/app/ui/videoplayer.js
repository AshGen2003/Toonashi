'use client';

import React from 'react';

const VideoPlayer = ({ url }) => {
  if (!url) {
    return <div className="w-full h-full bg-black flex items-center justify-center text-white">No video URL provided</div>;
  }

  return (
    <div className="w-full aspect-video">
      <iframe
        src={url}
        className="w-full h-full border-none"
        allowFullScreen
        referrerPolicy="no-referrer"
        title="Video Player"
      />
    </div>
  );
};

export default VideoPlayer;