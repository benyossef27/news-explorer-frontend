import { Link } from "react-router-dom";
import github from "../../images/github.svg";
import linkedin from "../../images/linkedin.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyrights">
        &copy; {new Date().getFullYear()} Benyo
      </p>
      <ul className="footer__navbar">
        <li>
          <Link className="footer__home-link hover-fade" to={"/"}>
            Home
          </Link>
        </li>
        <li className="footer__link hover-fade">
          {" "}
          <a className="footer__link hover-fade" href="https://practicum.com">
            Practicum by Yandex
          </a>
        </li>
        <li className="footer__link hover-fade">
          {" "}
          <a href="https://github.com/benyossef27">
            <img src={github} alt="github" className="footer__navbar-icon" />
          </a>
        </li>
        <li className="footer__link hover-fade">
          {" "}
          <a href="https://linkedin.com">
            <img
              src={linkedin}
              alt="linkedin"
              className="footer__navbar-icon"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}
