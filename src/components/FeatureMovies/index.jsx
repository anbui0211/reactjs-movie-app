import { useEffect, useState } from "react";
import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";

const FeatureMovie = () => {
  const [movies, setMovies] = useState([]);

  const [activeMovieId, setActiveMovieId] = useState();

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer xxxx",
      },
    }).then(async (res) => {
      const data = await res.json();
      const popularMovies = data.results.slice(0, 4); // select four movie

      setMovies(popularMovies);
      setActiveMovieId(popularMovies[0].id);
    });
  }, []);
  console.log(movies);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id == activeMovieId)
        .map((movie) => (
          <Movie data={movie} key={movie.id} />
        ))}
      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};

export default FeatureMovie;
