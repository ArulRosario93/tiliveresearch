import React from "react";
import "./ThirdContainer.css";
import ThirdContainerService from "./ThirdContainerService/ThirdContainerService";

const ThirdContainer = () => {
  const services = [
    "Business Sector Reports",
    "Full Time Engagement (FTE) Services",
    "Consulting & Strategic Advisory",
  ];

  return (
    <section className="third">
      <div className="third-header">
        <h2>Services We Offer</h2>
        <h4>
          Comprehensive Research. Strategic Insights. Actionable Intelligence.
        </h4>
      </div>

      <div className="third-content">
        <div className="third-graphic">
          <svg width="280" height="280" viewBox="0 0 42 42">
            <circle cx="21" cy="21" r="15.915" fill="#0f1c2e" />

            <circle
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke="#1abc9c"
              strokeWidth="10"
              strokeDasharray="33.33 66.67"
              transform="rotate(-90 21 21)"
            />

            <circle
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke="#f4c542"
              strokeWidth="10"
              strokeDasharray="33.33 66.67"
              strokeDashoffset="-33.33"
              transform="rotate(-90 21 21)"
            />

            <circle
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke="#3498db"
              strokeWidth="10"
              strokeDasharray="33.33 66.67"
              strokeDashoffset="-66.66"
              transform="rotate(-90 21 21)"
            />

            <circle cx="21" cy="21" r="8" fill="#0f1c2e" />
          </svg>
        </div>

        <div className="third-description">
          <p>
            <span className="green">● Business Sector Reports</span>
            In-depth industry analysis delivering comprehensive data, trends,
            and forecasts.
          </p>

          <p>
            <span className="yellow">
              ● Full-Time Engagement (FTE) Services
            </span>
            Dedicated research professionals providing ongoing analytical
            support.
          </p>

          <p>
            <span className="blue">
              ● Consulting & Strategic Advisory
            </span>
            Insight-driven advisory services designed to drive sustainable
            growth.
          </p>
        </div>
      </div>

      <p className="third-footer">
        We integrate thorough research methodologies with extensive industry
        expertise and a consultative approach.
      </p>

      <ThirdContainerService services={services} />
    </section>
  );
};

export default ThirdContainer;  