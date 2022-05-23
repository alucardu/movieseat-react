import {Box} from '@mui/system';
import React, {useEffect, useRef, useState} from 'react';

import ReactPlayer from 'react-player';
import screenfull from 'screenfull';

import {IMovieVideo} from 'Src/movieseat';
import {TrailerSliderStyle} from 'Src/styles';

interface Props {
  videos: IMovieVideo[];
}

export const TrailerSlider = (props: Props) => {
  const [orientation, setOrientation] = useState(window.screen.orientation.type);
  const [playState, setPlayState] = useState(false);
  const itemEls = useRef([]);

  const makeFullscreen = (index: number) => {
    screenfull.request((itemEls.current[index] as any).wrapper);
    window.screen.orientation.lock('landscape-primary');
  };

  const setScreenOrientation = () => {
    setOrientation(window.screen.orientation.type);
  };

  useEffect(() => {
    window.screen.orientation.onchange = () => {
      setScreenOrientation;
    };

    screenfull.on('change', () => {
      setPlayState(screenfull.isFullscreen);
    });
  }, []);

  return (
    <TrailerSliderStyle>
      <Box className="container">
        {props.videos.filter((video) => video.type === 'Trailer' && video.site === 'YouTube').map((video, index) => {
          return (
            <Box
              key={video.key}
              sx={{left: index*100 + 'vw'}}>
              {orientation}
              <ReactPlayer
                playing={playState}
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

