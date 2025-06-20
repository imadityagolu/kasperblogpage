import React from "react";
import BrandLogo from "../../Assets/Images/Universal/Kasper.png";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const HidetheTogle = () => {
    let element = document.querySelector(".show");
    if (element) {
      element.classList.remove("show");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg py-2">
      <div className="container bg-white">
        <NavLink to="Home" onClick={HidetheTogle} href="index.html">
          <img style={{ width: "120px" }} src={BrandLogo} alt="" />
        </NavLink>
        <button
          style={{ width: "fit-content" }}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav gap-md-4 fw-bold gap-1 ms-0 mb-2 mb-lg-0 ms-md-auto">
            <li className="nav-item text-start">
              <NavLink
                to="Home"
                className="nav-link"
                aria-current="page"
                onClick={HidetheTogle}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item text-start">
              <NavLink
                to="About-us"
                className="nav-link"
                onClick={HidetheTogle}
              >
                About
              </NavLink>
            </li>
            <li className="dropdown text-start">
              <div className="btn nav-link text-start">Services</div>
              <ul className="dropdown-menu">
                <div className="drip-Arrow d-none d-md-block"></div>
                <div className="row">
                  <div>
                    <li>
                      <NavLink
                        to="erp-software-development"
                        onClick={HidetheTogle}
                        className="dropdown-item px-1 px-sm-3"
                      >
                        ERP Development
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="crm-development-service"
                        onClick={HidetheTogle}
                        className="dropdown-item px-1 px-sm-3"
                      >
                        CRM Development
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="web-application-development"
                        onClick={HidetheTogle}
                        className="dropdown-item px-1 px-sm-3"
                      >
                        Web App Development
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="cms-software-development"
                        onClick={HidetheTogle}
                        className="dropdown-item px-1 px-sm-3"
                      >
                        CMS Development
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="mobile-app-development"
                        onClick={HidetheTogle}
                        className="dropdown-item px-1 px-sm-3"
                      >
                        Mobile App Development
                      </NavLink>
                    </li>
                  </div>
                  <div>
                    <li>
                      <NavLink
                        to="digital-marketing-agency"
                        onClick={HidetheTogle}
                        className="dropdown-item px-1 px-sm-3"
                      >
                        Digital Marketing
                      </NavLink>
                    </li>
                  </div>
                </div>
              </ul>
            </li>
            <li className="dropdown text-start">
              <div className="nav-link btn text-start">Industries</div>
              <ul className="dropdown-menu">
                <div className="drip-Arrow d-none d-md-block"></div>
                <div className="row">
                  <li>
                    <NavLink
                      to="ITES-service"
                      onClick={HidetheTogle}
                      className="dropdown-item px-1 px-sm-3"
                    >
                      ITES{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="travel-app-development"
                      onClick={HidetheTogle}
                      className="dropdown-item px-1 px-sm-3"
                    >
                      Traveling{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="sports-app-development-company"
                      className="dropdown-item  px-1 px-sm-3"
                      onClick={HidetheTogle}
                    >
                      Sports{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="business-apps-development"
                      className="dropdown-item px-1 px-sm-3"
                      onClick={HidetheTogle}
                    >
                      Business
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/best-real-estate-app-development"
                      className="dropdown-item px-1 px-sm-3"
                      onClick={HidetheTogle}
                    >
                      Real Estate
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/education-mobile-app-development"
                      className="dropdown-item px-1 px-sm-3"
                      onClick={HidetheTogle}
                    >
                      Education
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/healthcare-mobile-app-development"
                      className="dropdown-item px-1 px-sm-3"
                      onClick={HidetheTogle}
                    >
                      Health & Fitness
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/media-entertainment-app-development"
                      className="dropdown-item px-1 px-sm-3"
                      onClick={HidetheTogle}
                    >
                      Entertainment{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/social-app-development"
                      className="dropdown-item px-1 px-sm-3"
                      onClick={HidetheTogle}
                    >
                      Social Media{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mobile-banking-app-development"
                      className="dropdown-item px-1 px-sm-3"
                      onClick={HidetheTogle}
                    >
                      Banking And Finance{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/ecommerce-mobile-app-development"
                      className="dropdown-item px-1 px-sm-3"
                      onClick={HidetheTogle}
                    >
                      E-commerce
                    </NavLink>
                  </li>
                </div>
              </ul>
            </li>


            <li className="nav-item text-start">
              <NavLink to="/blogpage" className="nav-link" onClick={HidetheTogle}>
                Blogs
              </NavLink>
            </li>


            <li className="nav-item text-start">
              <NavLink to="Career" className="nav-link" onClick={HidetheTogle}>
                Career
              </NavLink>
            </li>



            <li className="nav-item text-start">
              <NavLink
                to="/Contact-us"
                className="nav-link"
                onClick={HidetheTogle}
              >
                Contact
              </NavLink>
            </li>
            <NavLink
              to="/Contact-us"
              className="btn btn-success rounded-5   text-white fw-bold"
            >
              Get A Quote
            </NavLink>

            {/* <NavLink
              to="/login"
              className="btn btn-success rounded-2   text-white fw-bold"
            >
             Login
            </NavLink> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
