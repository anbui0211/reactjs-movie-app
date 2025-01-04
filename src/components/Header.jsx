import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header className="flex h-14 items-center justify-between bg-slate-950 px-8">
      <div className="flex items-center gap-4 text-white">
        <img src="./netflix.png" className="w-16 sm:w-28" />
        <a href="#">Phim</a>
        <a href="#">Truyền hình</a>
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
