import PropType from "prop-types";
import MovieCard from "@components/MovieCard";
const RelatedMediaList = ({ mediaList = [] }) => {
  return (
    <div>
      <p className="mb-4 mt-6 text-[1.4vw] font-bold">More like this</p>
      <div className="flex grid grid-cols-3 gap-4 sm:grid-cols-4">
        {mediaList.map((media) => (
          <MovieCard
            key={media.id}
            id={media.id}
            title={media.title}
            releaseDate={media.release_date}
            poster={media.poster_path}
            point={media.vote_average}
            mediaType={media.media_type}
          />
        ))}
      </div>
    </div>
  );
};

RelatedMediaList.propTypes = {
  mediaList: PropType.array,
};

export default RelatedMediaList;
