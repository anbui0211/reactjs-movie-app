import useFetch from "@/hooks/useFetch";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";

const GenresInput = ({ control, onChange, value = [] }) => {
  const mediaType = useWatch({ name: "mediaType", control });

  const { data } = useFetch(
    {
      url: `/genre/${mediaType}/list`,
    },
    {
      enabled: mediaType,
    },
  );

  // Clear value when mediaType change
  useEffect(() => {
    onChange([]);
  }, [mediaType]);

  return (
    <div className="flex flex-wrap gap-1">
      {(data.genres || []).map((genre) => (
        <p
          className={`cursor-pointer rounded-lg border px-2 py-1 ${value.includes(genre.id) ? "bg-black text-white" : ""}`}
          key={genre.id}
          onClick={() => {
            let newValue = [...value];
            if (value.includes(genre.id)) {
              newValue = value.filter((id) => id !== genre.id);
            } else {
              newValue = [...newValue, genre.id];
            }
            console.log("newValue", newValue);
            onChange(newValue);
          }}
        >
          {genre.name}
        </p>
      ))}
    </div>
  );
};

GenresInput.propTypes = {
  control: PropTypes.any,
  onChange: PropTypes.func,
  value: PropTypes.array,
};

export default GenresInput;
