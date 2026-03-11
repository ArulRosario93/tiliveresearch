import React from 'react';
import './AllReportsPage.css';
import NavBar from '../../Components/NavBar/NavBar';
import FootBar from '../../Components/FootBar/FootBar';
import AllReportsItemContainer from './AllReportsItemContainer/AllReportsItemContainer';
import AllReportsLabel from './AllReportsLabel/AllReportsLabel';
import DividerHori from '../../Components/Divider/DividerHori';
import AllReportsNumbers from './AllReportsNumbers/AllReportsNumbers';

const AllReportsPage = () => {

    const labels = [
        'Healthcare',
        'Information & Communications Technology',
        'Semiconductor & Electronics',
        'Chemicals & Materials',
        'Automotive & Transportation',
        'Aerospace & Defense',
        'Energy & Power',
        'Food & Beverage',
    ]

    const reports = [
        {
            name: 'Metaverse Market',
            description: 'Between 2021 and 2034, the metaverse market is anticipated to experience significant growth, transitioning from experimental digital environments to a fundamental component of the next-generation internet. In 2021, the market was valued at USD 42.61 billion and is projected to expand to USD 119.67 billion by 2024. ',
            publishedOn: '2024-06',
        },
        {
            name: 'Report One',
            description: 'This is the one of the best reports ever to be created. Maja ah mama neee',
            publishedOn: '2024-06',
        },
        {
            name: 'Report One',
            description: 'This is the one of the best reports ever to be created. Maja ah mama neee',
            publishedOn: '2024-06',
        },
        {
            name: 'Report One',
            description: 'This is the one of the best reports ever to be created. Maja ah mama neee',
            publishedOn: '2024-06',
        },
        {
            name: 'Report One',
            description: 'This is the one of the best reports ever to be created. Maja ah mama neee',
            publishedOn: '2024-06',
        },
    ]

    return (
        <div className='AllReportsPage'>
            <NavBar />

            <div className='AllReportsPageContainer'>
                <div className='AllReportsPageContainerLabel'>
                    <p className='AllReportsPageContainerLabelHead'>Reports of Industry</p>
                    {
                        labels.map((item, i) => {
                            return(
                                <>
                                    <AllReportsLabel name={item} key={i} />
                                    {
                                        i !== labels.length - 1?  <DividerHori />  : null
                                    }
                                </>
                            )
                        })
                    }
                </div>

                <div className='AllReportsPageContainerContent'>

                    <p className='AllReportsPageContainerContentHead'>Research Reports</p>

                    {
                        reports.length > 0 ? reports.map((item, i) => {
                            return (
                                <>
                                    <AllReportsItemContainer last={i === reports.length - 1} key={i} title={item.name} description={item.description} date={item.publishedOn} />
                                </>
                            )
                        }) : (
                            <div className='AllReportsPageContainerContentNotAvailable'>
                                No Reports Available 
                            </div>
                        )
                    }
                    <AllReportsNumbers />

                </div>
            </div>

            <FootBar />
        </div>
    );
}

export default AllReportsPage;