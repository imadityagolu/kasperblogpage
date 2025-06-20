import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

const Layout = () => {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowTooltip(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div>
      <div className="pb-5 mb-0">
        <div
          style={{ position: "fixed", width: "100%", zIndex: "100" }}
        >
          <Navbar />
          <ScrollToTop />
        </div>
      </div>
      <Outlet />

      <Footer />
      {/* Call Button */}
      {/* <a href="tel:+15185354422" className="call-button">
        <FaPhoneAlt />
      </a> */}

      {/* WhatsApp Button */}
      {/* <a
        href="https://wa.me/+14313044805"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <FaWhatsapp />
      </a> */}

        {/* Call Button */}
        <a
        href="tel:+15185354422"
        className="call-button"
        title="Call Us"
         data-tooltip="Call Us"
      >
        <FaPhoneAlt />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+14313044805"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        title="Chat on WhatsApp"
        data-tooltip="Chat on WhatsApp"

      >
        <FaWhatsapp />
      </a>
      
    </div>
  );
};

export default Layout;
