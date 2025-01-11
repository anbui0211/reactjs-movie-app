import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import MovieInformation from "@/components/MediaDetail/MovieInformation";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [relatedMovies, setRelatedMovies] = useState([]);
  // const [isRelatedMovieListLoading, SetIsRelatedMovieListLoading] =
  //   useState(false);

  useEffect(() => {
    setIsLoading(true);

    /**
     * release_dates: get certification
     * credits: get diector movie
     */
    const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (res) => {
        const data = await res.json();
        setMovieInfo(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // SetIsRelatedMovieListLoading(true);

    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (res) => {
        const data = await res.json();
        const currentRelatedMovies = (data.results || []).slice(0, 8);
        setRelatedMovies(currentRelatedMovies);
        console.log({ data });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        // SetIsRelatedMovieListLoading(false);
      });
  }, [id]);

  // If process get data is doing
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner mediaInfo={movieInfo} />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            {/* Thông tin tác giả */}
            <ActorList actors={movieInfo.credits?.cast || []} />0
            {/* Các phim liên quan */}
            <RelatedMediaList mediaList={relatedMovies} />
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
