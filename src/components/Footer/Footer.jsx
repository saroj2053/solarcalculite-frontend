import "./Footer.css";

// eslint-disable-next-line
const Footer = () => {
  return (
    <div className="footerContentWrapper">
      <div className="container">
        <div className="footer__contents">
          <div className="footer__left">
            <h4>Solar Calculite</h4>
            <p className="form-text text-muted">
              Empowering Tomorrow, One Ray at a Time: Harnessing Solar Energy
              for a Brighter Future!
            </p>
          </div>
          <div className="footer__right">
            <p>
              &copy; {new Date().getFullYear()} SolarCalculite : All rights
              reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
