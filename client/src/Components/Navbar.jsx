import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Images/logo.png"
import "./btn.css";

const Navbar = () => {



  return (
    <nav className="navbar position-fixed top-0  w-100 py-3 navbar-expand-lg navbar-light px-lg-5 bg-white z-1 ">
      <div className="container-fluid  gap-4 px-lg-5 ">
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" />
        </Link>

        <div className="collapse  navbar-collapse" id="navbarNav">
          <ul className="navbar-nav fw-semibold gap-3">
            <li className="nav-item">
              <NavLink
                className={(e) => {
                  return e.isActive
                    ? "text-primary nav-link  border-2 border-bottom border-primary "
                    : "nav-link ";
                }}
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item  " style={{ minWidth: '100px' }}>
              <NavLink
                className={(e) => {
                  return e.isActive
                    ? "text-primary nav-link  border-2 border-primary border-bottom"
                    : "nav-link ";
                }}
                to="/spareparts"
              >
                Spare Parts
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={(e) => {
                  return e.isActive
                    ? "nav-link text-primary border-2 border-bottom border-primary"
                    : "nav-link ";
                }}
                to="/services"
              >
                Services
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={(e) => {
                  return e.isActive
                    ? "nav-link text-primary border-2 border-bottom border-primary"
                    : "nav-link ";
                }}
                to="/contactus"
              >
                Contact
              </NavLink>
            </li>

            <li className="nav-item ">
              <NavLink
                className={(e) => {
                  return e.isActive
                    ? "nav-link text-primary border-2 border-bottom border-primary"
                    : "nav-link ";
                }}
                to="/payment"
              >
                Payment
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <a style={{ minWidth: '100px' }} className="btncall" href="tel:+918006225800" target="_blank">
            <button className="btn  btn-primary rounded-pill">
              <FontAwesomeIcon icon={faPhone} />
              <span> Call Us</span>
            </button>
          </a>
          <NavLink
            className="mx-4 md-mx-5 d-none d-lg-block text-primary "
            to="/rateus"
          >
            <button className="btn  btn-primary rounded-pill">
              <FontAwesomeIcon icon="fa-solid fa-star" /> RateUs
            </button>
          </NavLink>
        </div>
      </div >
    </nav >
  );
};

export default Navbar;
