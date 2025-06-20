import React, { useEffect } from "react";
import ServiceMainSection from "../../Components/SubComponents/ServiceComponents/ServiceSubComponents/ServiceMainSection";
import ContentMarketing from "../../Assets/Images/Services/DegitalMarketing/ContentMarketing.svg";
import Conversion from "../../Assets/Images/Services/DegitalMarketing/Conversion.svg";
import EmailSEO from "../../Assets/Images/Services/DegitalMarketing/EmailSEO.svg";
import PPCADVER from "../../Assets/Images/Services/DegitalMarketing/PPCADVER.svg";
import Reporting from "../../Assets/Images/Services/DegitalMarketing/Reporting.svg";
import SEOSearch from "../../Assets/Images/Services/DegitalMarketing/SEOSearch.svg";
import SocialMedia from "../../Assets/Images/Services/DegitalMarketing/SocialMedia.svg";
import analyst from "../../Assets/Images/Services/DegitalMarketing/analyst.svg";
import ContentCreator from "../../Assets/Images/Services/DegitalMarketing/ContentCreator.svg";
import EmailMarketing from "../../Assets/Images/Services/DegitalMarketing/EmailMarketing.svg";
import onlinemarketing from "../../Assets/Images/Services/DegitalMarketing/onlinemarketing.svg";
import paidadvertising from "../../Assets/Images/Services/DegitalMarketing/paidadvertising.svg";
import SocialmediaMarketing from "../../Assets/Images/Services/DegitalMarketing/SocialmediaMarketing.svg";
import {
  TwoPartGridLeft,
  TwoPartGridRight,
} from "../../Components/SubComponents/ServiceComponents/ServiceSubComponents/TwoPartGrid";
import IndustriesWeServe from "../../Components/SubComponents/About/IndustriesWeServe";
import WhyUsComp from "../../Components/SubComponents/ServiceComponents/ServiceSubComponents/WhyUsComp";
import MainHeader from "../../Components/SubComponents/Header/MainHeader";
import background from "../../Assets/Images/Services/DegitalMarketing/DIGITALMARKETINGBACKGROUND.jpg";
import { Helmet } from "react-helmet";

