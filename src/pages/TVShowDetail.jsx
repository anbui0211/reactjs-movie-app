import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import SessonsList from "@/components/MediaDetail/SessonsList";
import TVShowInformation from "@/components/MediaDetail/TVShowInformation";
import useFetch from "@/hooks/useFetch";
import Loading from "@components/Loading";
import ActorList from "@components/MediaDetail/ActorList";
import Banner from "@components/MediaDetail/Banner";
import { useParams } from "react-router-dom";

const TVShowDetail = () => {
  const { id } = useParams();
  const { data: tvInfo, isLoading } = useFetch({
    /**
     * release_dates: get certification
     * credits: get diector movie
     */
    url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits`,
  });

  const { data: recommendationsResponse, isRelatedMovieLoading } = useFetch({
    url: `/tv/${id}/recommendations`,
  });

  const relatedMovies = recommendationsResponse?.results || [];

  const certification = (tvInfo.content_ratings?.results || []).find(
    (result) => result.iso_3166_1 === "US",
  )?.rating;

  const genres = (tvInfo.genres || []).map((genre) => genre.name).join(", ");

  const crews = (tvInfo.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ["Director", "Writer"].some((job) => jobs.includes(job));
    })
    .slice(0, 10)
    .map((crew) => ({ id: crew.id, job: crew.jobs[0].job, name: crew.name }));

  const actors = (tvInfo.aggregate_credits?.cast || []).map((cast) => ({
    ...cast,
    character: cast.roles[0]?.character || "",
    episodeCount: cast.roles[0]?.episode_count,
  }));

  const seasonsSorted = (tvInfo.seasons || []).reverse();

  // If process get data is doing
  if (isLoading) {
    return <Loading />;
  }

  console.log({ tvInfo });

  return (
    <div>
      <Banner
        title={tvInfo.name}
        backdropPath={tvInfo.backdrop_path}
        posterPath={tvInfo.poster_path}
        releaseDate={tvInfo.first_air_date}
        genres={genres}
        point={tvInfo.vote_average}
        overview={tvInfo.overview}
        certification={certification}
        crews={crews}
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            {/* Thông tin tác giả */}
            <ActorList actors={actors} />
            {/* Seri và tập phim */}
            <SessonsList sessons={seasonsSorted} />
            {/* Các phim liên quan */}
            <RelatedMediaList
              mediaList={relatedMovies}
              isLoading={isRelatedMovieLoading}
            />
          </div>
          <div className="flex-1">
            <TVShowInformation tvInfo={tvInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetail;
