import {LoginForm} from 'Components/Login/LoginForm';
import React, {useState, useEffect} from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

import {IMovie} from 'Src/movieseat';
import {RandomBackgroundContainer, RandomBackgroundSlider} from 'Src/styles';

const baseurl = 'https://api.themoviedb.org/3/discover/movie?';
const apikey = 'api_key=a8f7039633f2065942cd8a28d7cadad4';
const rest = '&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1000&with_genres=80%2C18&with_watch_monetization_types=flatrate';

export const RandomBackground = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.down('md'));
  const [backgroundPath, setbackgroundPath] = useState<String []>([]);
  const [movieData, setMovieData] = useState<IMovie []>([]);
  const [slide, setSlide] = useState(false);
  const [mountedState, setMountedState] = useState(true);

  let backdropPath1;
  let backdropPath2;

  useEffect(() => {
    let isRequestCancelled = false;
    const fetchData = () => {
      try {
        fetch(baseurl + apikey + rest)
            .then((response) => response.json())
            .then((data) => {
              if (!isRequestCancelled) setMovieData(data.results);
            });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return () => {
      setMountedState(false);
      isRequestCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isRequestCancelled = false;
    if (!isRequestCancelled) setTransition(0);
    return () => {
      isRequestCancelled = true;
    };
  }, [movieData]);

  const setTransition = (i) => {
    if (movieData.length === 0) return;
    i++;
    setBackgroundPath(i, movieData);
    setSlide(i%2 == 0);

    setTimeout(() => {
      setTransition(i);
    }, 3500);
  };

  const setBackgroundPath = (i, movieData) => {
    const randomNumber = Math.floor(Math.random() * movieData.length);
    const backdropPath = `https://image.tmdb.org/t/p/original/${movieData[randomNumber].backdrop_path}`;

    if (i%2 == 0) backdropPath1 = backdropPath;
    if (i%2 == 1) backdropPath2 = backdropPath;

    setbackgroundPath([
      backdropPath1, backdropPath2,
    ]);
  };

  return (
    <>
      <RandomBackgroundContainer className={slide ? 'slide' : ''}>
        <RandomBackgroundSlider sx={{
          left: '0vw',
          backgroundImage: `url(${backgroundPath[0]})`,
        }} />
        <RandomBackgroundSlider sx={{
          left: '100vw',
          backgroundImage: `url(${backgroundPath[1]})`,
        }} />
      </RandomBackgroundContainer>
    </>
  );
};
