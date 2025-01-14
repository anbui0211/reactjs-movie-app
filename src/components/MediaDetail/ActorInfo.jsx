import PropType from "prop-types";
import ImageComponent from "../ImageComponent";
// eslint-disable-next-line no-unused-vars
const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <div className="rounded-lg border border-slate-300 shadow-sm">
      <ImageComponent
        width={276}
        height={350}
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
            : "/placeholder_actor_276_350.svg"
        }
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        <p>{episodeCount > 1 ? `${episodeCount} Episodes` : `Episode`} </p>
      </div>
    </div>
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
