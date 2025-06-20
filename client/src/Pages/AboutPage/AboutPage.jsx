import React, { useEffect } from "react";
import AboutDirector from "../../Components/SubComponents/About/AboutDirector";
import OurClients from "../../Components/SubComponents/About/OurClients";
import IndustriesWeServe from "../../Components/SubComponents/About/IndustriesWeServe";
import OurProjects from "../../Components/SubComponents/About/OurProjects";
import MissionAndVission from "../../Components/SubComponents/MissionAndVission";
import { Helmet } from "react-helmet";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>Know More About Us| Kasper Infotech</title>
        <meta
          name="discription"
          content="Learn about us our expert team and comprehensive services in digital marketing and web development."
        />
        <meta name="keywords" content="About us" />

        <link rel="canonical" href="https://kasperinfotech.com/About-us" />
        <meta
          property="og:title"
          content="Know More About us | Kasper Infotech"
        />
        <meta property="og:site_name" content="Kasper Infotech" />
        <meta property="og:url" content="https://kasperinfotech.com/About-us" />
        <meta
          property="og:description"
          Content="Learn about us our expert team and comprehensive services in digital marketing and web development."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://kasperinfotech.com/static/media/CRMMigration.c30b479028a90c971cf38a10328ecf98.svg"
        />
      </Helmet>

      <AboutDirector />
      <OurClients />
      <OurProjects />
      <MissionAndVission />
      <IndustriesWeServe />
    </>
  );
};

export default AboutPage;
