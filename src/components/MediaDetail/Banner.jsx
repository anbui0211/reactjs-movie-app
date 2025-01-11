import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { groupBy } from "lodash";
import PropTypes from "prop-types";
import CircularProgressBar from "../CircularProgressBar";

const Banner = ({ mediaInfo }) => {
  const certification = (
    (mediaInfo.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((release_date) => release_date.certification)?.certification;

  const genres = (mediaInfo.genres || []).map((genre) => genre.name).join(", ");

  const crews = (mediaInfo.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  // select Director, Screenplay, Writer
  const groupCrews = groupBy(crews, "job");

  return (
    <div className="relative overflow-hidden text-white">
      <img
        // inset-0 ->(top:0; left-0; right-0; bottom-0;)
        className="absolute inset-0 brightness-[0.2]"
        src={`https://image.tmdb.org/t/p/original${mediaInfo.backdrop_path}`}
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-10 lg:gap-8">
        <div className="flex-1">
          <img
            src={`https://image.tmdb.org/t/p/w342/${mediaInfo.poster_path}`}
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{mediaInfo.title}</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 p-1 text-gray-400">
              {certification}
            </span>
            <p>{mediaInfo.release_date}</p>
            <p>{genres}</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                /**
                 * React có thể render component MovieDetail trước khi dữ liệu từ API được gán cho mediaInfo
                 * và mediaInfo ban đầu được khởi tạo là một object rỗng ({}). Khi đó
                 * mediaInfo.vote_average ban đầu là undefined.
                 * Biểu thức Math.round(undefined * 10) trả về NaN.
                 * => Need check exist và set default value here
                 */
                percent={Math.round(mediaInfo.vote_average || 0 * 10)}
                size={3.5}
                strokeWidth={0.3}
              />
              Ratings
            </div>
            <button>
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-1 text-[1.3vw] font-bold">Overview</p>
            <p>{mediaInfo.overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupCrews[job].map((crew) => crew.name).join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  mediaInfo: PropTypes.object,
};

export default Banner;
