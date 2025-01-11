import { currencyFormater } from "@/libs/utils";
import PropType from "prop-types";

const MovieInformation = ({ movieInfo = {} }) => {
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Infomation</p>
      <div className="mb-4">
        <p className="font-bold">Origin Name</p>
        <p>{movieInfo.original_title}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Origin Country</p>
        {(movieInfo.origin_country || []).map((countryCode) => (
          <img
            src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
            key={countryCode}
            className="mr-1 mt-1 w-[1.4vw]"
          />
        ))}
      </div>
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{movieInfo.status}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Budget</p>
        <p>{currencyFormater(movieInfo.budget)}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Revenue</p>
        <p>{currencyFormater(movieInfo.revenue)}</p>
      </div>
    </div>
  );
};

MovieInformation.propTypes = {
  movieInfo: PropType.object,
};

export default MovieInformation;
