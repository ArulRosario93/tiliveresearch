import React, { useEffect } from "react";
import './HomePage.css';
import NavBar from "../../Components/NavBar/NavBar";
import MainSearchBar from "../../Components/MainSearchBar/MainSearchBar";
import FootBar from "../../Components/FootBar/FootBar";
import FirstContainer from "./FirstContainer/FirstContainer";
import SecondContainer from "./SecondContainer/SecondContainer";
import ThirdContainer from "./ThirdContainer/ThirdContainer";
import FourthContainer from "./FourthContainer/FourthContainer";

const HomePage = () => {

    const content = {
        sections: [
            {
                sectionTitle: 'Methodology',
                sectionDescription: [
                    {
                        sectionContent: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam totam fuga quo quae assumenda perspiciatis voluptatum praesentium dolorem non adipisci a, beatae expedita, dolores neque tempore architecto saepe reprehenderit libero obcaecati! Eveniet voluptates, facilis autem vel ab consectetur architecto maiores.",
                        sectionImage: "Something"
                    },
                    {
                        sectionContent: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam totam fuga quo quae assumenda perspiciatis voluptatum praesentium dolorem non adipisci a, beatae expedita, dolores neque tempore architecto saepe reprehenderit libero obcaecati! Eveniet voluptates, facilis autem vel ab consectetur architecto maiores.",
                        sectionImage: "Something2"
                    },
                ]
            },
            {
                sectionTitle: 'Segmentation',
                sectionDescription: [
                    {
                        sectionContent: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam totam fuga quo quae assumenda perspiciatis voluptatum praesentium dolorem non adipisci a, beatae expedita, dolores neque tempore architecto saepe reprehenderit libero obcaecati! Eveniet voluptates, facilis autem vel ab consectetur architecto maiores.",
                        sectionImage: "Something"
                    },
                    {
                        sectionContent: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam totam fuga quo quae assumenda perspiciatis voluptatum praesentium dolorem non adipisci a, beatae expedita, dolores neque tempore architecto saepe reprehenderit libero obcaecati! Eveniet voluptates, facilis autem vel ab consectetur architecto maiores.",
                        sectionImage: "Something2"
                    },
                ]
            },
            {
                sectionTitle: 'Table Of Contents',
                sectionDescription: [
                    {
                        sectionContent: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam totam fuga quo quae assumenda perspiciatis voluptatum praesentium dolorem non adipisci a, beatae expedita, dolores neque tempore architecto saepe reprehenderit libero obcaecati! Eveniet voluptates, facilis autem vel ab consectetur architecto maiores.",
                        sectionImage: "Something"
                    },
                ]
            },
        ]
    }

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ content: content })
    };

    // const URL = "https://storied-paprenjak-0a4af7.netlify.app/.netlify/functions/uploadReport";
    const URL = "https://storied-paprenjak-0a4af7.netlify.app/.netlify/functions/getReports";

    useEffect(() => {
        fetch(URL
            // , requestOptions
        )
            .then(response => response.json()) // Parse JSON response
            .then(json => console.log(json))
    }, []);

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