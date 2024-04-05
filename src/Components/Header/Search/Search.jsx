import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import "../Search/Search.css"
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { AI_PROFILE_FORM_TABLE, AI_PROSPECT_PROFILE, COMPANY_PROFILE_SCREEN } from '../../../Utils/Constants';
export default function HeaderSearch({ headerSearchData, setheaderSearchData, handlesearch, responseData, showSearchdata }) {
    const navigate = useNavigate();
    const handelselectdata = (item) => {
        setheaderSearchData(item?.org_name);
        navigate(`/companyprofilescreen`, { state: { data: item } })
    };
    const emtySearchdata = () => {
        setheaderSearchData("")
    }
    return (
        <Paper className='full-searchbar'
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <SearchIcon className='searchicon-in-header' />
            <InputBase
                value={headerSearchData}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    setheaderSearchData(inputValue);
                }} className='search-inner-text'
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'Search google maps' }}
                autocomplete="off"
            />
            <div onClick={emtySearchdata} className='cross-icon-prospect-search'>
                {headerSearchData && (
                    <CloseIcon className='showicons-search' />
                )}            </div>
            {showSearchdata && (
                <div className={window.location.pathname === COMPANY_PROFILE_SCREEN
                    || window.location.pathname === AI_PROFILE_FORM_TABLE
                    || window.location.pathname === AI_PROSPECT_PROFILE ? 'NewClassNamepathname' : 'Autocompletedropdown'}>
                    {responseData?.length > 0 ? (
                        responseData?.map(item => (
                            <div className='outterAutocompletedropdown' key={item.id}>
                                <div onClick={() => handelselectdata(item)} className='useralldata'>
                                    {item?.org_name}
                                </div>
                                <div className='separatorline'></div>
                            </div>
                        ))
                    ) : (
                        <div className='useralldata'>Not Available</div>
                    )}
                </div>
            )}
        </Paper>
    );
}