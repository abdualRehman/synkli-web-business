import { useState } from "react";
const ServicesCards = ({ toggleAddService }) => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Service 1",
      isActive: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      length: "1 hour",
      charges: "$50",
    },
    {
      id: 2,
      title: "Service 2",
      isActive: false,
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      length: "45 minutes",
      charges: "$40",
    },
    {
      id: 3,
      title: "Service 3",
      isActive: true,
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      length: "30 minutes",
      charges: "$30",
    },
    {
      id: 4,
      title: "Service 4",
      isActive: true,
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      length: "1.5 hours",
      charges: "$70",
    },
    {
      id: 5,
      title: "Service 5",
      isActive: false,
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
      length: "2 hours",
      charges: "$90",
    },
    {
      id: 6,
      title: "Service 6",
      isActive: true,
      description:
        "Nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      length: "1 hour",
      charges: "$60",
    },
  ]);
  const [serviceInView, setServiceInView] = useState(services[0]);

  const handleServiceInView = (index) => {
    const service = services[index];
    setServiceInView(service);
  };

  return (
    <div className="services-cards mx-10 mt-5">
      <div className="services-list p-3 relative">
        <button
          onClick={toggleAddService}
          className="absolute right-3 top-3 cursor-pointer add-service-btn"
        >
          Add Service
        </button>
        <div className="service-title">Services</div>
        {services.map((service, index) => (
          <div
            onClick={() => handleServiceInView(index)}
            className="service-container cursor-pointer shadow mt-3 rounded-md p-3"
            key={index}
          >
            <div className="service-inner-title"> {service.title} </div>
            <div className="service-description mt-1">
              {" "}
              {service.description}{" "}
            </div>
            <div className="service-strip flex justify-between px-5 mt-2">
              <div className="flex items-center">length : {service.length}</div>
              <div className="flex items-center">
                IsActive : {service.isActive ? "Yes" : "No"}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="single-service p-5">
        <div className="service-title"> {serviceInView.title} </div>
        <div className="charges flex justify-between my-2">
          <div>Consultation Charges</div>
          <div>{serviceInView.charges}</div>
        </div>
        <div className="service-strip flex justify-between px-5 mt-2">
          <div className="flex items-center">
            length : {serviceInView.length}
          </div>
          <div className="flex items-center">
            IsActive : {serviceInView.isActive ? "Yes" : "No"}
          </div>
        </div>
        <div className="service-inner-title mt-2"> Details </div>
        <div className="single-description mt-1">
          {serviceInView.description.repeat(10)}
        </div>
      </div>
    </div>
  );
};

export default ServicesCards;