const DigitalMarketing = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>Best Digital Marketing Agency for Productive Development</title>
        <meta name="discription" content="Transform your business with our innovative digital marketing agency. We concentrate on methods that enhance your brand and provide outcomes." />
        <meta name="keywords" content="Digital Marketing Agency" />
        <link rel="canonical" href="https://kasperinfotech.com/digital-marketing-agency" />
        
        <meta property="og:title" content="Best Digital Marketing Agency for Productive Development" />
        <meta property="og:site_name" content="Kasper Infotech" />
        <meta property="og:url" content="https://kasperinfotech.com/digital-marketing-agency" />
        <meta property="og:description" content="Transform your business with our innovative digital marketing agency. We concentrate on methods that enhance your brand and provide outcomes." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://kasperinfotech.com/static/media/SocialMedia.05e761d80342a45c70e7b7b1c69b3792.svg" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" content="kasperinfotech.com" />
        <meta name="twitter:url" content="https://kasperinfotech.com/cms-development-services" />
        <meta name="twitter:title" content="Best Digital Marketing Agency for Productive Development" />
        <meta name="twitter:description" content="Transform your business with our innovative digital marketing agency. We concentrate on methods that enhance your brand and provide outcomes." /> 
        <meta name="twitter:image" content="https://kasperinfotech.com/static/media/SocialMedia.05e761d80342a45c70e7b7b1c69b3792.svg" />
      </Helmet>

      <MainHeader
        background={background}
        mainheading="Grow Your Brand with the Top Digital Marketing Agency"
        subHeading="Are you a business owner hoping for rapid growth in a limited amount of time? Kasper Infotech, Best Digital Marketing Agency provides you with limitless features of business expansion worldwide. Boost your digital presence through top-tier Digital Marketing."
      />
      <ServiceMainSection
        highlights="OUR SERVICES"
        highlightsDouble="SERVICES"
        heading="Businesses must use Digital Marketing Services in the dynamic, current 21st-century environment of a strong online presence."
      />
      <div className="row container m-auto">
        <TwoPartGridLeft
          title="Search Engine Optimization (SEO)"
          Discription=""
          ImageHandle={SEOSearch}
          list1="With the help of Search Engine Optimization, websites boost their visibility on google, Microsoft Bing and other search engines. More the visibility of your website, the more is the traffic generated and in this manner, you increase your business growth, success and profits."
          // list2="Increase organic traffic and generate leads."
          // list3="Stay ahead of your competitors with ongoing SEO efforts."
          bracket1="💠"
          bracket2="💠"
          bracket3="💠"
        />
        <TwoPartGridRight
          title="PAY-PER-CLICK (PPC) ADVERTISING "
          Discription=""
          ImageHandle={PPCADVER}
          list1="The term itself says “Pay-Per-Click” . Hence, advertisers get the cost when the users click over their ads each and every time. It is a strategy of driving traffic to your website and increasing your business reach in an easy manner. Optimized PPC is remunerative & grabs instant traffic."
          // list2="Reach potential customers with the right ads at the right time. "
          // list3="Maximize your return on investment (ROI) with continuous optimization."
          bracket1="💠"
          bracket2="💠"
          bracket3="💠"
        />
        <TwoPartGridLeft
          title="SOCIAL MEDIA MARKETING"
          Discription=""
          ImageHandle={SocialMedia}
          list1="Effectively utilize social media platforms for acquiring an overpowering online presence. With the help of Digital Marketing Agency, it is easy to interact with customers to develop brands, enhance sales and drive website traffic. And, convert your visitors into customers."
          // list2="Better content helps you to connect with your users easily."
          // list3="Use sponsored advertising to reach more people."
          bracket1="💠"
          bracket2="💠"
          bracket3="💠"
        />
        <TwoPartGridRight
          title="CONTENT MARKETING"
          Discription=""
          ImageHandle={ContentMarketing}
          list1="Invest in strategic marketing methods of Digital Marketing Agency providing high-quality content. Outstanding content is the cornerstone of making a website stand out from the first link on Google. Hence, 'content is king' and plays an important role in business development."
          // list2="Boost your business' image as an industry leader. "
          // list3="Drive traffic and generate leads with strategic content."
          bracket1="💠"
          bracket2="💠"
          bracket3="💠"
        />
        <TwoPartGridLeft
          title="EMAIL MARKETING"
          Discription=""
          ImageHandle={EmailSEO}
          list1="Powerful Digital Marketing Services to make your customers informed from time to time with offers, discounts & latest updates. Emails are the most effective ways of developing better customer relationships &  driving sales. With an email, you can provide necessary information."
          // list2="Create leads and maintain customer relationships."
          // list3="Monitor email performance for ongoing improvement."
          bracket1="💠"
          bracket2="💠"
          bracket3="💠"
        />
        <TwoPartGridRight
          title="CONVERSION RATE OPTIMISATION (CRO)"
          Discription=""
          ImageHandle={Conversion}
          list1="Content Enhancement, split testing and workflow improvements are all a part of conversions over a website. Conversion Rate Optimization leads towards converting visitors into customers over a website through the right strategy. It provides qualified leads, expanded revenue."
          // list2="Improve user experience, forms and landing pages."
          // list3="Continuously develop strategies based on data and user behaviour."
          bracket1="💠"
          bracket2="💠"
          bracket3="💠"
        />
        <TwoPartGridLeft
          title="ANALYTICS AND REPORTING"
          Discription=""
          ImageHandle={Reporting}
          list1="Ensure to know the facts and figures of Digital Marketing Agency. And, then analyze the expansion of business growth. Accordingly make the reports seeking into consideration each and everything related with the strategies of your business. Hence, you can keep a check. "
          // list2="Make informed decisions based on data."
          // list3="Track ROI and monitor the effectiveness of your marketing campaigns."
          bracket1="💠"
          bracket2="💠"
          bracket3="💠"
        />
      </div>
      <br />
      <br />
      <ServiceMainSection
        highlights="WHY CHOOSE US? "
        highlightsDouble="WHY CHOOSE US?"
        heading="Why is Kasper Infotech the best choice for getting selected as a Digital Marketing Company? "
      />
      <WhyUsComp
        whytext1="Digital Marketing Agencies acquiring 10 years of excellence boosting the online presence of businesses of all types and all sizes across the world."
        whytext2="Our professional team of experts develop strategies specifically tailored for your requirements and are up to date on the latest technology advancements."
        whytext4="Our Digital Marketing Agency offers quality at affordable prices without breaking your budget & providing efficient and effective services. "
        whytext3="We embibe to add revenue to your business in spite of the competitive marketplace. Our digital marketing team has unique ideas to promote your business."
      />
      <IndustriesWeServe />
      <ServiceMainSection
        highlights="OUR DIGITAL MARKETING PROCESS"
        highlightsDouble="PROCESS"
        heading="KASPER INFOTECH, a Digital Marketing Agency provides solutions to businesses understanding their utmost sheer requirements.We make your business run exceedingly well through our social media strategies and game-changing ideas."
      />
      <br />
      <div className="row container m-auto HideServiceList">
        <TwoPartGridLeft
          title="STRATEGY DEVELOPMENT"
          Discription="Digital Marketing Agencies work with you to get the awareness of what your business goals are. Understanding the target audience. Outlining the channels and methods, we will make sure to get your desired results. We create solutions as per your business requirements."
          ImageHandle={onlinemarketing}
        />
        <TwoPartGridRight
          title="CONTENT CREATION"
          Discription="Content is king. Creating high-quality content effectively helps you to get a huge audience while targeting the right set of customers. Content attracts multiple visitors over a website. This is helpful to build relationships with potential customers and drive humongous sales."
          ImageHandle={ContentCreator}
        />
        <TwoPartGridLeft
          title="SEO"
          Discription="A necessary part of digital marketing is Search Engine Optimization (SEO). Augmenting websites for search engine rankings boosts their online visibility and reinforces organic traffic, that in turn optimizes a brand’s online presence and supports consumer interaction."
          ImageHandle={SocialMedia}
        />
        <TwoPartGridRight
          title="SOCIAL MEDIA MARKETING"
          Discription="Ensure that you use social media tools for reaching the maximum number of customers.Digital Marketing Agencies sends them regular emails with valuable content, special offers and updates regarding your business. The social media world is transforming businesses."
          ImageHandle={SocialmediaMarketing}
        />
        <TwoPartGridLeft
          title="EMAIL MARKETING"
          Discription="Our professionals manage an email list of your existing and potential consumers. We send them emails on a regular basis with interesting information, exclusive offers, & updates. Emailing the lists on a regular basis allows you to provide customers with special offers & information. "
          ImageHandle={EmailMarketing}
        />
        <TwoPartGridRight
          title="PAID ADVERTISING "
          Discription="Digital Marketing Agency runs ads on websites, social media platforms, and other digital channels. It can be a low-cost way of reaching a broad audience and marketing businesses and services. With the help of advertising, you can take your business towards great heights. "
          ImageHandle={paidadvertising}
        />
        <TwoPartGridLeft
          title="REPORTING AND ANALYTICS"
          Discription="The most important process is Analyzing and Reporting all the necessary data. The strategy of refining the data according to your business requirements is helpful. It is useful in keeping a check over the whole data along with all the needed information in a systematic manner."
          ImageHandle={analyst}
        />
      </div>
      {/* extra section */}
      <br />
      {/* <ServiceMainSection
        highlights="Future scope of Digital Marketing Agency"
        highlightsDouble="Future"
        heading="Are you someone who is tired of getting monthly sales hikes? If yes, then you surely need to connect with us since we are one of the Best Digital Marketing Agencies. Now, stand out from the crowd and rule the business world. Through Digital Marketing Agency, you can cater your business worldwide. No matter how hard the competitive marketplace is, we make sure to provide you excellent Digital Marketing Services. People post COVID opted for social distancing however we recommend you to be socially active in the digital landscape. Kasper develops creative websites that drive traffic for unstoppable success of your business. The Internet turns out to become the digital square of the business town."
      /> */}
    </>
  );
};

export default DigitalMarketing;
