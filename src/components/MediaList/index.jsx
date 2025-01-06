import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MediaList = ({ title, tabs }) => {
  const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  console.log(activeTabId);

  useEffect(() => {
    // https://api.themoviedb.org/3/trending/all/day?language=en-US
    const url = tabs.find((tab) => tab.id === activeTabId)?.url;
    if (url) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_READ_TOKEN_ACCESS_TMDB}`,
        },
      };

      fetch(url, options).then(async (res) => {
        const data = await res.json();
        const trendingMediaList = data.results.slice(0, 12);
        setMediaList(trendingMediaList);
      });
    }
  }, [activeTabId, tabs]);

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex gap-1 rounded border border-white">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer rounded px-2 py-1 ${activeTabId === tab.id ? "bg-white text-black" : ""}`}
              onClick={() => {
                setActiveTabId(tab.id);
              }}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {mediaList.map((media) => (
          <MovieCard
            key={media.id}
            // if category is TV, title and release_date will not exist
            title={media.title || media.name}
            releaseDate={media.release_date || media.first_air_date}
            poster={media.poster_path}
            point={media.vote_average}
            // Nếu api không có media_type, thì media_type activeTabId (category)

            mediaType={media.media_type || activeTabId}
          />
        ))}
      </div>
    </div>
  );
};

MediaList.propTypes = {
  title: PropTypes.string,
  tabs: PropTypes.array,
};

export default MediaList;
