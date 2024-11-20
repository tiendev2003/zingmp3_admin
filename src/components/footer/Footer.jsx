import { Link } from "react-router-dom";
import "./footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="content">
        Copyright &copy; 2024 Zingmp3. Designed by{" "}
        <Link to="/" target="_blank">
          Zingmp3
        </Link>{" "}
        All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
