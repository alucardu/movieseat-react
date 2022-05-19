import fetch from 'node-fetch';
import pg from 'pg';

const config = {
  database: 'college_db',
  user: 'db_user',
  password: 'db_password',
  port: 5432,
  max: 20, // set pool max size to 20
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000,
  maxUses: 7500,
};

const pool = new pg.Pool(config);
/**
 *
 */
pool.connect((err, client, done) => {
  if (err) throw err;
  client.query('SELECT * FROM "Movie"', (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.rows.forEach((movie) => {
        (async () => {
          const json = await fetchMovieData(movie.tmdb_id);
          // pool.query('UPDATE "Movie" SET runtime = $1::integer WHERE tmdb_id = $2::integer', [5, json.id]);
          let release_date = json.release_date;
          json.releases.countries.forEach((countrie) => {
            if (countrie.iso_3166_1 == 'NL') {
              release_date = countrie.release_date;
            }
          });

          const movieToUsers = await pool.query('SELECT * FROM "_MovieToUser" WHERE "A" = $1::integer', [movie.id]);

          if (isValueChanged(movie, json).valueChanged) {
            pool.query('UPDATE "Movie" SET original_title = $1::text WHERE tmdb_id = $2::integer', [json.original_title, json.id]);
            pool.query('UPDATE "Movie" SET poster_path = $1::text WHERE tmdb_id = $2::integer', [json.poster_path, json.id]);
            pool.query('UPDATE "Movie" SET backdrop_path = $1::text WHERE tmdb_id = $2::integer', [json.backdrop_path, json.id]);
            pool.query('UPDATE "Movie" SET release_date = $1::text WHERE tmdb_id = $2::integer', [release_date, json.id]);
            pool.query('UPDATE "Movie" SET runtime = $1::integer WHERE tmdb_id = $2::integer', [json.runtime, json.id]);
            pool.query('UPDATE "Movie" SET tagline = $1::text WHERE tmdb_id = $2::integer', [json.tagline, json.id]);
            pool.query('UPDATE "Movie" SET overview = $1::text WHERE tmdb_id = $2::integer', [json.overview, json.id]);

            movieToUsers.rows.forEach((movieToUser) => {
              pool.query('INSERT into "Notification"(action, "movieId", "userId", value)VALUES($1::text, $2::integer, $3::integer, $4::text)', ['has been updated with a new', movieToUser.A, movieToUser.B, isValueChanged(movie, json).changedValue]);
            });
          }
        })();
      });
    }
  });
});


/**
 * @param tmdbID
 */
async function fetchMovieData(tmdbID) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${tmdbID}?api_key=a8f7039633f2065942cd8a28d7cadad4&append_to_response=releases`);
  const data = response.json();
  return data;
}

/**
 * @param movie
 * @param json
 */
function isValueChanged(movie, json) {
  let valueChanged = false;
  let changedValue = '';

  for (const [key, value] of Object.entries(movie)) {
    if (key !== 'tmdb_id' && key !== 'release_date' && key !== 'id' && value !== json[key]) {
      changedValue = key;
      valueChanged = true;
    }
  }

  return {valueChanged: valueChanged, changedValue: changedValue};
}

