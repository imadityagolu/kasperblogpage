import React from "react";
import "./footer.css";
import { BsFacebook } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
  FaHtml5,
  FaCss3Alt,
  FaWordpress,
} from "react-icons/fa";
import { FaAngular } from "react-icons/fa";
import { FaBootstrap, FaReact } from "react-icons/fa6";
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiCanva,
  SiFigma,
  SiGrammarly,
  SiJavascript,
  SiOpenai,
  SiPhp,
  SiRedux,
} from "react-icons/si";
import ScrollToTopBtn from "./ScrollToTopBtn";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="home-footer bg-success pb-1 mt-5 position-relative">
      <div className="social-media container d-flex justify-content-between pt-3 px-5 pb-3 aline-item-center">
        <h6 className="text-success  fw-bold pt-1">Follow Us On :</h6>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.facebook.com/kasperinfotech/"
          >
            <BsFacebook className="social-icons" />
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/kasperInfotech3"
          >
            <RiTwitterXFill className="social-icons" />
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.instagram.com/kasperinfo/"
          >
            <FaInstagram className="social-icons" />
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://api.whatsapp.com/send/?phone=918006384800&text&type=phone_number&app_absent=0"
          >
            <FaWhatsapp className="social-icons" />
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.youtube.com/channel/UC6ESBRbPwHhc9edkv1yTt8Q"
          >
            <FaYoutube className="social-icons" />
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://in.linkedin.com/company/kasper-infotech"
          >
            <FaLinkedin className="social-icons" />
          </a>
        </li>
      </div>
      <hr className="m-0 mb-3" style={{ opacity: "10%" }} />
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-3  my-2">
            <h6 className="text-lg-start text-md-center">Useful Links</h6>
            <div class="footer-links align-items-sm-center align-items-lg-start">
              <li>
                <Link to="/Home">Home </Link>
              </li>
              <li>
                <Link to="/About-us">About Us</Link>
              </li>
              <li>
                <Link to="/Career">Career at Kasper </Link>
              </li>
              <li>
                <Link to="/Contact-us">Contact Us</Link>
              </li>
              <div className="d-flex column-gap-4 mt-1 rounded fs-3 flex-wrap bg-light px-1 pb-1">
                <li>
                  <FaReact className="text-primary" />
                </li>
                <li>
                  <FaAngular className="text-danger" />
                </li>
                <li>
                  <SiPhp style={{ color: " rgb(231, 116, 231)" }} />
                </li>
                <li>
                  <FaBootstrap style={{ color: " rgb(82, 4, 82)" }} />
                </li>
                <li>
                  <SiRedux className="text-dark" />
                </li>
                <li>
                  <FaHtml5 style={{ color: "orangered" }} />
                </li>
                <li>
                  <FaCss3Alt className="text-primary" />
                </li>
                <li>
                  <SiJavascript className="text-warning" />
                </li>
                <li>
                  <SiCanva className="text-primary" />
                </li>
                <li>
                  <SiAdobephotoshop style={{ color: " rgb(3, 23, 114)" }} />
                </li>
                <li>
                  <SiOpenai className="text-success" />
                </li>
                <li>
                  <SiFigma style={{ color: " rgb(82, 4, 82)" }} />
                </li>
                <li>
                  <FaWordpress style={{ color: " rgb(82, 4, 82)" }} />
                </li>
                <li>
                  <SiGrammarly className="text-success" />
                </li>
                <li>
                  <SiAdobeillustrator style={{ color: "rgb(114, 3, 36)" }} />
                </li>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 my-2">
            <h6 className="text-lg-start text-md-center">Our Services</h6>
            <div class="footer-links align-items-sm-center align-items-lg-start">
              <li>
                <Link to="/web-application-development">Web Development</Link>
              </li>
              <li>
                <Link to="/mobile-app-development">App Development</Link>
              </li>
              <li>
                <Link to="/cms-software-development">CMS Services</Link>
              </li>
              <li>
                <Link to="/crm-development-service">CRM Services</Link>
              </li>
              <li>
                <Link to="/erp-software-development">ERP Services</Link>
              </li>
              <li>
                <Link to="/digital-marketing-agency">Digital Marketing</Link>
              </li>
              <div>
                <h6 className="text-lg-start mt-3 mb-0 text-md-center">
                  Industries we Serve
                </h6>
                <Link
                  className="text-decoration-none text-center d-flex aline-start justify-content-center justify-content-lg-start"
                  to="/Privacy-Policy"
                >
                  Term & condition
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 my-2">
            <h6 className="text-lg-start text-md-center">
              Industries we Serve
            </h6>
            <div class="footer-links align-items-sm-center align-items-lg-start">
              <li>
                <Link to="/ITES-service">ITES </Link>
              </li>
              <li>
                <Link to="/travel-app-development">Travling </Link>
              </li>
              <li>
                <Link to="/sports-app-development-company">
                  Health & Fitness
                </Link>
              </li>
              <li>
                <Link to="/media-entertainment-app-development">
                  Media & Entertainment
                </Link>
              </li>
              <li>
                <Link to="/mobile-banking-app-development">
                  Banking & Finance
                </Link>
              </li>
              <li>
                <Link to="/education-mobile-app-development">Education</Link>
              </li>
              <li>
                <Link to="/best-real-estate-app-development">Real Estate</Link>
              </li>
              <li>
                <Link to="/ecommerce-mobile-app-development">Ecommerce</Link>
              </li>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 my-2">
            <h6 className="text-lg-start text-md-center">Locate Us </h6>
            <div class="addresslinks footer-links align-items-sm-center align-items-lg-start">
              <a
                target="blank"
                href="https://www.google.com/maps/place/Kasper+Infotech+Pvt+Ltd/@28.6272735,77.3725033,17z/data=!3m2!4b1!5s0x390cefbc66672b6f:0x7665e035622c9937!4m6!3m5!1s0x390ce5dbb8748335:0x3cfcbbd326e7a390!8m2!3d28.6272735!4d77.3725033!16s%2Fg%2F11sdbhy8ct?entry=ttu"
                className="text-md-start text-white text-center"
              >
                Office Number 214, Tower B, The iThum Towers, Sector 62, Noida,
                Uttar Pradesh 201301
              </a>
              <li className="fw-bold fs-5 text-warning"> Have a Question? </li>
              <a
                target="blank"
                style={{ listStyle: "none" }}
                href="mailto:info@kasperinfotech.com"
              >
                info@kasperinfotech.com
              </a>{" "}
              <br />
              <a
                target="blank"
                style={{ listStyle: "none" }}
                href="mailto:sales@kasperinfotech.com"
              >
                sales@kasperinfotech.com
              </a>
              <li className="fw-bold fs-5 text-warning"> Call Us </li>
              <a target="blank" href="tel:+918006236800">
                +91 800-623-6800 (India)
              </a>
              <a target="blank" href="tel:+18334854338">
              +1-518-535-4422 (USA)
              </a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "20%", right: "5%" }}>
        <ScrollToTopBtn />
      </div>

      <div className="subfooter text-success mt-5  py-3">
        <p className="text-center m-0">
          © Copyright 2016- 2023 <b>Kasper Infotech Pvt. Ltd.</b> All Rights
          Reserved{" "}
        </p>
        <p className="text-center m-0">
          Designed by{" "}
          <a className="text-danger" href="https://kasperinfotech.com">
            Kasper Infotech Pvt. Ltd.
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
