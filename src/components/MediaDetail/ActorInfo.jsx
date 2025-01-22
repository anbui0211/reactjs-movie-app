import PropType from "prop-types";
import ImageComponent from "../ImageComponent";
import { Link } from "react-router-dom";

const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <Link
      to={`/people/${id}`}
      className="rounded-lg border border-slate-300 shadow-sm"
    >
      <ImageComponent
        width={276}
        height={350}
        src={
          profilePath &&
          `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
        }
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        {episodeCount && (
          <p>{episodeCount > 1 ? `${episodeCount} Episodes` : `Episode`} </p>
        )}
      </div>
    </Link>
  );
};

ActorInfo.propTypes = {
  id: PropType.number,
  name: PropType.string,
  character: PropType.string,
  profilePath: PropType.string,
  episodeCount: PropType.number,
};

export default ActorInfo;
