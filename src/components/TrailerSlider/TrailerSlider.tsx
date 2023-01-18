import {Box} from '@mui/system';
import React, {createRef, useEffect, useRef, useState} from 'react';

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
  const Video = (props: PropsVideo) => {
    const element = createRef<ReactPlayer>();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
      screenfull.on('change', () => {
        if (screenfull.isFullscreen) {
          window.screen.orientation.lock('landscape-primary');
        } else {
          window.screen.orientation.lock('portrait-primary');
          setIsPlaying(false);
        }
      });
    }, []);

    const makeFullscreen = (element: any) => {
      screenfull.request(element.current.wrapper);
      setIsPlaying(true);
    };

    return (
      <Box
        key={props.video.key}
        sx={{left: props.index*100 + 'vw'}}>
        <ReactPlayer
          ref={element}
          playing={isPlaying}
          onPlay = {() => makeFullscreen(element)}
          onPause = {() => setIsPlaying(false)}
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

