import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="content-container">
        <div className="container footerContentWrapper">
          <p>
            &copy; {new Date().getFullYear()} SolarCalculite : All rights
            reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
