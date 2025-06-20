import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Banner1 from "../../Assets/Images/Home/Banner1.webp";
import Banner2 from "../../Assets/Images/Home/Banner2.webp";
import Banner3 from "../../Assets/Images/Home/Banner3.webp";
import Banner4 from "../../Assets/Images/Home/Banner4.webp";
import "./CarasoulBanner.css";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <Carousel
      className="carasoul d-flex justify-center aline-center"
      style={{ maxHeight: "90vh", padding: "0rem 0", minHeight: "90vh" }}
      indicators={false}
    >
      <Carousel.Item className="Carousel-Item">
        <div className="row container m-auto flex-column-reverse flex-md-row ">
          <div className="col-12  col-md-6 d-flex p-2 gap-2 flex-column aline-start justify-center">
            <h1 className="fw-bolder text-white  text-uppercase">
              Web APP Development Services
            </h1>
            <h2 className="text-md-start text-center text-light fs-4 ">
              Static | Dynamic | CMS | Ecommerce | Portfolio | Corporate Website
              & More
            </h2>
            <div className="d-flex ctabuttons gap-2 py-3 ">
              <Link
                style={{ zIndex: "5" }}
                className="btn btn-warning fw-bold rounded-5"
                to="/web-application-development"
              >
                Know More →
              </Link>
              <Link
                style={{ zIndex: "5" }}
                className="btn btn-success fw-bold rounded-5"
                to="/Contact-us"
              >
                Contact Us ◈
              </Link>
            </div>
          </div>
          <div className="col-12 d-none d-md-flex banner-section col-md-6 p-2 gap-2 flex-column aline-start">
            <div className="banner-container">
              <div className="blob1"></div>
              <div className="blob2"></div>
              <div className="blob3 d-none d-md-block"></div>
              <img src={Banner1} alt="Web Application Development" />
            </div>
          </div>
        </div>

        {/* <img src={Banner1} alt="First slide" /> */}
      </Carousel.Item>

      <Carousel.Item>
        <div className="row container m-auto ">
          <div className="col-12 col-md-6 d-flex p-2 gap-2 flex-column aline-start justify-center">
            <h1 className="fw-bolder text-white text-uppercase ">
              ERP SOFTWARE DEVELOPMENT SERVICES
            </h1>
            <h2 className="fs-4 text-md-start text-center">
              Cloud-based ERP | on-premise ERP | Hybrid of Two
            </h2>
            <div className="d-flex ctabuttons gap-2 py-3">
              <Link
                style={{ zIndex: "5" }}
                className="btn btn-warning fw-bold rounded-5"
                to="/erp-software-development"
              >
                Know More →
              </Link>
              <Link
                style={{ zIndex: "5" }}
                className="btn btn-success fw-bold rounded-5"
                to="/Contact-us"
              >
                Contact Us ◈
              </Link>
            </div>
          </div>
          <div className="col-12 d-none d-md-flex banner-section col-md-6 p-2 gap-2 flex-column aline-start">
            <div className="banner-container">
              <div className="blob1"></div>
              <div className="blob2"></div>
              <div className="blob3 d-none d-md-block"></div>
              <img src={Banner2} alt="ERP SOFTWARE DEVELOPMENT SERVICES" />
            </div>
          </div>
        </div>

        {/* <img src={Banner2} alt="Second slide" /> */}
      </Carousel.Item>

      <Carousel.Item>
        <div className="row container m-auto ">
          <div className="col-12  col-md-6 d-flex p-2 gap-2 flex-column aline-start justify-center">
            <h1 className="fw-bolder text-white text-uppercase ">
              DIGITAL MARKETING SERVICES
            </h1>
            <h2 className="fs-4 text-md-start text-center">
              SEO | ASO | PPC | Content Management | Social Media Marketing &
              More
            </h2>
            <div className="d-flex ctabuttons gap-2 py-3 ">
              <Link
                style={{ zIndex: "5" }}
                className="btn btn-warning fw-bold rounded-5"
                to="/digital-marketing-agency"
              >
                Know More →
              </Link>
              <Link
                style={{ zIndex: "5" }}
                className="btn btn-success fw-bold rounded-5"
                to="/Contact-us"
              >
                Contact Us ◈
              </Link>
            </div>
          </div>
          <div className="col-12 d-none d-md-flex banner-section col-md-6 p-2 gap-2 flex-column aline-start">
            <div className="banner-container">
              <div className="blob1"></div>
              <div className="blob2"></div>
              <div className="blob3 d-none d-md-block"></div>
              <img
                style={{ borderRadius: "50% 0" }}
                src={Banner3}
                alt="DIGITAL MARKETING SERVICES"
              />
            </div>
          </div>
        </div>
        {/* <img src={Banner3} alt="Third slide" /> */}
      </Carousel.Item>

      <Carousel.Item>
        <div className="row container m-auto ">
          <div className="col-12 col-md-6 d-flex p-2 gap-2 flex-column aline-start justify-center">
            <h1 className="fw-bolder text-white text-uppercase">
              CRM DEVELOPMENT SERVICES
            </h1>
            <h2 className="text-start fs-4 text-md-start text-center">
              Analytical | Operational | Collaborative CRM & More
            </h2>
            <div className="d-flex ctabuttons gap-2 py-3">
              <Link
                style={{ zIndex: "5" }}
                className="btn btn-warning fw-bold rounded-5"
                to="/crm-development-service"
              >
                Know More →
              </Link>
              <Link
                style={{ zIndex: "5" }}
                className="btn btn-success fw-bold rounded-5"
                to="/Contact-us"
              >
                Contact Us ◈
              </Link>
            </div>
          </div>
          <div className="col-12 d-none d-md-flex banner-section col-md-6 p-2 gap-2 flex-column aline-start">
            <div className="banner-container">
              <div className="blob1"></div>
              <div className="blob2"></div>
              <div className="blob3 d-none d-md-block"></div>
              <img src={Banner4} alt="CRM DEVELOPMENT SERVICES" />
            </div>
          </div>
        </div>
        {/* <img src={Banner4} alt="Fourth slide" /> */}
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeBanner;
