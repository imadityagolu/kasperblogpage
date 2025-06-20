import React, { useState } from "react";
import "./Contact.css";
import {
  BsGlobeAsiaAustralia,
  BsFillTelephoneFill,
  BsEnvelopeFill,
  BsPinMapFill,
  BsFillClockFill,
} from "react-icons/bs";
import ServiceMainSection from "../../Components/SubComponents/ServiceComponents/ServiceSubComponents/ServiceMainSection";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

const onclick = () => {
  ReactGA.event({
    action: "contact_action",
    category: "contact_category",
    label: "contact_label",
    value: "contact_value",
  });
  // ReactGA.event({
  //   action:string;
  //   category:string;
  //   label :string;
  //   value:number;
  // })
};

const Contact = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { firstname, lastname, email, mobile, requirement, message } =
      e.target.elements;
    let details = {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      mobile: mobile.value,
      requirement: requirement.value,
      message: message.value,
    };
    let response = await fetch("https://emails-4.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
    window.location.reload();
  };
  return (
    <>
      <Helmet>
        <title>Contact Us For More Information | Kasper Infotech</title>
        <meta
          name="discription"
          content="Contact us for more information about knowing our Web development and Digital Marketing Service."
        />
        <meta name="keywords" content="About us" />

        <link rel="canonical" href="https://kasperinfotech.com/Contact-us" />
        <meta property="og:title" content="Know More About - Kasper Infotech" />
        <meta property="og:site_name" content="Kasper Infotech" />
        <meta
          property="og:url"
          content="https://kasperinfotech.com/Contact-us"
        />
        <meta
          property="og:description"
          Content="Contact us for more information about knowing our Web development and Digital Marketing Service."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://kasperinfotech.com/static/media/CRMMigration.c30b479028a90c971cf38a10328ecf98.svg"
        />
      </Helmet>
      <section className="home-Contact py-1 px-1">
        <div className="container">
          <div className="highlights-text text-center">
            <ServiceMainSection
              highlights="CONTACT US "
              highlightsDouble="CONTACT"
            />
            <h5 className="text-center fs-5 m-auto pb-5">
              We are just one click away!
            </h5>
          </div>
          <div className="row p-2 contact">
            <div className="contact-block-1 col-12 col-lg-6  flex-column justify-content-between py-4">
              <div className="left-top-block text-start">
                <h2>👋 Get In Touch </h2>
                <p>
                  Fill up the form or contact us directly for any requirement.
                </p>
                <hr />
              </div>
              <div className="left-Middle-block mb-5">
                <a
                  href="http://www.kasperinfotech.com"
                  target="blank"
                  style={{ textDecoration: "none", color: "white" }}
                  className="d-flex gap-3"
                >
                  <span>
                    <BsGlobeAsiaAustralia />
                  </span>
                  www.kasperinfotech.com
                </a>
                <a
                  href="tel:+1-959-242-6296"
                  target="blank"
                  style={{ textDecoration: "none", color: "white" }}
                  className="d-flex gap-3"
                >
                  <span>
                    <BsFillTelephoneFill />
                  </span>
                  +1-518-535-4422 (USA)
                </a>
                <a
                  href="tel:+91-800-623-6800"
                  target="blank"
                  style={{ textDecoration: "none", color: "white" }}
                  className="d-flex gap-3"
                >
                  <span>
                    <BsFillTelephoneFill />
                  </span>
                  +91-800-623-6800 (India)
                </a>

                <a
                  target="blank"
                  style={{ textDecoration: "none", color: "white" }}
                  href="mailto:info@kasperinfotech.com"
                  className="d-flex gap-3"
                >
                  <span>
                    <BsEnvelopeFill />
                  </span>
                  info@kasperinfotech.com
                </a>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  target="blank"
                  href="mailto:sales@kasperinfotech.com"
                  className="d-flex gap-3"
                >
                  <span>
                    <BsEnvelopeFill />
                  </span>
                  sales@kasperinfotech.com
                </a>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  target="blank"
                  href="https://www.google.com/maps/place/Kasper+Infotech+Pvt+Ltd/@28.6272782,77.3699284,17z/data=!3m2!4b1!5s0x390cefbc66672b6f:0x7665e035622c9937!4m6!3m5!1s0x390ce5dbb8748335:0x3cfcbbd326e7a390!8m2!3d28.6272735!4d77.3725033!16s%2Fg%2F11sdbhy8ct?entry=ttu"
                  className="d-flex gap-3 text-start"
                >
                  <span>
                    <BsPinMapFill />
                  </span>
                  Office Number 214, Tower B, The iThum Towers, Sector 62,
                  Noida, Uttar Pradesh 201301
                </a>
                <p className="d-flex text-start gap-3">
                  <span>
                    <BsFillClockFill />
                  </span>{" "}
                  Monday - Saturday (9:30AM - 6:30PM) IST
                </p>
              </div>
            </div>
            <div className="contact-block-2 col-12 col-lg-6 pt-4">
              <form
                action
                className="d-flex flex-column gap-3 "
                form
                onSubmit={handleSubmit}
              >
                <div className="name-block d-flex gap-4 justify-content-between">
                  <div className="c-section fname d-flex flex-column">
                    <label htmlFor>First Name</label>
                    <input
                      type="text"
                      required
                      id="firstname"
                      name="firstname"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="c-section lname d-flex flex-column">
                    <label htmlFor>Last Name</label>
                    <input
                      type="text"
                      id="lastname"
                      required
                      name="lastname"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="contact-address-block d-flex gap-4 justify-content-between">
                  <div className="c-section email d-flex flex-column">
                    <label htmlFor>Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      name="email"
                      placeholder="sample@abc.com"
                    />
                  </div>
                  <div className="c-section Cnumber d-flex flex-column">
                    <label htmlFor>Contact Number</label>
                    <input
                      type="text"
                      id="mobile"
                      required
                      maxLength={10}
                      inputMode="Numeric"
                      pattern="[0-9]{10}"
                      name="mobile"
                      placeholder="Contact Number"
                    />
                  </div>
                </div>
                <div className="contact-query d-flex flex-column gap-3">
                  <label htmlFor="contact-query">Select your requirement</label>
                  <div className="contact-query d-flex flex-wrap">
                    <p>
                      <input
                        type="radio"
                        id="requirement"
                        name="requirement"
                        defaultValue="Web Development"
                        required
                      />
                      <span>Web Development</span>
                    </p>
                    <p>
                      <input
                        type="radio"
                        id="requirement"
                        name="requirement"
                        defaultValue="App Development"
                        required
                      />
                      <span>App Development</span>
                    </p>
                    <p>
                      <input
                        type="radio"
                        id="requirement"
                        name="requirement"
                        defaultValue="Digital-Marketing"
                        required
                      />
                      <span>Digital Marketing</span>
                    </p>
                    <p>
                      <input
                        type="radio"
                        id="requirement"
                        name="requirement"
                        defaultValue="CMS"
                        required
                      />
                      <span>CMS Development</span>
                    </p>
                    <p>
                      <input
                        type="radio"
                        id="requirement"
                        name="requirement"
                        defaultValue="ERP"
                        required
                      />
                      <span>ERP Development</span>
                    </p>
                    <p>
                      <input
                        type="radio"
                        id="requirement"
                        name="requirement"
                        defaultValue="Others"
                        required
                      />
                      <span>Others</span>
                    </p>
                  </div>
                  <div className="contact-massage d-flex flex-column">
                    <label htmlFor>Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={2}
                      placeholder="write your message here"
                      defaultValue={""}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button
                    className="carrersubmitBtn mt-3"
                    type="submit"
                    onClick={onclick}
                  >
                    {status}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
