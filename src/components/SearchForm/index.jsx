import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import FormField from "./FormField";
import GenresInput from "./FormInput/GenresInput";
import MediaTypeInput from "./FormInput/MediaTypeInput";
import RatingInput from "./FormInput/RatingInput";

const SearchForm = ({ setSearchFormValues }) => {
  const [searchParams] = useSearchParams();
  const mediaType = searchParams.get("mediaType");

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      mediaType: ["tv", "movie"].includes(mediaType) ? mediaType : "movie",
      genres: [],
      rating: "all",
    },
  });

  const handleOnSubmit = (data) => {
    console.log({ formData: data });
  };

  // Khi form có sự thay đổi, watch sẽ trả về giá trị hiện tại của form
  const formValues = watch();
  useEffect(
    () => {
      setSearchFormValues(formValues);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(formValues)],
  );

  return (
    <div className="rounded-lg border p-4 shadow-md">
      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
        <FormField
          name="mediaType"
          control={control}
          label="Media Type"
          Component={MediaTypeInput}
        />
        <FormField
          name="genres"
          label="Genres"
          control={control}
          Component={GenresInput}
        />
        <FormField
          name="rating"
          label="Rating"
          control={control}
          Component={RatingInput}
        />
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  setSearchFormValues: PropTypes.func,
};

export default SearchForm;
