import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="content-container">
        <div className="footer footer__light">
          <div className="container footer__container">
            <div className="footer__left">
              <p>
                &copy; {new Date().getFullYear()} SolarCalculite : All rights
                reserved
              </p>
            </div>

            <div className="footer__right ">
              <p>Privacy Policy</p>
              <p>Terms and Conditions</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
