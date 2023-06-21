import "./Footer.css";
import { GoMarkGithub } from "react-icons/go";
import { BsInstagram } from "react-icons/bs";
import { GrLinkedin } from "react-icons/gr";
import { IoLogoTwitter } from "react-icons/io";

import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const darkMode = useTheme();
  const bgFooter = darkMode ? "dark" : "light";
  const footerLinksDark = darkMode ? "footer__bgDark" : "";
  return (
    <>
      <div className="content-container">
        <div className={`footer footer__${bgFooter}`}>
          <div className="container footer__container">
            <div className="footer__left">
              <p>&copy; 2023 SolarCalculite. All rights reserved</p>
            </div>

            <div className={`footer__right ${footerLinksDark}`}>
              <p>
                <GoMarkGithub />
              </p>
              <p>
                <BsInstagram />
              </p>
              <p>
                <GrLinkedin />
              </p>
              <p>
                <IoLogoTwitter />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
