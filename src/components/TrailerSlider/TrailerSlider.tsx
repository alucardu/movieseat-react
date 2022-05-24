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
  const [playState, setPlayState] = useState<Array<boolean>>([]);
  const itemEls = useRef([]);

  useEffect(() => {
    props.videos.forEach(() => {
      playState.push(false);
    });

    screenfull.on('change', () => {
      const array = playState;
      setPlayState(array);
    });
  }, []);

  const makeFullscreen = (index: number) => {
    screenfull.request((itemEls.current[index] as any).wrapper);
    window.screen.orientation.lock('landscape-primary');
  };

  return (
    <TrailerSliderStyle>
      <Box className="container">
        {props.videos.map((video, index) => {
          return (
            <Box
              key={video.key}
              sx={{left: index*100 + 'vw'}}>
              <ReactPlayer
                playing={playState[index]}
                ref={(element: any) => (itemEls.current as any).push(element)}
                onPlay = {() => makeFullscreen(index)}
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

