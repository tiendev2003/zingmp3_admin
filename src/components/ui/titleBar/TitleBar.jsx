import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useNavigate } from "react-router-dom";
import "./titlebar.scss";

function TitleBar({ text = "Dashboard", titleHome = "Home" }) {
  const navigate = useNavigate();
  return (
    <div className="titlebar">
      <div className="left">{text}</div>
      <div className="right">
        <span className="homeBtn" onClick={() => navigate(-1) }>
          {titleHome}
        </span>
        <DoubleArrowIcon />
        <span className="text">{text}</span>
      </div>
    </div>
  );
}

export default TitleBar;
