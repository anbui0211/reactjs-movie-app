import ImageComponent from "@/components/ImageComponent";
import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import { GENDER_MAPPING } from "@/libs/constant";
import { useLoaderData } from "react-router-dom";

const PeoplePage = () => {
  const data = useLoaderData();
  return (
    <div className="bg-black text-[1.2vw] text-white">
      <div className="container">
        <div className="flex-1">
          <ImageComponent
            src="https://media.themoviedb.org/t/p/w600_and_h900_bestv2/mLxIlIf2Gopht23v5VFNpQZ2Rue.jpg"
            width={600}
            height={900}
            className="mb-6"
          />
          <div>
            <p className="mb-6 text-[1.3vw] text-lg font-bold">
              Personal Information
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-bold">Know for</p>
                <p>{data.known_for_department}</p>
              </div>
              <div>
                <p className="font-bold">Gender</p>
                <p> {GENDER_MAPPING[data.gender]}</p>
              </div>
              <div>
                <p className="font-bold">Place of birth</p>
                <p>{data.place_of_birth}</p>
              </div>
              <div>
                <p className="font-bold">Birthday</p>
                <p>{data.birthday}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[2]">
          <p className="mb-6 text-[2vw] font-bold">{data.name}</p>
          <div className="mb-6">
            <p className="mb-4 font-bold text-[1.4]">Biography</p>
            <p>{data.biography}</p>
          </div>
          <RelatedMediaList
            title="Know for"
            // mediaList={(data.combined_credits?.cast || []).slice(0, 12)}
            mediaList={data.combined_credits?.cast || []}
          />
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
