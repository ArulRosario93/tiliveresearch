
import React from "react";
import './NavBarSearchBar.css'
import SearchIcon from '@mui/icons-material/Search';

const NavBarSearchBar = () => {
    return (
        <div className="NavBarSearchBar">
            <input className="NavBarSearchBarInp" type="text" placeholder="Search Aerospace" />

            <div className="NavBarSearchBarBtn">
                <SearchIcon className="NavBarSearchBarBtnIcon" />
            </div>
        </div>
    );
}

export default NavBarSearchBar;