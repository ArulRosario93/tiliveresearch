import React from "react";
import "./ThirdContainerService.css";

const ThirdContainerService = ({ services }) => {

    return (
        <div className="ThirdContainerService">
            {
                services.map((item, i) => {
                    return(
                        <p key={i} className="ThirdContainerServicePara">{item}</p>
                    )
                })
            }
        </div>
    );
}

export default ThirdContainerService;