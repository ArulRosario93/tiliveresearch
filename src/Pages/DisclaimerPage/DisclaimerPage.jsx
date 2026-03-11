
import React from "react";
import './DisclaimerPage.css';
import NavBar from "../../Components/NavBar/NavBar";
import FootBar from "../../Components/FootBar/FootBar";

const DisclaimerPage = () => {
    return (
        <>
            <NavBar />
            <div className="DisclaimerPage">
                <h2 className="DisclaimerPageHEAD">Disclaimer</h2>

                <h4 className="DisclaimerPageHead">General Information</h4>
                <p className="DisclaimerPagePara">All content on this website and within our deliverables is derived from current data, publicly accessible information, and proprietary research methodologies. Nevertheless, market conditions are fluid and can change swiftly. Tilive Research does not accept any responsibility for inaccuracies, omissions, or inconsistencies that may be present in the material.
    </p>

                <h4 className="DisclaimerPageHead">No Professional Advice
    </h4>
                <p className="DisclaimerPagePara">The reports and insights provided by Tilive Research are not designed to function as legal, financial, investment, or professional advice. Clients and users are urged to seek independent counsel prior to making any business or investment decisions based on the information received from us.
    </p>
                <h4 className="DisclaimerPageHead">Limitation of Liability
    </h4>
                <p className="DisclaimerPagePara">Under no circumstances shall Tilive Research, its affiliates, employees, or partners be liable for any direct, indirect, incidental, consequential, or special damages, including but not limited to loss of profits, revenue, or business opportunities, arising from or in connection with:
    </p>
                <li className="DisclaimerPageList">The use or reliance on our reports or services</li>
                <li className="DisclaimerPageList">Delays or inability to utilize the content or website</li>
                <li className="DisclaimerPageList">Errors, omissions, or inaccuracies in the data</li>

                <br />
                <h4 className="DisclaimerPageHead">Third-Party Content
    </h4>
                <p className="DisclaimerPagePara">This website may include links to third-party websites or resources. These links are provided solely for informational purposes. Tilive Research does not endorse, control, or take responsibility for the content or practices of any third-party sites.

    </p>
                <h4 className="DisclaimerPageHead">Data Sources and Accuracy
    </h4>
                <p className="DisclaimerPagePara">While we employ reliable sources and research methodologies, Tilive Research does not guarantee that all data is 100% accurate or comprehensive. We disclaim liability for any errors or omissions in our reports or website content.

    </p>
                <h4 className="DisclaimerPageHead">Copyright and Intellectual Property
    </h4>
                <p className="DisclaimerPagePara">All content, including text, data, graphics, logos, and images, is the intellectual property of Tilive Research. Any reproduction, distribution, or commercial use without prior written consent is strictly prohibited.
    </p>
                <h4 className="DisclaimerPageHead">Updates to This Disclaimer
    </h4>
                <p className="DisclaimerPagePara">We may update this disclaimer at any time without prior notice. Please check this page periodically to ensure you are aware of any changes.
    </p>
            </div>

            <FootBar />
        </>
    );
}

export default DisclaimerPage;