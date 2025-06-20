import React, { useEffect } from "react";
import ServiceMainSection from "../../Components/SubComponents/ServiceComponents/ServiceSubComponents/ServiceMainSection";
import {
  TwoPartGridLeft,
  TwoPartGridRight,
} from "../../Components/SubComponents/ServiceComponents/ServiceSubComponents/TwoPartGrid";
import ITESAppImages from "../../Assets/Images/Industries/ITES/ITESAppImages.webp";
import DataEntry from "../../Assets/Images/Industries/ITES/DataEntry.svg";
import CustomerSupport from "../../Assets/Images/Industries/ITES/CustomerSupport.svg";
import Ecommerce from "../../Assets/Images/Industries/ITES/Ecommerce.svg";
import UXUIDesign from "../../Assets/Images/Industries/ITES/UXUIDesign.svg";
import Cybersecurity from "../../Assets/Images/Industries/ITES/Cybersecurity.svg";
import CloudComputing from "../../Assets/Images/Industries/ITES/CloudComputing.svg";
import AgileDevelopment from "../../Assets/Images/Industries/ITES/AgileDevelopment.svg";
import DevOps from "../../Assets/Images/Industries/ITES/DevOps.svg";
import CloudAdoption from "../../Assets/Images/Industries/ITES/CloudAdoption.svg";
import CybersecurityMeasures from "../../Assets/Images/Industries/ITES/CybersecurityMeasures.svg";
import Intelligence from "../../Assets/Images/Industries/ITES/Intelligence.svg";
import Governance from "../../Assets/Images/Industries/ITES/Governance.svg";

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

