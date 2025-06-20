import React, { useEffect } from "react";
import './PrivacyPolicy.css'
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);
  return ( 
    <>
          <Helmet>
        <title>Privicy Policy & Term of Service| Kasper Infotech</title>
        <meta
          name="discription"
          content="Privicy Policy & Term of Service"
        />
        <meta name="keywords" content="Privicy Policy & Term of Service" />
      </Helmet>
        <div className="container  position-relative py-5">
        
  <div className="d-flex privicy-holder px-5 py-3  aline-start text-start flex-column gap-4">
     <div>
     <h1 className="fs-1 fw-bold text-center text-decoration-underline text-uppercase ">Privicy Policy & Term of Service</h1>
      <br />
      <br />
      <p>
        Thank you for selecting Kasper Infotech Pvt. Ltd. We are dedicated to
        safeguarding your privacy and providing a secure online experience. This
        Privacy Policy describes how we collect, use, disclose, and protect your
        information when you visit our website or use our software development,
        CRM, or WordPress-related services.
      </p>
      </div>
      <div>
      <h2 className="fs-4 fw-bold">Information We Collect:</h2>
      <br />
      <li>
        <strong>Personal Information:</strong> When you provide us with personal
        information such as your name, email address, phone number, and other
        contact details during the sign-up process, forms on our website, or
        communication with our representatives, we may collect it.
      </li>
      <br />
      <li>
        <strong>Client Data: </strong>We may process data that you provide to us
        in the course of providing software development, Web Designing, CRM, and
        WordPress-related services. Customer information, user data, and other
        content relevant to the services we provide may be included.
      </li>
      <br />
      <li>
        <strong>Usage Information: </strong>We might automatically gather data
        about your interactions with our website and services, including your IP
        address, browser type, the pages you view, and the duration of your
        visit.
      </li>
      <br />
      </div>
      <div>
      <h2 className="fs-4 fw-bold">How We Use Your Information:</h2>
      <li>
        <strong>Service Delivery:</strong> We use your data to provide Web
        Designing, software development, CRM, and WordPress-related services, as
        well as to customize content and provide technical support.
      </li>
      <br />
      <li>
        <strong>Communication: </strong>We may use your contact information to
        communicate with you about our services, updates, and important
        announcements.
      </li>
      <br />
      <li>
        <strong>Analytics: </strong>We use analytics tools to understand how
        visitors interact with our website and services, helping us improve and
        optimize our offerings.
      </li>
      <br />
      </div>
      <div>
      <h2 className="fs-4 fw-bold">Client Data Ownership:</h2>
      <p>
        Your personal information is whatever you submit when using our CRM,
        WordPress, and software development services. Unless it's required by
        law or is necessary for us to provide our services, we won't use,
        modify, or disclose this data.
      </p>
      </div>
      <div>
      <h2 className="fs-4 fw-bold">Security:</h2>
      <p>
        We protect client data and your personal information with
        industry-standard security measures. However, there is no completely
        safe way to store data electronically or transmit data over the
        internet.
      </p>
      </div>
      <div>
      <h2 className="fs-4 fw-bold">Changes to This Privacy Policy:</h2>
      <p>
        We reserve the right to update this Privacy Policy at any time. Changes
        will be effective immediately upon posting the updated policy on our
        website.
      </p>
      </div>
      <div>
      <h2 className="fs-4 fw-bold">Contact Us:</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at{" "}
        <a href="mailto:sales@kasperinfotech.org">sales@kasperinfotech.org</a>{" "} <span> and </span>  
         <a href="mailto:info@kasperinfotech.org">info@kasperinfotech.org</a>.
        Thank you for trusting Kasper Infotech Pvt. Ltd.
      </p>
      </div>
        </div> 
    </div>
    </>
  );
};

export default PrivacyPolicy;
