import React from "react";
import './HomePage.css';
import NavBar from "../../Components/NavBar/NavBar";
import MainSearchBar from "../../Components/MainSearchBar/MainSearchBar";
import FootBar from "../../Components/FootBar/FootBar";
import FirstContainer from "./FirstContainer/FirstContainer";
import SecondContainer from "./SecondContainer/SecondContainer";
import ThirdContainer from "./ThirdContainer/ThirdContainer";
import FourthContainer from "./FourthContainer/FourthContainer";

const HomePage = () => {
    return (
        <div className="HomePage">

            <NavBar />

            {/* <MainSearchBar /> */}

            <FirstContainer />
            <ThirdContainer />
            <SecondContainer />
            <FourthContainer />
            <FootBar />

        </div>
    );
}

export default HomePage;