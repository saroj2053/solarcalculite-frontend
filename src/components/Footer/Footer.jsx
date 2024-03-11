import "./Footer.css";

const Footer = () => {
  return (
    <div className="footerContentWrapper">
      <p>
        &copy; {new Date().getFullYear()} SolarCalculite : All rights reserved
      </p>
    </div>
  );
};

export default Footer;
