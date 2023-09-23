import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="main-footer-wrap">
        <strong className="footer-name">Ungheung_ </strong>
        <span className="line">|</span>
        <Link href={"https://github.com/UngHeung/NextJS"} target="_blank">
          GitHub
        </Link>
        <span className="line">|</span>
        <span className="footer-email"> beehive2838@naver.com </span>
        <span className="line">|</span>
        <span className="footer-phone">010.1234.4321 </span>
      </div>
    </footer>
  );
};

export default Footer;
