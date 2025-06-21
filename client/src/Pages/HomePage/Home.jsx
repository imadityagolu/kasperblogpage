import React, { useEffect } from "react";
import AboutDirector from "../../Components/SubComponents/About/AboutDirector";
import AboutServices from "../../Components/SubComponents/About/AboutServices";
import OurClients from "../../Components/SubComponents/About/OurClients";
import IndustriesWeServe from "../../Components/SubComponents/About/IndustriesWeServe";
import OurProjects from "../../Components/SubComponents/About/OurProjects";
import TechStacks from "../../Components/SubComponents/TechStacks";
import HomeBanner from "../../Components/Carousel/HomeBanner";
import ServiceMainSection from "../../Components/SubComponents/ServiceComponents/ServiceSubComponents/ServiceMainSection";
import JavaScript from "../../Assets/Images/tech/ProgLang/JavaScript.webp";
import TypeScript from "../../Assets/Images/tech/ProgLang/TypeScript.webp";
import python from "../../Assets/Images/tech/ProgLang/python.webp";
import Java from "../../Assets/Images/tech/ProgLang/Java.webp";
import CLang from "../../Assets/Images/tech/ProgLang/CLang.webp";
import Kotlin from "../../Assets/Images/tech/ProgLang/Kotlin.webp";
import Php from "../../Assets/Images/tech/ProgLang/Php.webp";
import swift from "../../Assets/Images/tech/ProgLang/swift.webp";
import Ruby from "../../Assets/Images/tech/ProgLang/Ruby.webp";
import angular from "../../Assets/Images/tech/Framework/angular.webp";
import ReactIMG from "../../Assets/Images/tech/Framework/React.webp";
import Vue from "../../Assets/Images/tech/Framework/Vue.webp";
import django from "../../Assets/Images/tech/Framework/django.webp";
import laravel from "../../Assets/Images/tech/Framework/laravel.webp";
import springbot from "../../Assets/Images/tech/Framework/springbot.webp";
import asp from "../../Assets/Images/tech/Framework/asp.webp";
import codeignaater from "../../Assets/Images/tech/Framework/codeignaater.webp";
import AWS from "../../Assets/Images/tech/CloudandDB/AWS.webp";
import Azure from "../../Assets/Images/tech/CloudandDB/Azure.webp";
import GoogleCloud from "../../Assets/Images/tech/CloudandDB/GoogleCloud.webp";
import Mongo from "../../Assets/Images/tech/CloudandDB/Mongo.webp";
import mysql from "../../Assets/Images/tech/CloudandDB/mysql.webp";
import salesforce from "../../Assets/Images/tech/CloudandDB/salesforce.webp";
import AmazonDynamoDb from "../../Assets/Images/tech/CloudandDB/AmazonDynamoDb.webp";
import IBM from "../../Assets/Images/tech/CloudandDB/IBM.webp";
import MarinaDB from "../../Assets/Images/tech/CloudandDB/MarinaDB.webp";
import MsSQLServer from "../../Assets/Images/tech/CloudandDB/MsSQLServer.webp";
import redis from "../../Assets/Images/tech/CloudandDB/redis.webp";
// import TestimonialCard from "../../Components/Testimonials/TestimonialCard";
import { Helmet } from "react-helmet";
import Call from "./callbutton/call";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import BlogPagination from "../../Components/Blogs/Blog/BlogPagination";
import BlogHome from "../../Components/Blogs/BlogHome/BlogHome";
const Home = () => {
 
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>
          Expert Software Development Company for Growing Businesses
        </title>

        <meta
          name="google-site-verification"
          content="KxPql2-o-DlKWK3WTiUFvCosrRkP_lgOKxx7No7niwo"
        />
        <meta
          name="discription"
          content="Kasper Infotech is innovative software development company they provide best solution that boost business productivity."
        />
        <meta name="keywords" content="software development company" />

        <link rel="canonical" href="https://kasperinfotech.com/" />

        <meta
          property="og:title"
          content="Expert Software Development Company for Growing Businesses"
        />
        <meta property="og:site_name" content="Kasper Infotech" />
        <meta property="og:url" content="https://kasperinfotech.com" />
        <meta
          property="og:description"
          content="Kasper Infotech is innovative software development company they provide best solution that boost business productivity."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://lh3.googleusercontent.com/p/AF1QipMJKy79j1ZJ80lWsI-Ld1_ddDCAfZfWnplN-tIV=s680-w680-h510"
        />
      </Helmet>

      <HomeBanner />
      <AboutServices />
      <OurClients />
      <IndustriesWeServe />
      {/* <TestimonialCard /> */}

      <BlogHome />


      <ServiceMainSection
        highlights="TECHNOLOGIE WE USE"
        highlightsDouble="TECHNOLOGIE"
        heading="Our team is always curious and eager to explore the latest
            programming languages, frameworks, platforms, and databases. We stay
            up-to-date with the industry's advancements."
      />
      <TechStacks
        Filter1="Programming Languages"
        Filter2="Platform & Frameworks"
        Filter3="Cloud & Database"
        page1Image1={JavaScript}
        page1Image2={TypeScript}
        page1Image3={python}
        page1Image4={Java}
        page1Image5={CLang}
        page1Image6={Kotlin}
        page1Image7={Php}
        page1Image8={swift}
        page1Image9={Ruby}
        page2Image1={ReactIMG}
        page2Image2={angular}
        page2Image3={Vue}
        page2Image4={django}
        page2Image5={laravel}
        page2Image6={springbot}
        page2Image7={asp}
        page2Image8={codeignaater}
        page3Image1={AWS}
        page3Image2={Azure}
        page3Image3={GoogleCloud}
        page3Image4={Mongo}
        page3Image5={mysql}
        page3Image6={salesforce}
        page3Image7={AmazonDynamoDb}
        page3Image8={IBM}
        page3Image9={MarinaDB}
        page3Image10={MsSQLServer}
        page3Image11={redis}
      />
      <OurProjects />
    {/* <Call /> */}
    </>
  );
};

export default Home;
