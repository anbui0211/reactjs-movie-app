import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";

const FeatureMovie = () => {
  const [activeMovieId, setActiveMovieId] = useState();
  const { data: popularMoviesResponse } = useFetch({
    url: `/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&include_video=true`,
  });

  const { data: videoResponse } = useFetch(
    {
      url: `/movie/${activeMovieId}/videos`,
    },
    { enabled: !!activeMovieId }, // !!: convert to boolean
  );
  const trailerVideoKey = (videoResponse?.results || []).find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  )?.key;

  const movies = (popularMoviesResponse?.results || []).slice(0, 4); // select four movie
  useEffect(() => {
    if (movies[0]?.id) {
      setActiveMovieId(movies[0].id);
    }
  }, [JSON.stringify(movies)]);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id == activeMovieId)
        .map((movie) => (
          <Movie
            data={movie}
            key={movie.id}
            trailerVideoKey={trailerVideoKey}
          />
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