import TechStacks from "../../Components/SubComponents/TechStacks";
import IndustriesWeServe from "../../Components/SubComponents/About/IndustriesWeServe";
import SingleTools from "../../Components/SubComponents/ServiceComponents/ServiceSubComponents/SingleTools";
import { GiCargoShip, GiReceiveMoney } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";
import { FaCashRegister } from "react-icons/fa6";
import { BiSolidFactory } from "react-icons/bi";
import { PiBooksBold } from "react-icons/pi";
import IndistryHeaderComp from "../../Components/SubComponents/IndustryComponents/IndistryHeaderComp";
import { Helmet } from "react-helmet";
const ITESDevelopment = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>Expert Information Technology Enabled Service for Businesses</title>
        <meta name="discription" content="Boost your business performance with Expert Information Technology Enabled Service. Our products increase productivity and Improve processes." />
        <meta name="keywords" content="Information Technology Enabled Services" />
        <link rel="canonical" href="https://kasperinfotech.com/ITES-service" />

        <meta property="og:title" content="Get Expert Mobile App Development Services for All" />
        <meta property="og:site_name" content="Kasper Infotech" />
        <meta property="og:url" content="https://kasperinfotech.com/ITES-service" />
        <meta property="og:description" content="Experience the best in mobile app development by using our knowledgeable services. Customized apps that increase your business's performance. Start now." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://kasperinfotech.com/static/media/ITESAppImages.c225e32a313bfc8eac0d.webp" />
      </Helmet>
      
      <IndistryHeaderComp
        HeaderImage={ITESAppImages}
        heading="Best Information Technology Enable Services for Business"
        subheading="Kasper Infotech leads the way in Information Technology Services to boost your business worldwide. Empowering businesses that create advanced technology solutions boosting efficiency, productivity and innovation. Experience transformative ITES with us."
      />
      <ServiceMainSection
        highlights="OUR KEY ITES OFFERINGS SERVICES INCLUDE "
        highlightsDouble="SERVICES"
        heading="Kasper Infotech provides a diverse and huge range of solutions personalized to meet the dynamic requirements of businesses around multiple industries."
      />
      <div className="row container m-auto">
        <TwoPartGridLeft
          title="CUSTOM SOFTWARE DEVELOPMENT"
          list1="Tailored Solutions: Information Technology Enable Services Create solutions as per your requirements. We customize each and everything according to your choice."
          list2="Development Approach: We emphasize on effective development to take your business upwards. Analyzing the business problem & providing a solution is our motto."
          ImageHandle={DataEntry}
        />
        <TwoPartGridRight
          title="MOBILE APP DEVELOPMENT"
          list1="Platform Diversity: Executing strategies to stipulate uniform performance and user experience, irrespective of the device or operating system that gets utilized."
          list2="Interactive Design: Precisely craft visualizing interfaces that not only prioritize customer satisfaction but also foster deep engagement and positive interactions."
          ImageHandle={CustomerSupport}
        />
        <TwoPartGridLeft
          title="WEB APPLICATION DEVELOPMENT"
          list1="Responsive Design: Skillfully construct web applications that effortlessly adjust to an assortment of screen sizes and devices for an optimal user experience."
          list2="Scalability and Performance: Expertly design solutions that are capable of efficiently managing user loads and process huge volumes of data seamlessly."
          ImageHandle={Ecommerce}
        />
        <TwoPartGridRight
          title="UX/UI DESIGN SERVICES"
          list1="User Satisfaction: Good UI/UX design develops positive impressions, builds trust, and fosters customer satisfaction. This leads to business expansion with multiple profits."
          list2="Transforms Conversions: Interactive interfaces can boost conversion rates, while improving the bottom line. The unique designs transform apps completely with profits."
          ImageHandle={UXUIDesign}
        />
        <TwoPartGridLeft
          title="CYBERSECURITY SOLUTIONS"
          list1="Security Assessments and Audits: It is necessary to analyze systems, locate vulnerabilities, and evaluate risks to protect against potential attacks."
          list2="Implementing Security: Setting up firewalls, encrypting data, instituting access controls, and taking other precautions are very necessary forms of data protection."
          ImageHandle={Cybersecurity}
        />
        <TwoPartGridRight
          title="CLOUD COMPUTING SERVICES"
          list1="Migration and Integration: ITES Companies Integrates cloud solutions with the Information technology infrastructure that is placed so as to boost scalability."
          list2="Infrastructure and Platforms: Providing a solution that incorporates both Infrastructure as a Service and Platform as a Service into one cohesive offering."
          ImageHandle={CloudComputing}
        />
      </div>
      <IndustriesWeServe />
      <ServiceMainSection
        highlights="Benefits of our ITES"
        highlightsDouble="Benefits"
        heading="The perks include increased efficiency and customer service. Here are some of the key benefits with Information Technology Services"
      />
      <div className="row container m-auto">
        <TwoPartGridLeft
          title="AGILE DEVELOPMENT"
          list1="Iteractive Approach: ITES Breaks down huge projects into more manageable chunks known as the heart of agile software development."
          list2="Cross-Functional Teams: Agile teams get made up of personnel who possess a huge range of talents (involving designers, testers, and developers, among others."
          ImageHandle={AgileDevelopment}
        />
        <TwoPartGridRight
          title="DEVOPS INTEGRATION"
          list1="Continuous Integration (CI): CI is helpful for your team to deliver updates to their customers faster and frequently. Combining tests,it enables code to be dependable."
          list2="Continuous Deployment (CD): The process of deploying code transforms production after successfully passing automated tests gets automated through CD. "
          ImageHandle={DevOps}
        />
        <TwoPartGridLeft
          title="CLOUD ADOPTION"
          list1="Scalability and Flexibility: Cloud Services permit the users to dynamically assign resources to meet their demands in real-time while enhancing flexibility and efficiency."
          list2="Data Security and Compliance: To protect their client’s data, cloud organizations make available extensive security measures and compliance frameworks."
          ImageHandle={CloudAdoption}
        />
        <TwoPartGridRight
          title="CYBERSECURITY MEASURES"
          list1="Security Layers: A favored security measure is to synthesize the usage of intrusion detection systems, firewalls, antivirus software, and encryption techniques."
          list2="Training and Awareness: It is important to educate staff members on the most effective cybersecurity practices as well as the potential threats they approach."
          ImageHandle={CybersecurityMeasures}
        />
        <TwoPartGridLeft
          title="AI & MACHINE LEARNING"
          list1="Predictive Analysis: Use algorithms based on artificial intelligence & machine learning for analyzing huge datasets to draw findings or make recommendations."
          list2="Automating repetitive tasks: While employing AI & ML in the automation of mundane procedures, human resources gets redirected to perform strategic work."
          ImageHandle={Intelligence}
        />
        <TwoPartGridRight
          title="DATA GOVERNANCE AND COMPLIANCE"
          list1="Protecting Data: Putting in place guidelines & procedures to guarantee compliance with applicable data protection regulations (involving GDPR and HIPAA) respectively."
          list2="Data Integrity: Putting in place procedures that would ensure the data’s quality, consistency, and reliability at all times would be a great step in the right direction."
          ImageHandle={Governance}
        />
      </div>
      <br />
      <br />
      <ServiceMainSection
        highlights="TECHNOLOGY AND FRAMEWORKS WE USE"
        highlightsDouble="TECHNOLOGY"
        heading="Our team is enthusiastic and is desirous of scrutinizing the latest programming languages, frameworks, platforms, and databases. We remain updated with the industry’s advancement of ITES."
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
      <br />
      <br />
      <ServiceMainSection
        highlights="OUR IMPACT IN ITES"
        highlightsDouble="Our Impact"
      />
      <br />
      <div className="row container m-auto HideServiceList row-gap-5 mt-5">
        <div className="col-12 col-md-6">
          <SingleTools
            Icons={<MdHealthAndSafety />}
            heading="HEALTHCARE"
            paragraph="TeleMedicine: The use of Information Technology Services legitimizes remote consultations, monitoring and diagnosis, and refining patient outcomes."
          />
        </div>
        <div className="col-12 col-md-6">
          <SingleTools
            Icons={<GiReceiveMoney />}
            heading="FINANCE"
            paragraph="Algorithmic Trading: Information Technology services play an important role in the development and implementation of algorithmic trading strategies, and market efficiencies."
          />
        </div>
        <div className="col-12 col-md-6">
          <SingleTools
            Icons={<FaCashRegister />}
            heading="RETAIL"
            paragraph="Data Analytics: Information Technology services are effectively helpful for retailers to analyze customer data to understand preferences, and optimize inventory."
          />
        </div>
        <div className="col-12 col-md-6">
          <SingleTools
            Icons={<BiSolidFactory />}
            heading="MANUFACTURING"
            paragraph="CAD/CAM Systems: Computer-Aided Design (CAD)and  Computer-Aided Manufacturing (CAM) systems, prototyping and manufacturing process."
          />
        </div>
        <div className="col-12 col-md-6">
          <SingleTools
            Icons={<PiBooksBold />}
            heading="EDUCATION"
            paragraph="E-Learning Platforms:ITES provides growth of online education, while assisting access to educational resources, & remote collaboration tools."
          />
        </div>
        <div className="col-12 col-md-6">
          <SingleTools
            Icons={<GiCargoShip />}
            heading="TRANSPORTATION "
            paragraph="GPS : ITES Companies navigation system power GPS technology, stimulating accurate navigation, route optimization, & real-time tracking in transportation."
          />
        </div>
      </div>
      <br />
      <br />
      {/* <ServiceMainSection
        highlights="FUTURE SCOPE OF ITES"
        highlightsDouble="FUTURE SCOPE OF ITES"
        heading="IT Services have become an important part of modern business strategies, offering multiple benefits like cost savings, access to skilled talent, and flexibility. The future of ITES Companies holds exciting possibilities since technology begins to advance, and businesses evaluate innovative aspects to boost their operations and stay ahead in the dynamic global marketplace."
      /> */}
    </>
  );
};

export default ITESDevelopment;
