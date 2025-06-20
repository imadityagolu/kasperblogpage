import React, { useEffect } from "react";
import Android from "../../Assets/Images/Services/Mobiledev/Android.svg";
import Backenddev from "../../Assets/Images/Services/Mobiledev/Backenddev.svg";
import Crossplatform from "../../Assets/Images/Services/Mobiledev/Crossplatform.svg";
import IOS from "../../Assets/Images/Services/Mobiledev/IOS.svg";
import mobilemaintanance from "../../Assets/Images/Services/Mobiledev/mobilemaintanance.svg";
import qualityassuarnce from "../../Assets/Images/Services/Mobiledev/qualityassuarnce.svg";
import security from "../../Assets/Images/Services/Mobiledev/security.svg";
import UIUXMOBILE from "../../Assets/Images/Services/Mobiledev/UIUXMOBILE.svg";
import webapp from "../../Assets/Images/Services/Mobiledev/webapp.svg";
import LaunchService from "../../Assets/Images/Services/Mobiledev/LaunchService.svg";
import MobileDevelopment from "../../Assets/Images/Services/Mobiledev/MobileDevelopment.svg";
import TestingQuality from "../../Assets/Images/Services/Mobiledev/TestingQuality.svg";
import DeploymentApp from "../../Assets/Images/Services/Mobiledev/DeploymentApp.svg";
import Design from "../../Assets/Images/Services/Mobiledev/Design.svg";
import Idea from "../../Assets/Images/Services/Mobiledev/Idea.svg";
import ServiceMainSection from "../../Components/SubComponents/ServiceComponents/ServiceSubComponents/ServiceMainSection";
import {
  TwoPartGridLeft,
  TwoPartGridRight,
} from "../../Components/SubComponents/ServiceComponents/ServiceSubComponents/TwoPartGrid";
import Illustrator from "../../Assets/Images/tech/MobileStacks/MOBILEUI/Illustrator.webp";
import Sketch from "../../Assets/Images/tech/MobileStacks/MOBILEUI/Sketch.webp";
import FIGMA from "../../Assets/Images/tech/MobileStacks/MOBILEUI/FIGMA.webp";
import MUI from "../../Assets/Images/tech/MobileStacks/MOBILEUI/MUI.webp";
import SwiftUi from "../../Assets/Images/tech/MobileStacks/MOBILEUI/SwiftUi.webp";
import UiKIT from "../../Assets/Images/tech/MobileStacks/MOBILEUI/UiKIT.webp";
import AppleUI from "../../Assets/Images/tech/MobileStacks/MOBILEUI/AppleUI.webp";
import AndroidStudio from "../../Assets/Images/tech/MobileStacks/MOBILELANGUAGE/AndroidStudio.webp";
import CSharp from "../../Assets/Images/tech/MobileStacks/MOBILELANGUAGE/CSharp.webp";
import Flutter from "../../Assets/Images/tech/MobileStacks/MOBILELANGUAGE/Flutter.webp";
import Nodejs from "../../Assets/Images/tech/MobileStacks/MOBILELANGUAGE/Nodejs.webp";
import Objectivec from "../../Assets/Images/tech/MobileStacks/MOBILELANGUAGE/Objectivec.webp";
import Python from "../../Assets/Images/tech/MobileStacks/MOBILELANGUAGE/Python.webp";
import Reactnative from "../../Assets/Images/tech/MobileStacks/MOBILELANGUAGE/Reactnative.webp";
import AWSMOBILE from "../../Assets/Images/tech/MobileStacks/Cloud&DB/AWSMOBILE.webp";
import Firebase from "../../Assets/Images/tech/MobileStacks/Cloud&DB/Firebase.webp";
import MongodbMob from "../../Assets/Images/tech/MobileStacks/Cloud&DB/MongodbMob.webp";
import MarinaDB from "../../Assets/Images/tech/MobileStacks/Cloud&DB/MarinaDB.webp";
import mysql from "../../Assets/Images/tech/MobileStacks/Cloud&DB/mysql.webp";
import postgresql from "../../Assets/Images/tech/MobileStacks/Cloud&DB/postgresql.webp";
import SQLLite from "../../Assets/Images/tech/MobileStacks/Cloud&DB/SQLLite.webp";
import GIT from "../../Assets/Images/tech/MobileStacks/Cloud&DB/GIT.webp";
import IndustriesWeServe from "../../Components/SubComponents/About/IndustriesWeServe";
import background from "../../Assets/Images/Services/Mobiledev/mOBILEdEVELOPMENTsERVICVES.jpg";
import MainHeader from "../../Components/SubComponents/Header/MainHeader";
import { Helmet } from "react-helmet";

