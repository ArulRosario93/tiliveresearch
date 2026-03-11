
import React from "react";
import './NavBarContent.css';

const NavBarContentAbsolute = ({ visibility, funcIn, funcOut }) => {
    return (
        <div className="NavBarContentAbsolute" onMouseEnter={visibility? funcIn: null} onMouseLeave={funcOut} style={{visibility: visibility, display: visibility ? 'block': 'none', opacity: visibility ? 1: 0}}>
            
            <div className="NavBarContentAbsoluteContainer">

                <div className="NavBarContentAbsoluteItem">

                    <p className="NavBarContentAbsoluteItemText">MetaVerse Market</p>
                    <div className="NavBarContentAbsoluteIcon">
                        
                    </div>

                </div>


                <div className="NavBarContentAbsoluteItem">

                    <p className="NavBarContentAbsoluteItemText">Technology</p>
                    <div className="NavBarContentAbsoluteIcon">
                        
                    </div>

                </div>

                <div className="NavBarContentAbsoluteItem">

                    <p className="NavBarContentAbsoluteItemText">Bio Technology</p>
                    <div className="NavBarContentAbsoluteIcon">

                    </div>

                </div>
                <div className="NavBarContentAbsoluteItem">

                    <p className="NavBarContentAbsoluteItemText">Bio Technology</p>
                    <div className="NavBarContentAbsoluteIcon">

                    </div>

                </div>
                <div className="NavBarContentAbsoluteItem">

                    <p className="NavBarContentAbsoluteItemText">Bio Technology</p>
                    <div className="NavBarContentAbsoluteIcon">

                    </div>

                </div>
            </div>
            <div className="NavBarContentAbsoluteContainer">

                <div className="NavBarContentAbsoluteItem">

                    <p className="NavBarContentAbsoluteItemText">Technology</p>
                    <div className="NavBarContentAbsoluteIcon">

                    </div>

                </div>

                <div className="NavBarContentAbsoluteItem">

                    <p className="NavBarContentAbsoluteItemText">Bio Technology</p>
                    <div className="NavBarContentAbsoluteIcon">

                    </div>

                </div>
                <div className="NavBarContentAbsoluteItem">

                    <p className="NavBarContentAbsoluteItemText">Bio Technology</p>
                    <div className="NavBarContentAbsoluteIcon">

                    </div>

                </div>
                <div className="NavBarContentAbsoluteItem">

                    <p className="NavBarContentAbsoluteItemText">Bio Technology</p>
                    <div className="NavBarContentAbsoluteIcon">

                    </div>

                </div>
            </div>

        </div>
    )
}

export default NavBarContentAbsolute;