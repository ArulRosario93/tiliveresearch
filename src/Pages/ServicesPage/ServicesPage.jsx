import React from 'react';
import { useParams } from 'react-router';
import './ServicesPage.css';
import services from '../../Storage/Reports.js';
import NavBar from '../../Components/NavBar/NavBar';

const ServicesPage = () => {
    let { servicename } = useParams();

    const service = services.filter((service) => service.name == servicename)[0];

    window.scroll(0, 0);

    return(
        <div className='ServicesPage'>

            <NavBar />

            <div className='ServicesPageContainer'>

                <div className='ServicesPageContainerAbsolute'>
                    <h1 className='ServicesPageContainerHead'>{service.name}</h1>
                    <p className='ServicesPageContainerPara'>{service.description}</p>
                </div>

            </div>

            <div className='ServicePageContainerReports'>

                {
                    true? <>
                    
                        <h3 className='ServicePageContainerReportsHead'>Reports On Aerospace & Defence</h3>
                        <div className='ServicePageContainerReportsContainer'>

                            <div className='ServicePageContainerReportsContainerReport'>
                                <div className='ServicePageContainerReportsContainerReportAbsolute'>
                                    <h4 className='ServicePageContainerReportsContainerReportHead'>MetaVerse Market 2021 - 2031</h4>
                                    <p className='ServicePageContainerReportsContainerReportPara'>Aerospace and defense industry provides in-depth analysis for understanding evolving dynamics in this industry, market data forecasting, technological upgradation and other beneficial insights in order to enable clients in developing efficient and effective growth oriented strategies.</p>
                                </div>

                            </div>                    

                        </div>
                    </> : <h3 className='ServicePageContainerReportsHeadNope'>Currently No Reports Available</h3>
                }


            </div>

        </div>
    );
}

export default ServicesPage;