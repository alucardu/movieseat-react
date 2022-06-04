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
  const element = createRef<ReactPlayer>();

  const Video = (props: PropsVideo) => {
    useEffect(() => {
      screenfull.on('change', () => {
        setTimeout(() => {
          if (screenfull.isFullscreen) {
            window.screen.orientation.lock('landscape-primary');
          } else {
            console.log('else');
          }
        }, 500);
      });
    }, []);

    const makeFullscreen = (index: number, element: any) => {
      screenfull.request(element.wrapper);
    };

    return (
      <Box
        key={props.video.key}
        sx={{left: props.index*100 + 'vw'}}>
        <ReactPlayer
          ref={element}
          onPlay = {() => makeFullscreen(props.index, element)}
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

