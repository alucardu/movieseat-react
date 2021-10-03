import React, {useState, useEffect} from 'react';
import {styled} from '@material-ui/styles';
import {Box} from '@mui/system';
import {makeStyles} from '@mui/styles';
import {IMovie} from '../../../movieseat';

const BackgroundContainer = styled(Box)(() => ({
  height: '100vh',
  width: '200vw',
  position: 'relative',
  overflow: 'hidden',
  marginLeft: '-100vw',
  transition: 'margin-left 1s ease-in',
}));

const SliderEl = styled(Box)(() => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'absolute',
  height: '100vh',
  width: '100vw',
}));

const useStyles = makeStyles({
  slide: {
    marginLeft: '0vw',
  },
});

const baseurl = 'https://api.themoviedb.org/3/discover/movie?';
const apikey = 'api_key=a8f7039633f2065942cd8a28d7cadad4';
const rest = '&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1000&with_genres=80%2C18&with_watch_monetization_types=flatrate';

export const RandomBackground = () => {
  const [backgroundPath, setbackgroundPath] = useState<String []>([]);
  const [movieData, setMovieData] = useState<IMovie []>([]);
  const [slide, setSlide] = useState(false);
  const classes = useStyles();

  let backdropPath1;
  let backdropPath2;

  useEffect(() => {
    fetch(baseurl + apikey + rest)
        .then((response) => response.json())
        .then((data) => {
          setMovieData(data.results);
        });
  }, []);

  useEffect(() => {
    setTransition(0);
  }, [movieData]);

  const setTransition = (i) => {
    if (movieData.length === 0) return;
    i++;
    setBackgroundPath(i, movieData);
    setSlide(i%2 == 0);

    setTimeout(() => {
      setTransition(i);
    }, 7500);
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
    <BackgroundContainer className={slide ? classes.slide : ''}>
      <SliderEl style={{
        left: '0vw',
        backgroundImage: `url(${backgroundPath[0]})`,
      }} />
      <SliderEl style={{
        left: '100vw',
        backgroundImage: `url(${backgroundPath[1]})`,
      }} />
    </BackgroundContainer>
  );
};
