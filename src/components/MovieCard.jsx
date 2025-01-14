import { Link } from "react-router-dom";
import CircularProgressBar from "./CircularProgressBar";
import PropTypes from "prop-types";
import Image from "./ImageComponent";

const MovieCard = ({ id, title, releaseDate, poster, point, mediaType }) => {
  return (
    <Link
      to={mediaType === "tv" ? `/tv/${id}` : `/movie/${id}`}
      className="rounded-lg border border-slate-800"
    >
      <div className="relative">
        {mediaType === "tv" && (
          <p className="absolute right-1 top-1 rounded bg-black p-1 text-sm font-bold text-white shadow">
            TV Show
          </p>
        )}

        <Image
          src={`https://media.themoviedb.org/t/p/w500${poster}`}
          width={210}
          height={300}
          className="w-full rounded-lg"
        />
        {/* <img
          className="w-full rounded-lg"
          src={`https://media.themoviedb.org/t/p/w500${poster}`}
          width={210}
          height={300}
        /> */}
        <div className="relative -top-[1.5vw] px-4">
          <CircularProgressBar
            percent={Math.round(point * 10)}
            strokeColor={point >= 7 ? "green" : point >= 5 ? "orange" : "red"}
          />
          <p className="mt-2 font-bold">{title}</p>
          <p className="text-slate-300">{releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  releaseDate: PropTypes.string,
  poster: PropTypes.string,
  point: PropTypes.number,
  mediaType: PropTypes.string,
};

export default MovieCard;
