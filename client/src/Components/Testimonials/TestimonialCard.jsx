import Carousel from "react-bootstrap/Carousel";
// import male1 from "../../Assets/Images/Universal/male1.jpg";
// import male2 from "../../Assets/Images/Universal/male2.jpg";
// import male3 from "../../Assets/Images/Universal/male3.jpg";
// import male4 from "../../Assets/Images/Universal/male4.jpg";
// import female2 from "../../Assets/Images/Universal/female2.jpg";
import "./Testimonials.css";
import ServiceMainSection from "../SubComponents/ServiceComponents/ServiceSubComponents/ServiceMainSection";

const TestimonialCard = () => {
  const ClientsTestimonials = [
    {
      // Profile: male1,
      ProfileName: "Shashi Kumar Jha",
      Comment:
        "I am quite impressed  with the digital marketing services provided by Kasper Infotech! Their team's expertise and dedication delivered exceptional results for my business.",
      Company: "Kasper Infotech Pvt Ltd",
      Designation: "Frontend Developer",
    },
    {
      // Profile: male2,
      ProfileName: "Afroz Zeelani",
      Comment:
        " nemo dolorum officiis incidunt maiores explicabo adipisci. Eligendi eum repudiandae ullam itaque iusto sapiente harum obcaecati amet provident? ",
      Company: "Kasper Infotech Pvt Ltd",
      Designation: "Frontend Developer",
    },
    {
      // Profile: male3,
      ProfileName: "Amar Kumar",
      Comment:
        " nemo dolorum officiis incidunt maiores explicabo adipisci. Eligendi eum repudiandae ullam itaque iusto sapiente harum obcaecati amet provident? ",
      Company: "Kasper Infotech Pvt Ltd",
      Designation: "Backend Developer",
    },
    {
      // Profile: male4,
      ProfileName: "Ashish Kumar",
      Comment:
        " nemo dolorum officiis incidunt maiores explicabo adipisci. Eligendi eum repudiandae ullam itaque iusto sapiente harum obcaecati amet provident? ",
      Company: "Kasper Infotech Pvt Ltd",
      Designation: "Manager",
    },
    {
      // Profile: male2,
      ProfileName: "Kishor Kumar",
      Comment:
        " nemo dolorum officiis incidunt maiores explicabo adipisci. Eligendi eum repudiandae ullam itaque iusto sapiente harum obcaecati amet provident? ",
      Company: "Kasper Infotech Pvt Ltd",
      Designation: "Director",
    },
    {
      // Profile: female2,
      ProfileName: "Ilma Sheikh",
      Comment:
        " nemo dolorum officiis incidunt maiores explicabo adipisci. Eligendi eum repudiandae ullam itaque iusto sapiente harum obcaecati amet provident? ",
      Company: "Kasper Infotech Pvt Ltd",
      Designation: "Content Writer",
    },
  ];

  return (
    <div className="my-0 py-5 testimonial-mainarea">
      <ServiceMainSection highlights="CLIENT TESTIMONIALS" highlightsDouble="TESTIMONIALS"/>
      <Carousel className="testimonial-Carousel  rounded-5  py-0 container">
      {ClientsTestimonials.map((person) => (
        <Carousel.Item className="0">
          <div className="row">
            {/* <img className="d-block" src={person.Profile} alt="Fourth slide" /> */}
            <div className="col-12 d-flex flex-column text-center">
              
              <h6 className="w-75 m-auto text-center text-bold commentclient ">
                {person.Comment}
              </h6>
              <h5 className="text-uppercase fw-bolder text-success mt-3">
                {person.ProfileName}
              </h5>
              <h6 className="text-bold">{person.Designation}</h6>
              <p className="text-bolder mb-5">{person.Company}</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  );
};

export default TestimonialCard;
