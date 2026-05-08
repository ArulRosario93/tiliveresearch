import React from "react";
import "./PrivacyPolicyPage.css";
import NavBar from "../../Components/NavBar/NavBar";
import FootBar from "../../Components/FootBar/FootBar";

const PrivacyPolicyPage = () => {
    return (
        <div className="PrivacyPolicyPage">
            <NavBar />
            <div className="policy-container">
                <header className="policy-header">
                    <h1>Privacy Policy</h1>
                </header>

                <section className="policy-section">
                    <p>
                        At <strong>Tilive Research</strong>, we implement the most stringent measures to ensure the security of
                        our clients' or customers' data. We acknowledge your need for security, and your data is
                        handled with the utmost confidentiality. Tilive Research does not disclose this
                        information to any third party or make it public unless we have your explicit consent to
                        do so.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Terms of our Privacy Policy</h2>
                    <ul className="policy-list">
                        <li>Access to customer information within Tilive Research will be limited to selected representatives and expert groups.</li>
                        <li>Tilive Research guarantees that your personal information will not be disclosed to any vendor or third party without your written consent.</li>
                        <li>Tilive Research mandates that all employees, benefit suppliers, and merchants handle your data with the same stringent protection measures that we implement.</li>
                        <li>Each of these partners, employees, or stakeholders is adequately informed regarding our compliance and security policies.</li>
                        <li>Tilive Research commits to maintaining complete control over the use of clients' personal data for marketing or promotional activities.</li>
                        <li>In the future, the business development team at Tilive Research may send you promotional emails to keep you informed about our latest market research reports or service offerings. You have the option to decline such emails or withdraw your consent to receive Tilive's promotional emails at any time.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>Policy Changes</h2>
                    <p>
                        The privacy policy of Tilive Research may update from time to time. The changes will be
                        updated on the official website. Hence, it is advisable to refer to the web page regularly
                        to keep yourself updated.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Cookie Policy</h2>
                    <p>
                        Tilive Research uses Cookies to store and retrieve information specific to users,
                        facilitating navigation to enhance the online experience for users. We utilize cookies to
                        comprehend and analyze user trends, thereby customizing their searches based on
                        what Tilive Research believes may interest them. Our use of cookies aims to provide
                        users with the optimal experience during their visits to our website. This implies that
                        whenever a user returns to our site, we can recall their previous selections, specific user
                        details, and assess how effectively the site functions for that particular user. This
                        contributes to a quicker and more efficient user experience.
                    </p>
                    <p>
                        We prioritize and respect our users' privacy rights and, in accordance with established
                        guidelines, ensure that users have the option to accept or decline cookies by adjusting
                        their settings. However, declining cookies may result in users being unable to access
                        the interactive features of Tilive Market Research services or the websites they visit.
                    </p>
                </section>
            </div>
            <FootBar />
        </div>
    );
}

export default PrivacyPolicyPage;