import React from "react";
import './HomePage.css';
import NavBar from "../../Components/NavBar/NavBar";
import MainSearchBar from "../../Components/MainSearchBar/MainSearchBar";
import FootBar from "../../Components/FootBar/FootBar";
import FirstContainer from "./FirstContainer/FirstContainer";
import SecondContainer from "./SecondContainer/SecondContainer";

const HomePage = () => {
    return (
        <div className="HomePage">

            <NavBar />

            {/* <MainSearchBar /> */}

            <FirstContainer />
            <SecondContainer />
            <FootBar />

        </div>
    );
}

export default HomePage;