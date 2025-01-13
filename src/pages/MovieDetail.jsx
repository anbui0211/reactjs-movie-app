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

  const { data: recommendationsResponse, isRelatedMovieLoading } = useFetch({
    url: `/movie/${id}/recommendations`,
  });

  const relatedMovies = recommendationsResponse?.results || [];

  // If process get data is doing
  if (isLoading) {
    return <Loading />;
  }

  console.log({ movieInfo, isLoading, relatedMovies });

  return (
    <div>
      <Banner mediaInfo={movieInfo} />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            {/* Thông tin tác giả */}
            <ActorList actors={movieInfo.credits?.cast || []} />0
            {/* Các phim liên quan */}
            <RelatedMediaList
              mediaList={relatedMovies}
              isLoading={isRelatedMovieLoading}
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
