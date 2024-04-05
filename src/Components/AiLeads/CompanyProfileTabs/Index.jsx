import * as React from 'react';
import "./Style.css"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DecisionMakerTable from '../../DecisionMaker/DecisionMakerTable';
import EmployeesTable from '../../../Pages/AiLeads/CompanyProfileScreen/EmployeesTable/Index';
import Comingsoon from '../../ComingSoon/ComingSoon';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function CompanyProfileTabs({ dataForInformation, rowData }) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const isBranchLocationsDisabled = true;
    return (
        <Box className="company-profile-main-tabs-data" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs className='Companydata' value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        label="Prospects " {...a11yProps(0)} />
                    <Tab label="Branch locations" {...a11yProps(1)} />
                    <Tab label="Similar companies" {...a11yProps(2)} />
                    <Tab label="News/ Events" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {/* <DecisionMakerTable /> */}
                {/* <EmployeesTable dataForInformation={dataForInformation}/> */}
                <EmployeesTable dataForInformation={dataForInformation} rowData={rowData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1} disabled={isBranchLocationsDisabled}>
                {/* Branch locations */}
                <Comingsoon withoutLayout={true} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2} disabled={isBranchLocationsDisabled}>
                {/* Similar companies */}
                <Comingsoon withoutLayout={true} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3} disabled={isBranchLocationsDisabled}>
                {/* Similar companies */}
                <Comingsoon withoutLayout={true} />
            </CustomTabPanel>
        </Box>
    );
}