const AppDevelopment = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>Get Expert Mobile App Development Services for All</title>
        <meta name="discription" content="Experience the best in mobile app development by using our knowledgeable services. Customized apps that increase your business's performance. Start now."/>
        <meta name="keywords" content="Mobile App Development" />
        
        <link rel="canonical" href="https://kasperinfotech.com/mobile-app-developmen" />
        

        <meta property="og:title" content="Get Expert Mobile App Development Services for All" />
        <meta property="og:site_name" content="Kasper Infotech" />
        <meta property="og:url" content="https://kasperinfotech.com/mobile-app-development" />
        <meta property="og:description" content="Experience the best in mobile app development by using our knowledgeable services. Customized apps that increase your business's performance. Start now." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://kasperinfotech.com/static/media/security.c84596475727349f23afb026709267cf.svg" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" content="kasperinfotech.com" />
        <meta name="twitter:url" content="https://kasperinfotech.com/mobile-app-development" />
        <meta name="twitter:title" content="Get Expert Mobile App Development Services for All" />
        <meta name="twitter:description" content="Experience the best in mobile app development by using our knowledgeable services. Customized apps that increase your business's performance. Start now." /> 
        <meta name="twitter:image" content="https://kasperinfotech.com/static/media/security.c84596475727349f23afb026709267cf.svg" />

      </Helmet>
      
      <div className="HideServiceList">
        <MainHeader
          background={background}
          mainheading="Top Mobile App Development Company"
          subHeading="Looking for a custom Mobile App Development Company? Worry, no more, and shake hands with us for unique mobile app development. Our experts mingle technologies and agile methodologies for assuring seamless mobile app development."
        />
        <ServiceMainSection
          highlights="OUR SERVICES"
          highlightsDouble="SERVICES"
          heading="Revolutionize your digital presence with exceptional Mobile App Development Services."
        />
        <div className="row container m-auto">
          <TwoPartGridLeft
            title="UI/ UX Design"
            Discription="We follow strategies for developing unique mobile applications, upgrading your business level creating unique mobile app designs. Make your digital presence online through our mobile app development agency."
            ImageHandle={UIUXMOBILE}
          />
          <TwoPartGridRight
            title="iOS APP DEVELOPMENT"
            Discription="Make optimum utilization of programming languages like Swift and Objective-C, you remain updated with iOS development. Our professional mobile app developer frame the apps for Apple's iOS platform. Expand your business with iOS apps now."
            ImageHandle={IOS}
          />
          <TwoPartGridLeft
            title="ANDROID APP DEVELOPMENT"
            Discription="Our Android Apps use two major programming languages like Java and Kotlin. Acquiring expertise in developing Android Apps, Kasper,  Mobile App Development Company creates multiple Hardware and Software for efficiency in app development."
            ImageHandle={Android}
          />
          <TwoPartGridRight
            title="CROSS-PLATFORM APP DEVELOPMENT"
            Discription="We design Mobile apps for both iOS and Android platforms.The cross-platform app development saves both time and money.  We resist on frameworks like React Native, Flutter, or Xamarin to achieve this. Through cross-platform programs with confidence."
            ImageHandle={Crossplatform}
          />
          <TwoPartGridLeft
            title="BACKEND DEVELOPMENT"
            Discription="A backend server is necessary for several mobile app services to manage user authentication, data storage, and other features. Backend Development constructs databases, servers and APIs.  It has to do with writing code for development."
            ImageHandle={Backenddev}
          />
          <TwoPartGridRight
            title="QUALITY ASSURANCE AND TESTING"
            Discription="A proactive approach towards leveling up your business is Quality Assurance and Testing. Our Mobile App Development Services built apps to check the quality assurance and testing. With quality assurance you will lead towards business success."
            ImageHandle={qualityassuarnce}
          />
          <TwoPartGridLeft
            title="MAINTENANCE AND UPDATES"
            Discription="It is necessary to keep a check on the maintenance of mobile app services while rectifying the errors.It is a sheer necessity of your business to modify, keep updating the mobile app. This is important to gain the benefit of the latest features."
            ImageHandle={mobilemaintanance}
          />
          <TwoPartGridRight
            title="PROGRESSIVE WEB APPS"
            Discription="Through web browsers, our progressive app developers provide an app-like experience. On compatible devices, Progressive Web Apps (PWAs) help you have a native-like experience. PWAs enable safe, undetectable, linkable, & simple installation."
            ImageHandle={webapp}
          />
          <TwoPartGridLeft
            title="SECURITY"
            Discription="One of the major concerns of businesses is safety and security. Safety will help you protect your website from any fraud or loss. Some examples are state-of-the-art encryption, robust authentication protocols, and thorough risk exposure assessments."
            ImageHandle={security}
          />
        </div>
        <IndustriesWeServe />
        <ServiceMainSection
          highlights="Our Development Process"
          highlightsDouble="PROCESS"
          heading="Step-by-Step Procedure to rely on Quality Assurance"
        />
        <div className="row container m-auto">
          <TwoPartGridLeft
            title="Idea & Development"
            Discription="Mobile App Development Agency emphasizes transforming your idea into reality through a mobile app. In this competitive marketplace, we develop extraordinary mobile apps. We learn your innovative app ideas and create mobile android apps."
            ImageHandle={Idea}
          />
          <TwoPartGridRight
            title="Design & Prototyping"
            Discription="Knowing the different types of designs that are trends within the market. We create strategies for developing unique mobile android apps designs and implement them. Including the must-have capabilities of an app, we add on multiple new features."
            ImageHandle={Design}
          />
          <TwoPartGridLeft
            title="Development"
            Discription="Kasper cornerstones on developing unique mobile apps representing your business globally. We believe in innovation and development. Taking into consideration all your must-have features within the app. We customize mobile apps knowing your needs."
            ImageHandle={MobileDevelopment}
          />
          <TwoPartGridRight
            title="Testing and Quality Assurance"
            Discription="One of the most important steps of App development is testing and quality assurance.It includes performance, security, and functionality checks. All problems are fixed in  Mobile App Development Services to ensure a positive customer experience."
            ImageHandle={TestingQuality}
          />
          <TwoPartGridLeft
            title="Deployment"
            Discription="We are the best app developers ready for release once it proves to be error-free. We make sure your software satisfies all requirements for a successful release while guiding you through the app store submission procedure."
            ImageHandle={DeploymentApp}
          />
          <TwoPartGridRight
            title="Post-Launch Support"
            Discription="As and when your mobile app is launched, we assure you that our customer service support is available 24*7. Hence, in this manner, if you face any issues while running the mobile app, we resolve them immediately. Leading to your business growth."
            ImageHandle={LaunchService}
          />
        </div>
        <br />
        <ServiceMainSection
          highlights="Technologies we use"
          highlightsDouble="TECHNOLOGY"
          heading="Our excellence, mingled with these technologies, permits us to craft mobile applications that are reliable, adaptable, and creative precisely to meet your business requirements. "
        />
        <div className="Tech-images container m-auto">
          <h3 className="text-center text-uppercase fw-bolder mt-4">UI/UX</h3>
          <hr style={{ opacity: "10%" }} className="w-25 m-auto" />
          <div className="row w-flex justify-content-center text-success gap-3">
            <img
              title="Adobe Illustrator"
              style={{ width: "80px", height: "60px" }}
              src={Illustrator}
              alt="Illustrator"
            />
            <img
              title="Sketch"
              style={{ width: "80px", height: "60px" }}
              src={Sketch}
              alt="Sketch"
            />
            <img
              title="MUI"
              style={{ width: "80px", height: "60px" }}
              src={MUI}
              alt="MUI"
            />
            <img
              title="Figma"
              style={{ width: "80px", height: "60px" }}
              src={FIGMA}
              alt="FIGMA"
            />
            <img
              title="Swift UI"
              style={{ width: "80px", height: "60px" }}
              src={SwiftUi}
              alt="Swift Ui"
            />
            <img
              title="UiKIT"
              style={{ width: "80px", height: "60px" }}
              src={UiKIT}
              alt="UiK IT"
            />
            <img
              title="Apple UI"
              style={{ width: "80px", height: "60px" }}
              src={AppleUI}
              alt="Apple UI"
            />
          </div>
        </div>
        <div className="Tech-images container m-auto">
          <h3 className="text-center text-uppercase fw-bolder mt-4">
            Development
          </h3>
          <hr style={{ opacity: "10%" }} className="w-50 m-auto" />
          <div className="row w-flex justify-content-center text-success gap-3">
            <img
              title="Android Studio"
              style={{ width: "80px", height: "60px" }}
              src={AndroidStudio}
              alt="Android Studio"
            />
            <img
              title="C#"
              style={{ width: "80px", height: "60px" }}
              src={CSharp}
              alt="CSharp"
            />
            <img
              title="Flutter"
              style={{ width: "80px", height: "60px" }}
              src={Flutter}
              alt="Flutter"
            />
            <img
              title="Nodejs"
              style={{ width: "80px", height: "60px" }}
              src={Nodejs}
              alt="Nodejs"
            />
            <img
              title="Python"
              style={{ width: "80px", height: "60px" }}
              src={Python}
              alt="Python"
            />
            <img
              title="Objective-C"
              style={{ width: "80px", height: "60px" }}
              src={Objectivec}
              alt="Python"
            />
            <img
              title="React Native"
              style={{ width: "80px", height: "60px" }}
              src={Reactnative}
              alt="React native"
            />
          </div>
        </div>
        <div className="Tech-images container m-auto">
          <h3 className="text-center text-uppercase fw-bolder mt-4 mb-1">
            Cloud & Database
          </h3>
          <hr style={{ opacity: "10%" }} className="w-75 m-auto" />
          <div className="row w-flex justify-content-center text-success gap-3">
            <img
              title="AWS"
              style={{ width: "80px", height: "60px" }}
              src={AWSMOBILE}
              alt="AWS MOBILE"
            />
            <img
              title="Firebase"
              style={{ width: "80px", height: "60px" }}
              src={Firebase}
              alt="Firebase"
            />
            <img
              title="MongoDB"
              style={{ width: "80px", height: "60px" }}
              src={MongodbMob}
              alt="MongodbMob"
            />
            <img
              title="MarinaDB"
              style={{ width: "80px", height: "60px" }}
              src={MarinaDB}
              alt="Marina DB"
            />
            <img
              title="MySQL"
              style={{ width: "80px", height: "60px" }}
              src={mysql}
              alt="mysql"
            />
            <img
              title="PostgreSQL"
              style={{ width: "80px", height: "60px" }}
              src={postgresql}
              alt="postgresql"
            />
            <img
              title="SQLLite"
              style={{ width: "80px", height: "60px" }}
              src={SQLLite}
              alt="SQLLite"
            />
            <img
              title="GIT"
              style={{ width: "80px", height: "60px" }}
              src={GIT}
              alt="GIT"
            />
          </div>
        </div>
        {/* extra section */}
        <div className="row container m-auto mt-4">
          {/* <ServiceMainSection
            highlights="How Mobile App Development Company will boost your business? "
            highlightsDouble="TECHNOLOGY"
            heading="Whatever the competition, Mobile App Development Company helps to boost the amount of sales while also maximizing client reach. At Kasper Infotech, we provide functionality to the mobile app that most people would not have thought about. As those in charge of mobile app services expand, new pressures are placed on firms to remain competitive in their industry. App Development provides prospects for business growth and expansion that would not have been possible without it."
          /> */}
        </div>
      </div>
    </>
  );
};

export default AppDevelopment;
