import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-slate-950 px-8 lg:h-20">
      <div className="lg:gap:6 flex items-center gap-4 text-white">
        <img src="./netflix.png" className="w-16 sm:w-28" />
        <a href="#" className="lg:text-xl">
          Phim
        </a>
        <a href="#" className="lg:text-xl">
          Truyền hình
        </a>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="cursor-pointer text-white"
        />
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
