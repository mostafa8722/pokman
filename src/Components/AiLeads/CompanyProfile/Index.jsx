import * as React from 'react';
import "./Style.css"
import profile from "../../../Assets/profile.svg"
import callImg from '../../../Assets/call.svg';
import LoctionImg from '../../../Assets/loction.svg';
import userprofile from "../../../Assets/user.svg"
import GrowIcons from "../../../Assets/grow.svg"
import Companyimg from "../../../Assets/company.svg"
import GlobalImg from '../../../Assets/Globe.svg';
import IndustryImage from '../../../Assets/office-building.png';
import { Link } from 'react-router-dom/dist';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function CompanyProfile({ dataForInformation }) {
    const [formatedRevenue, setFormattedRevenue] = React.useState('');
    // function convertRangeToMillion(range) {
    //     const numbers = range?.replace(/\$|M/g, '').split('-');
    //     const min = parseFloat(numbers[0]);
    //     const max = parseFloat(numbers[1]);
    //     return `${min}-${max} M`;
    // }
    // React.useEffect(() => {
    //     if (dataForInformation) {
    //         const formattedRevenueRange = convertRangeToMillion(dataForInformation?.revenue_range);
    //         setFormattedRevenue(formattedRevenueRange);
    //     }
    // }, [dataForInformation])
    return (
        <>
            <section className='CompanyProfile-main-container'>
                <div className=' CompanyProfile-outter-container'>
                    <div className='CompanyProfile-flex-container'>
                        <div className='CompanyProfile-flex-outter-container'>
                            <div className='CompanyProfile-img'>
                                <img src={IndustryImage} style={{ width: '100%', height: '100%' }} />
                                {/* <p>{dataForInformation?.name?.charAt(0)}
                                    {dataForInformation?.name?.split(' ')[1]?.charAt(0)}
                                </p> */}
                            </div>
                            <div>
                                <h3 className='Netflix-heading'>{dataForInformation?.name ? dataForInformation?.name : '-'}</h3>
                                <div className='CompanyProfile-content'>
                                    <img className='CompanyProfile-icons' src={GlobalImg} alt="" />
                                    <Link to={dataForInformation?.website_url} target="_blank" className='clickable-link-for-website'>
                                        <p>{dataForInformation?.website_url?.split('www.')?.[1] ? dataForInformation?.website_url?.split('www.')?.[1] : 'Not Available'}</p>
                                    </Link>
                                </div>
                                <div className='CompanyProfile-content'>
                                    <img className='CompanyProfile-icons' src={callImg} alt="" />
                                    <p>{dataForInformation?.phone_number ? dataForInformation?.phone_number : 'Not Available'}</p>
                                </div>
                                <div className='CompanyProfile-content'>
                                    <img className='CompanyProfile-icons' src={LoctionImg} alt="" />
                                    {/* <p>4517 Washington Ave. Manchester, Kentucky 39495</p> */}
                                    <p>{`${dataForInformation?.street ? dataForInformation?.street + `,` : dataForInformation?.street === null ? '' : dataForInformation?.street} ${dataForInformation?.location_identifiers ? dataForInformation?.location_identifiers + `,` : dataForInformation?.location_identifiers === null ? '' : dataForInformation?.location_identifiers} ${dataForInformation?.postalcode ? dataForInformation?.postalcode + `,` : dataForInformation?.postalcode === null ? '' : dataForInformation?.postalcode} ${dataForInformation?.country ? dataForInformation?.country : dataForInformation?.country === null ? '' : dataForInformation?.country}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className='CompanyProfile-cont-rightside'>
                            <div className='CompanyProfile-content'>
                                <img className='CompanyProfile-icons' src={userprofile} alt="" />
                                <p>Prospects  - {dataForInformation?.num_employees ? dataForInformation?.num_employees : 'Not Available'}</p>
                            </div>
                            <div className='CompanyProfile-content'>
                                <img className='CompanyProfile-icons' src={GrowIcons} alt="" />
                                <p>Annual revenue - {dataForInformation?.revenue_range ? dataForInformation?.revenue_range : 'Not Available'}</p>
                            </div>
                            <div className='CompanyProfile-content'>
                                <img className='CompanyProfile-icons' src={Companyimg} alt="" />
                                <p className='industry-mentions'>Industry/ Sector - {dataForInformation?.categories}</p>
                            </div>
                        </div>
                    </div>
                    <div className='CompanyProfile-infomation-main'>                    
                        <div>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<KeyboardArrowDownIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography>Company Bio</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className='CompanyProfile-infomation'>
                                        <p className='industry-mentions'>{dataForInformation?.description ? dataForInformation?.description : 'Not Available'}</p>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}