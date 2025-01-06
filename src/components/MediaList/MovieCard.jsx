import CircularProgressBar from "./CircularProgressBar";
import PropTypes from "prop-types";

const MovieCard = ({ title, releaseDate, poster, point, mediaType }) => {
  console.log(mediaType, title);
  return (
    <div className="relative rounded-lg border border-slate-800">
      {mediaType === "tv" && (
        <p className="absolute right-1 top-1 rounded bg-black p-1 text-sm font-bold text-white shadow">
          TV Show
        </p>
      )}
      <img
        className="rounded-lg"
        src={`https://media.themoviedb.org/t/p/w440_and_h660_face${poster}`}
      />
      <div className="relative -top-[1.5vw] px-4">
        <CircularProgressBar
          percent={Math.round(point * 10)}
          strokeColor={point >= 7 ? "green" : point >= 5 ? "orange" : "red"}
        />
        <p className="mt-2 font-bold">{title}</p>
        <p className="text-slate-300">{releaseDate}</p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string,
  releaseDate: PropTypes.string,
  poster: PropTypes.string,
  point: PropTypes.number,
  mediaType: PropTypes.string,
};

export default MovieCard;
