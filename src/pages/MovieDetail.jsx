import MovieInformation from "@/components/MediaDetail/MovieInformation";
import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import useFetch from "@/hooks/useFetch";
import Loading from "@components/Loading";
import ActorList from "@components/MediaDetail/ActorList";
import Banner from "@components/MediaDetail/Banner";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const { data: movieInfo, isLoading } = useFetch({
    /**
     * release_dates: get certification
     * credits: get diector movie
     */
    url: `/movie/${id}?append_to_response=release_dates,credits`,
  });

  const { data: recommendationsResponse, isRecommendedTVLoading } = useFetch({
    url: `/movie/${id}/recommendations`,
  });

  const relatedTVShow = recommendationsResponse?.results || [];

  const certification = (
    (movieInfo.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((release_date) => release_date.certification)?.certification;

  const genres = (movieInfo.genres || []).map((genre) => genre.name).join(", ");

  const crews = (movieInfo.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  // If process get data is doing
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner
        title={movieInfo.title}
        backdropPath={movieInfo.backdrop_path}
        posterPath={movieInfo.poster_path}
        releaseDate={movieInfo.release_date}
        genres={genres}
        point={movieInfo.vote_average}
        overview={movieInfo.overview}
        certification={certification}
        crews={crews}
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="container">
          <div className="flex-[2]">
            {/* Thông tin tác giả */}
            <ActorList actors={movieInfo.credits?.cast || []} />0
            {/* Các phim liên quan */}
            <RelatedMediaList
              mediaList={relatedTVShow}
              isLoading={isRecommendedTVLoading}
              title="More like this"
            />
          </div>
          <div className="flex-1">
            <MovieInformation movieInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
