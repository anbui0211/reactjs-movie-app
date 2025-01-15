import CircularProgressBar from "../CircularProgressBar";
import ImageComponent from "../ImageComponent";
import PropTypes from "prop-types";

const SessonsList = ({ sessons = [] }) => {
  return (
    <div className="mt-8 text-[1.3vw]">
      <p className="mb-4 mt-6 text-[1.4vw] font-bold">Sessons</p>
      <div className="space-y-4">
        {sessons.map((sesson) => (
          <div
            className="flex gap-4 rounded-lg border border-slate-200 p-3"
            key={sesson.id}
          >
            <ImageComponent
              width={130}
              height={195}
              className="w-1/4 rounded-lg"
              src={`https://media.themoviedb.org/t/p/w300${sesson.poster_path}`}
            />
            {/* space-y: set khoảng cách giữa các item (ngoại trừ item đầu tiên) */}
            <div className="space-y-1">
              <p className="text-[1.4vw] font-bold">{sesson.name}</p>
              <div className="flex items-center gap-2">
                <p className="font-bold">Ratting</p>
                <CircularProgressBar
                  percent={Math.round(sesson.vote_average * 10)}
                  size={2.5}
                  strokeWidth={0.2}
                />
              </div>
              <p>
                <span className="font-bold">Release date:</span>{" "}
                {sesson.air_date}
              </p>
              <p>
                {sesson.episode_count > 1
                  ? `${sesson.episode_count} Episodes`
                  : `Episode`}{" "}
                episode
              </p>
              <p>{sesson.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SessonsList.propTypes = {
  sessons: PropTypes.array,
};

export default SessonsList;
