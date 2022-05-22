import {Box} from '@mui/system';
import React from 'react';

import ReactPlayer from 'react-player';
import {IMovieVideo} from 'Src/movieseat';
import {TrailerSliderStyle} from 'Src/styles';

interface Props {
  videos: IMovieVideo[];
}

export const TrailerSlider = (props: Props) => {
  return (
    <TrailerSliderStyle>
      <Box className="container">
        {props.videos.filter((video) => video.type === 'Trailer' && video.site === 'YouTube').map((video, index) => {
          return (
            <Box
              key={video.key}
              sx={{left: index*100 + 'vw'}}>
              <ReactPlayer
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

