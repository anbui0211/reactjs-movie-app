import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const ImageComponent = ({ src, width, height, className }) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=%22Loading%22`,
  );
  useEffect(() => {
    const img = new Image();
    if (src) {
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
      };
      return;
    }

    // "src" prop no have value
    setCurrentSrc(`https://placehold.co/${width}x${height}?text="No%20Image"`);

    /** Clean up function
     * Clean up khi component unmount or src change
     */
    return () => {
      img.onload = null;
    };
  }, [src, width, height]);

  return (
    <img
      className={
        currentSrc === src || !src ? className : `${className} blur-sm`
      }
      src={currentSrc}
      width={width}
      height={height}
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
