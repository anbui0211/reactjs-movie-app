import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext();

// customhook
export const useModalContext = () => {
  return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
  // modal được hiển thị hay ẩn đi
  const [isShowing, setIsShowing] = useState(false);
  const [content, setContent] = useState();

  // Ẩn thanh scroll khi hiện popup
  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isShowing]);

  const openPopup = (content) => {
    setIsShowing(true);
    setContent(content);
  };
  return (
    <ModalContext.Provider value={{ openPopup }}>
      {children}
      {isShowing && (
        <div className="fixed inset-0">
          {/* tạo backdrop phủ all khi bật popup */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-slate-600/60"
            onClick={() => {
              setIsShowing(false);
            }}
          >
            <p className="">{content}</p>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node,
};

export default ModalProvider;
