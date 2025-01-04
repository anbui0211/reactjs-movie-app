import PropTypes from "prop-types";

const PaginateIndicator = ({ movies, activeMovieId, setActiveMovieId }) => {
  return (
    <div className="absolute bottom-[10%] right-8">
      <ul className="flex gap-1">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className={`h-1 w-6 cursor-pointer ${activeMovieId === movie.id ? "bg-slate-100" : "bg-slate-600"}`}
            onClick={() => {
              setActiveMovieId(movie.id);
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
};

PaginateIndicator.propTypes = {
  movies: PropTypes.array,
  activeMovieId: PropTypes.number,
  setActiveMovieId: PropTypes.number,
};

export default PaginateIndicator;
