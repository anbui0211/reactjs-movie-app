import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const ImageComponent = ({ src, width, height, className }) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=%22Loading%22`,
  );
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
    };

    /** Clean up function
     * Clean up khi component unmount or src change
     */
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <img
      className={currentSrc === src ? className : `${className} blur-sm`}
      src={currentSrc}
      width={210}
      height={300}
    />
  );
};

ImageComponent.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default ImageComponent;
