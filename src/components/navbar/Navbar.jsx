import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profile from "../../assets/profile.jpg";
import { AuthContext } from "../../context/AuthContext";
import { DarkModeContext } from "../../context/DarkModeContext";
import { SidebarContext } from "../../context/SidebarContext";
import "./navbar.scss";

function Navbar() {
  // const { sidebarActive, setSidebarActive } = useContext(SidebarContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach event listener to window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{windowWidth > 768 ? <DeskNavbar /> : <MobNavbar />}</>;
}

export default Navbar;

function MobNavbar() {
  const { sidebarActive, setSidebarActive } = useContext(SidebarContext);

  return (
    <header className="mobHeader">
      <nav className="mobNavbar">
        <div className="left">
          <div
            className="arrowIcon"
            onClick={() => setSidebarActive((e) => !e)}
          >
            {sidebarActive ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          </div>
          <div className="logoImage">
            <Link to={"/"}>
              <img
                src={
                  "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-light.svg"
                }
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="right">
          <div className="header-user">
            <button className="profile">
              <img src={profile} alt="" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function DeskNavbar() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { sidebarActive, setSidebarActive } = useContext(SidebarContext);
  const {userInformation} = useContext(AuthContext);
  return (
    <header className={sidebarActive ? "header" : "header active"}>
      <nav className="navbar">
        <div className="left" onClick={() => setSidebarActive((e) => !e)}>
          {sidebarActive ? <ArrowBackIcon /> : <ArrowForwardIcon />}
        </div>
        <div className="right">
          <div className="header-darkmode">
            <button className="darkmode" onClick={toggleDarkMode}>
              {isDarkMode ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </button>
          </div>

          <div className="header-user">
            <button className="profile">
              <img src={userInformation? userInformation.image :profile } alt="" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
