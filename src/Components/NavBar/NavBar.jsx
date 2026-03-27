import React, { useState } from "react";
import "./NavBar.css";
import { useNavigate } from 'react-router';
import NavBarContentAbsolute from "./NavBarContent/NavBarContent";
import NavBarSearchBar from "./NavBarContent/NavBarSearchBar/NavBarSearchBar";
import logo from "../../assets/mediumsmall.png";

const NavBar = () => {

    const navItem = ['Reports', 'About Us', "Press Release", "Blogs"];
    const navigate = useNavigate();

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

    const handleNavigatetoReports = () => {
        navigate('/reports/')
    }
    const handleNavigatetoAboutUs = () => {
        navigate('/aboutus/')
    }

    return (
        <div className="NavBar">

            <div className="NavBarLogo">
                <img src={logo} alt="" srcset="" />
            </div>

            <div className="NavBarContent">
                {/* <NavBarSearchBar /> */}
                {
                    navItem.map((item, i) => {
                        return (
                            <p key={i} className="NavBarContentItem" onClick={item == "Reports" ? handleNavigatetoReports : handleNavigatetoAboutUs} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseOver}>{item}</p>
                        )
                    })
                }

                <NavBarContentAbsolute funcIn={handleMouseOver} funcOut={handleMouseLeave} visibility={navHover ? true : false}  />

            </div>

        </div>
    );
}

export default NavBar;