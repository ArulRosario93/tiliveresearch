import React from "react";
import "./ContactUsPage.css";
import MessageIcon from '@mui/icons-material/Message';
import CallIcon from '@mui/icons-material/Call';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import NavBar from "../../Components/NavBar/NavBar";
import FootBar from "../../Components/FootBar/FootBar";

const ContactUsPage = () => {

    const handleClick = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <NavBar />
            <div className="ContactUsPage">


                <div className="ContactUsPageContent">

                    <div className="ContactUsPageContentCall">
                        <CallIcon fontSize='large' />
                        <p className="ContactUsPageContentFirstPara">Call Us Today</p>
                        <p className="ContactUsPageContentSecondPara">000 000 0000</p>
                    </div>
                    <div className="ContactUsPageContentSendAMessage">
                        <MessageIcon fontSize="large" />
                        <p className="ContactUsPageContentFirstPara">Send a message</p>
                        <p className="ContactUsPageContentSecondPara">example@example.com</p>
                    </div>
                    <div className="ContactUsPageContentOurOffice">
                        <LocationPinIcon fontSize="large" />
                        <p className="ContactUsPageContentFirstPara">Our Office</p>
                        <p className="ContactUsPageContentSecondPara">123 Main Street, City, Country</p>

                    </div>

                </div>
                <div className="ContactUsPageForm">

                    <h2 className="ContactUsPageFormHead">We'd Love to Hear from You!</h2>
                    <p className="ContactUsPageFormPara">Please fill in below details and we will get in touch with you shortly.</p>


                        <form action='/' onSubmit={handleClick}>
                    <div className="ContactUsPageFormForm">


                            <div className="ContactUsPageFormOne">
                                <div className="ContactUsPageFormOneContainer">
                                    <label htmlFor="name" id="name">Your Name 
                                    </label>
                                    <input className="ContactUsPageFormInp" required type="text" name="name" id="name" /> 
                                </div>
                                <div className="ContactUsPageFormOneContainer">
                                    <label htmlFor="phone number">Phone Number</label>
                                    <input className="ContactUsPageFormInp" required type="text" name="phone number" id="" />
                                </div>

                            </div>
                            <div className="ContactUsPageFormTwo">
                                    <label htmlFor="Email">Email</label>
                                    <input className="ContactUsPageFormInp" required type="email" name="email" id="" />
                            </div>
                            <div className="ContactUsPageFormThree">
                                    <label htmlFor="message">Your Message</label>
                                    <textarea className="ContactUsPageFormArea" rows='10' required cols="1" name="message" id="" />
                            </div>

                            <div className="ContactUsPageForm">
                                <button className="ContactUsPageFormBtn" type="submit">Submit</button>
                            </div>

                    </div>
                        </form>

                </div>

            </div>
            <FootBar />
        </>
    );
}

export default ContactUsPage;