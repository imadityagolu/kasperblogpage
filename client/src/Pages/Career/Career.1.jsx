import React, { useState } from "react";
import CareerBG from "../../Assets/Images/Career/career.webp";
import ServiceMainSection from "../../Components/SubComponents/ServiceComponents/ServiceSubComponents/ServiceMainSection";
import { Helmet } from "react-helmet";

export const Career = () => {
  const [status, setStatus] = useState("Submit");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { firstname, lastname, email, mobile, gender, position, resume } =
      e.target.elements;
    let formData = new FormData();
    formData.append("firstname", firstname.value);
    formData.append("lastname", lastname.value);
    formData.append("email", email.value);
    formData.append("mobile", mobile.value);
    formData.append("gender", gender.value);
    formData.append("position", position.value);
    formData.append("resume", resume.files[0]); // Attach the resume file
    let response = await fetch("https://emails-4.onrender.com/api/career", {
      method: "POST",
      body: formData,
    });
    setStatus("Submit");
    if (response.ok) {
      let result = await response.json();
      alert(result.status);
      // window.location.reload();
      firstname.value = "";
      lastname.value = "";
      email.value = "";
      mobile.value = "";
      gender.value = "";
      position.value = "";
      resume.value = "";
    } else {
      alert("Email could not be sent.");
    }
  };
  return (
    <>
      <Helmet>
        <title>IT Careers at Kasper Infotech Pvt. Ltd</title>
        <meta
          name="discription"
          content="Explore IT Careers at Kasper Infotech Pvt. Ltd Join work with us to invent, develop, and change the way that technological solutions are used in the future."
        />
        <meta name="keywords" content="IT Careers" />

        <meta
          property="og:title"
          content="IT Careers at Kasper Infotech Pvt. Ltd"
        />
        <meta property="og:site_name" content="Kasper Infotech" />
        <meta property="og:url" content="https://kasperinfotech.com/Career" />
        <meta
          property="og:description"
          content="Explore IT Careers at Kasper Infotech Pvt. Ltd Join work with us to invent, develop, and change the way that technological solutions are used in the future."
        />
        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://kasperinfotech.com/static/media/career.031731f84a1947fc2f24.webp "
        />
        <link rel="canonical" href="https://kasperinfotech.com/Career" />
      </Helmet>
      <div>
        <div className="career-application">
          <div className="why-header position-relative">
            <div className=" container  d-flex justify-content-between align-items-center gap-2">
              <div className="blob-circle-1" />
              <div className="career-content-why d-flex gap-3 flex-column justify-content-between align-items-center">
                <div className="blob-circle-2" />
                <div className="blob-circle-3" />
                <h3 className="service-index mb-3">
                  Why Work with Us?
                  <span className="service-index-bouble">
                    Why Work with Us?
                  </span>
                </h3>
                <li>Exciting and challenging projects</li>
                <li>Collaborative and innovative work environment</li>
                <li>Professional development and growth opportunities</li>
              </div>
              <div className="career-why-img">
                <img src={CareerBG} alt="" />
              </div>
            </div>
          </div>
          <div className="container pt-5 pb-5">
            <div className="highlights-text text-center">
              <ServiceMainSection
                highlights="INTERNSHIP OPENINGS"
                highlightsDouble="INTERNSHIP"
              />
            </div>
            <ul className="Internship-list">
              <li>
                <h4 href="#">Frontend Developer Inter</h4>
                <a href="https://kasperinfotech.org">
                <input
                  className="btn btn-pointer"
                  type="button"
                  href
                  defaultValue="Take Test"
                /></a>
                
              </li>
              <li>
                <h4 href="https://kasperinfotech.co">Backend Developer Inter</h4>
                <input
                  className="btn btn-pointer"
                  type="button"
                  href
                  defaultValue="Take Test"
                />
              </li>
              <li>
                <h4 href="https://kasperinfotech.co">Sales & Marketing Inter</h4>
                <input
                  className="btn btn-pointer"
                  type="button"
                  href
                  defaultValue="Take Test"
                />
              </li>
              <li>
                <h4 href="https://kasperinfotech.co">Digital Marketing Inter</h4>
                <input
                  className="btn btn-pointer"
                  type="button"
                  href
                  defaultValue="Take Test"
                />
              </li>
              <li>
                <h4 href="https://kasperinfotech.co">UX/UI Designer Inter</h4>
                <input
                  className="btn btn-pointer"
                  type="button"
                  href
                  defaultValue="Take Test"
                />
              </li>
              <li>
                <h4 href="https://kasperinfotech.co">Software Developer Inter</h4>
                <input
                  className="btn btn-pointer"
                  type="button"
                  href
                  defaultValue="TOpening Soon"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="career-registration" id="career-registration">
          <div className="d-flex flex-column justify-content-center aline-item-center text-center">
            <div className="highlights-text text-center">
              <ServiceMainSection
                highlights="APPLICATION PROCESS"
                highlightsDouble="APPLICATION"
              />
              <h5 className="text-center fs-5 m-auto pb-5">
                If you're interested in joining our team, please fill out the
                application form below:
              </h5>
            </div>
          </div>
          <div className="row container m-auto">
            <div
              style={{ position: "relative" }}
              className="col-12 col-md-6 py-3 mb-5 mb-md-0"
            >
              <iframe
                title="kasperMap"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0828742360973!2d77.36992837458807!3d28.62727818432098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5dbb8748335%3A0x3cfcbbd326e7a390!2sKasper%20Infotech%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1696592982892!5m2!1sen!2sin"
                style={{
                  width: "100%",
                  height: "100%",
                  boxShadow: "-3px 3px 5px rgba(230, 216, 216, 0.658)",
                  borderRadius: "10px",
                  border: "1px solid rgba(580, 216, 216, 1)",
                  zIndex: "-1",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: "rgba(199, 189, 189, 0.267)",
                  left: "0",
                  top: "0",
                  borderRadius: "10px",
                }}
              ></span>
            </div>
            <div className="col-12 col-md-6">
              <div className="container d-flex justify-content-between">
                <form
                  id="careerForm"
                  encType="multipart/form-data"
                  form
                  onSubmit={handleSubmit}
                >
                  <h2 className="text-center fw-bolder text-uppercase text-white">
                    Career Application
                  </h2>
                  <hr className="bg-light" />
                  <div className="form-group text-start">
                    <div className="form-group ">
                      <label htmlFor="firstname">First Name</label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div className="form-group text-start">
                      <label htmlFor="lastname">Last Name</label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group text-start">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email@gmail.com"
                      required
                    />
                  </div>
                  <div className="form-group text-start">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                      type="text"
                      minLength={10}
                      maxLength={10}
                      placeholder="xxxx-xxx-xxx"
                      title="Please Enter 10 Digit Mobile No"
                      id="mobile"
                      name="mobile"
                      required
                    />
                  </div>
                  <div className="form-group text-start">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" required>
                      <option value>Select Option</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group text-start">
                    <label htmlFor="position">Position Applied For</label>
                    <select id="position" name="position" required>
                      <option value>Select Option</option>
                      <option value="frontend">Frontend Developer</option>
                      <option value="backend">Backend Developer</option>
                      <option value="fullstack">Full Stack Developer</option>
                      <option value="digitalmarketing">
                        Digital Marketing
                      </option>
                      <option value="uxui">UX UI Development</option>
                    </select>
                  </div>
                  <div className="form-group text-start">
                    <label htmlFor="resume">Resume (PDF only, max 2MB)</label>
                    <input
                      type="file"
                      className="form-control rounded-1"
                      id="resume"
                      name="resume"
                      accept=".pdf"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button className="carrersubmitBtn mt-3" type="submit">
                      {status}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
