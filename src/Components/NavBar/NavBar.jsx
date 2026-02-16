import React, { useState } from "react";
import "./NavBar.css";
import NavBarContentAbsolute from "./NavBarContent/NavBarContent";
import NavBarSearchBar from "./NavBarContent/NavBarSearchBar/NavBarSearchBar";

const NavBar = () => {

    const navItem = ['Reports', 'About Us'];

    const [navHover, setNavHover] = useState('');

    const handleMouseOver = (e) => {
        if(e.target.innerText == 'About Us'){
            return;
        }
        setNavHover(e.target.innerText);
    }

    const handleMouseLeave = (e) => {
        setNavHover('');
    }

    return (
        <div className="NavBar">

            <div className="NavBarLogo">
                logo
            </div>

            <div className="NavBarContent">
                {/* <NavBarSearchBar /> */}
                {
                    navItem.map((item, i) => {
                        return (
                            <p key={i} className="NavBarContentItem" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseOver}>{item}</p>
                        )
                    })
                }

                <NavBarContentAbsolute funcIn={handleMouseOver} funcOut={handleMouseLeave} visibility={navHover ? true : false}  />

            </div>

        </div>
    );
}

export default NavBar;