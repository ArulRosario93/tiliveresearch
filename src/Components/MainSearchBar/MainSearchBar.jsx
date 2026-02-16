import React from "react";
import './MainSearchBar.css';

const MainSearchBar = () => {
    return (
        <div className="MainSearchBar">

            <h2 className="MainSearchBarHeader">Market Reports & Statistics</h2>

            <div className="MainSearchBarInput">
                <input className="MainSearchBarInputInp" type="text" placeholder="Search AeroSpace" />
                <div className="MainSearchBarInputSearchBtn">
                    <p className="MainSearchBarInputSearchBtnText">Search</p>
                </div>
            </div>

            <div className="MainSearchBarFavourite">

                <p className="MainSearchBarFavouriteHeader">Our Favourites: </p>
                <p className="MainSearchBarFavouriteItem">Bio Technology</p>
                <p className="MainSearchBarFavouriteItem">Clinical Diagnostics</p>
                <p className="MainSearchBarFavouriteItem">Semiconductors</p>

            </div>

        </div>
    );
}

export default MainSearchBar;