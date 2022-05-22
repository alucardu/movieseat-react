import {Box} from '@mui/system';
import React, {useRef} from 'react';

import ReactPlayer from 'react-player';
import screenfull from 'screenfull';

import {IMovieVideo} from 'Src/movieseat';
import {TrailerSliderStyle} from 'Src/styles';

interface Props {
  videos: IMovieVideo[];
}


export const TrailerSlider = (props: Props) => {
  const player = useRef(null);

  const makeFullscreen = () => {
    console.log('full screen');
    screenfull.request((player.current as any).wrapper);
  };

  return (
    <TrailerSliderStyle>
      <Box className="container">
        {props.videos.filter((video) => video.type === 'Trailer' && video.site === 'YouTube').map((video, index) => {
          return (
            <Box
              key={video.key}
              sx={{left: index*100 + 'vw'}}>
              <ReactPlayer
                ref={player}
                onStart = {() => makeFullscreen()}
                controls={true}
                width="100vw"
                height="auto"
                url={`https://www.youtube.com/watch?v=${video.key}`} />
            </Box>
          );
        })}
      </Box>
    </TrailerSliderStyle>
  );
};

