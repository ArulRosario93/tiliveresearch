import React from "react";
import './DepartmentContainer.css';
const DepartmentContainer = ({ key, department, handleClick }) => { 

    return (
        <div key={key} onClick={() => handleClick(department.camelCased)} className="DepartmentContainer">

            <div className="DepartmentContainerAbsolute">

                <p className="DepartmentContainerAbsolutePara">{department.name}</p>

            </div>
                {department.icon}

        </div>
    );
}

export default DepartmentContainer;