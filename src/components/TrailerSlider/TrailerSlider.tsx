import {Box} from '@mui/system';
import React, {useEffect, useRef} from 'react';

import ReactPlayer from 'react-player';
import screenfull from 'screenfull';

import {IMovieVideo} from 'Src/movieseat';
import {TrailerSliderStyle} from 'Src/styles';

interface Props {
  videos: IMovieVideo[];
}

export const TrailerSlider = (props: Props) => {
  const itemEls = useRef([]);

  const makeFullscreen = (index: number) => {
    screenfull.request((itemEls.current[index] as any).wrapper);
  };

  const setScreenOrientation = () => {
    console.log('change');
    alert('change');
  };

  useEffect(() => {
    window.addEventListener('orientationchange', setScreenOrientation);
  }, []);

  return (
    <TrailerSliderStyle>
      <Box className="container">
        {props.videos.filter((video) => video.type === 'Trailer' && video.site === 'YouTube').map((video, index) => {
          return (
            <Box
              key={video.key}
              sx={{left: index*100 + 'vw'}}>
              <ReactPlayer
                ref={(element: any) => (itemEls.current as any).push(element)}
                onStart = {() => makeFullscreen(index)}
                controls={false}
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

