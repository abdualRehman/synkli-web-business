import { Outlet } from "react-router-dom";
import whiteBgLogo from "../files/whiteBgLogo.png.png";
const Header = () => {
  return (
    <div className="header w-full px-5 pt-3 text-black">
      <div>
        <img src={whiteBgLogo} alt="logo" className="synkli-logo" />
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
