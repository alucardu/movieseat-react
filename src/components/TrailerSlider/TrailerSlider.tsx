import {Box} from '@mui/system';
import React, {useEffect, useRef, useState} from 'react';

import ReactPlayer from 'react-player';
import screenfull from 'screenfull';

import {IMovieVideo} from 'Src/movieseat';
import {TrailerSliderStyle} from 'Src/styles';

interface Props {
  videos: IMovieVideo[];
}

interface PropsVideo {
  video: IMovieVideo;
  index: number;
}

export const TrailerSlider = (props: Props) => {
  const [playState, setPlayState] = useState<Array<boolean>>([]);
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const itemEls = useRef([]);

  useEffect(() => {
    props.videos.forEach(() => {
      playState.push(false);
    });

    screenfull.on('change', () => {
      setTimeout(() => {
        if (!screenfull.isFullscreen) {
          playState[videoIndex] = false;
        }
      }, 500);
    });
  }, []);

  const makeFullscreen = (index: number) => {
    setVideoIndex(index);
    screenfull.request((itemEls.current[index] as any).wrapper);
    window.screen.orientation.lock('landscape-primary');
  };

  const Video = (props: PropsVideo) => {
    return (
      <Box
        key={props.video.key}
        sx={{left: props.index*100 + 'vw'}}>
        <ReactPlayer
          playing={playState[props.index]}
          ref={(element: any) => (itemEls.current as any).push(element)}
          onPlay = {() => makeFullscreen(props.index)}
          controls={true}
          width="100vw"
          height="auto"
          url={`https://www.youtube.com/watch?v=${props.video.key}`} />
      </Box>
    );
  };

  return (
    <TrailerSliderStyle>
      <Box className="container">
        {props.videos.map((video, index) => {
          return (
            <Video video={video} index={index} key={index}/>
          );
        })}
      </Box>
    </TrailerSliderStyle>
  );
};

