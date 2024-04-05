// import React, { useState } from "react";
// import NewAILeadsButton from "../../../Components/AiLeads/NewAiLeadsButton/Index";
// import DetailsTable from "../../../Components/AiProfile/AddProfile/DetailsTable/Index";
// import DetailsForm from "../../../Components/AiProfile/AddProfile/DetailsForm/Index";
// import Layout from "../../../Components/Layout/Layout";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { APIUrlOne, GetUserId } from "../../../Utils/Utils";
// import moment from "moment";
// import Loader from "../../../Components/Loader/Loader";
// import { AI_PROFILE } from "../../../Utils/Constants";
// import { useLocation, useNavigate } from "react-router-dom";
// const ProfileFormTable = () => {
//   const location = useLocation();
//   const prefilledData = location?.state;
//   const navigate = useNavigate();
//   const loggedInUserId = GetUserId();
//   const [loading, setLoading] = useState();
//   const [tableShowResult, setTableShowResult] = useState(true);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const [isFilterRetrieve, setIsFilterRetrieve] = useState([]);
//   const [detailsFormData, setDetailsFormData] = useState({
//     industry: "",
//     ravenue: "",
//     state: "",
//     noOfEmployee: "",
//     country: "",
//     ipoStatus: "",
//     lastFundingType: "",
//     fundingTotal: "",
//     // fundingRounds: "",
//     fundingDate: null,
//     fundingDateAt: null,
//     minFundingRounds: "",
//     maxFundingRounds: "",
//     Jscore: "",
//     addedName: "",
//   });
//   const formatedDateFrom = moment(detailsFormData?.fundingDate).format("YYYY-MM-DD");
//   const formatedDateTo = moment(detailsFormData?.fundingDateAt).format("YYYY-MM-DD");

//   // org_filters get api
//   const LeadsFilters = () => {
//     const option = {
//       method: "GET",
//       headers: {
//         "access-control-allow-origin": "*",
//         "content-type": "application/json",
//       },
//       url: `${APIUrlOne()}/v1/org_filters`,
//     };
//     axios(option)
//       .then((e) => {
//         setIsFilterRetrieve(e?.data?.data);
//       })
//       .catch(() => { });
//   };
//   React.useEffect(() => {
//     LeadsFilters();
//   }, []);
//   const validations = () => {
//     if (!detailsFormData?.industry) {
//       toast.error("Please Select Industry");
//       return false;
//     }
//     if (!detailsFormData?.ravenue) {
//       toast.error("Please Select  Revenue Range");
//       return false;
//     }
//     if (!detailsFormData?.noOfEmployee) {
//       toast.error("Please Select Number of Employees");
//       return false;
//     }
//     if (!detailsFormData?.country) {
//       toast.error("Please Select Country");
//       return false;
//     }
//     if (!detailsFormData?.state) {
//       toast.error("Please Select State");
//       return false;
//     }
//     if (!detailsFormData?.ipoStatus) {
//       toast.error("Please Select IPO Status");
//       return false;
//     }
//     if (!detailsFormData?.lastFundingType) {
//       toast.error("Please Select Last Funding Type");
//       return false;
//     }
//     if (!detailsFormData?.fundingDate) {
//       toast.error("Please Select Last Funding Date From");
//       return false;
//     }
//     if (!detailsFormData?.fundingDateAt) {
//       toast.error("Please Select Last Funding Date To");
//       return false;
//     }
//     if (!detailsFormData?.minFundingRounds) {
//       toast.error("Please Select Min No. Of Funding Rounds");
//       return false;
//     }
//     if (!detailsFormData?.maxFundingRounds) {
//       toast.error("Please Select Max No. Of Funding Rounds");
//       return false;
//     }
//     if (!detailsFormData?.fundingTotal) {
//       toast.error("Please Select Last Funding Total");
//       return false;
//     }
//     // if (!detailsFormData?.fundingRounds) {
//     //   toast.error("Please Select Number Of Funding Rounds");
//     //   return false;
//     // }
//     if (!detailsFormData?.Jscore) {
//       toast.error("Please Select JScore");
//       return false;
//     }
//     return true;
//   };
//   const modalvalidation = () => {
//     if (!detailsFormData?.addedName) {
//       toast.error("Please Enter Search Name");
//       return false;
//     }
//     return true;
//   };
//   const handlesave = (e) => {
//     e.preventDefault();
//   };
//   const handleClose = () => setModalOpen(false);
//   const minFundingRounds = parseInt(detailsFormData?.minFundingRounds);
//   const maxFundingRounds = parseInt(detailsFormData?.maxFundingRounds);
//   const TotalFundingRounds = [minFundingRounds, maxFundingRounds];
//   const handleModelSave = (e) => {
//     if (!modalvalidation()) return;
//     setLoading(true);
//     const data = {};
//     data.name = detailsFormData?.addedName;
//     data.user_id = loggedInUserId;
//     data.categories = detailsFormData?.industry;
//     data.revenue_range = detailsFormData?.ravenue;
//     data.num_employees = detailsFormData?.noOfEmployee;
//     data.state = detailsFormData?.state;
//     data.country = detailsFormData?.country;
//     data.ipo_status = detailsFormData?.ipoStatus;
//     data.last_funding_type = detailsFormData?.lastFundingType;
//     data.last_funding_at_from = moment(detailsFormData?.fundingDate).format("YYYY-MM-DD");
//     data.last_funding_at_to = moment(detailsFormData?.fundingDateAt).format("YYYY-MM-DD");
//     data.num_funding_rounds = TotalFundingRounds;;
//     data.last_funding_total = detailsFormData?.fundingTotal;
//     data.j_score = detailsFormData?.Jscore;
//     const option = {
//       method: "POST",
//       headers: {
//         "access-control-allow-origin": "*",
//         "content-type": "application/json",
//       },
//       url: `${APIUrlOne()}/v1/add_filter_org`,
//       data: JSON.stringify(data),
//     };
//     axios(option)
//       .then((response) => {
//         setLoading(false);
//         if (response?.status === 200) {
//           setDetailsFormData({
//             industry: "",
//             ravenue: "",
//             state: "",
//             noOfEmployee: "",
//             country: "",
//             ipoStatus: "",
//             lastFundingType: "",
//             fundingTotal: "",
//             fundingRounds: "",
//             fundingDate: "",
//             fundingDateAt: "",
//             minFundingRounds: "",
//             maxFundingRounds: "",
//             Jscore: "",
//             addedName: "",
//           });
//           handleClose();
//           toast.success(response?.data?.message);
//           navigate(AI_PROFILE);
//         }
//       })
//       .catch((error) => {
//         setLoading(false);
//         toast.error(error?.response?.data?.message);
//       });
//   };
//   const categoriesArr = [];
//   categoriesArr.push(detailsFormData?.industry);
//   const ravenue = [];
//   ravenue.push(detailsFormData?.ravenue);
//   const num_employeesArr = [];
//   num_employeesArr.push(detailsFormData?.noOfEmployee);
//   const toggleResult = () => {
//     // if (!validations()) return;
//     setLoading(true);
//     const data = {};
//     data.categories = categoriesArr;
//     data.revenue_range = ravenue;
//     data.num_employees = num_employeesArr;
//     data.state = detailsFormData?.state;
//     data.country = detailsFormData?.country;
//     data.ipo_status = detailsFormData?.ipoStatus;
//     data.last_funding_type = detailsFormData?.lastFundingType;
//     data.last_funding_at_from = formatedDateFrom;
//     data.last_funding_at_to = formatedDateTo;
//     data.num_funding_rounds = TotalFundingRounds;
//     data.last_funding_total = detailsFormData?.fundingTotal;
//     data.j_score = detailsFormData?.Jscore;
//     const option = {
//       method: "POST",
//       headers: {
//         "access-control-allow-origin": "*",
//         "content-type": "application/json",
//       },
//       url: `${APIUrlOne()}/v1/apply_org_filter?limit=50&skip=0`,
//       data: JSON.stringify(data),
//     };
//     axios(option)
//       .then((response) => {
//         setLoading(false);
//         if (response?.status === 200) {
//           setDetailsFormData({
//             industry: "",
//             ravenue: "",
//             state: "",
//             noOfEmployee: "",
//             country: "",
//             ipoStatus: "",
//             lastFundingType: "",
//             fundingTotal: "",
//             fundingRounds: "",
//             fundingDate: "",
//             fundingDateAt: "",
//             minFundingRounds: "",
//             maxFundingRounds: "",
//             Jscore: "",
//           });
//           setTableShowResult(!tableShowResult);
//           handleClose();
//           toast.success(response?.data?.message);
//           // navigate(AI_PROFILE);
//         }
//       })
//       .catch((error) => {
//         setLoading(false);
//         toast.error(error?.response?.data?.message);
//       });
//   };
//   return (
//     <>
//       {loading ? <Loader /> : null}
//       <Layout className={"paddingSet"}>
//         <div className="child-section-of-everypage set-tabs-ai-section">
//           <NewAILeadsButton
//             prefilledData={prefilledData}
//             validations={validations}
//             handlesave={handlesave}
//             handleModelSave={handleModelSave}
//             detailsFormData={detailsFormData}
//             setDetailsFormData={setDetailsFormData}
//             modalOpen={modalOpen}
//             setModalOpen={setModalOpen}
//           />
//           <div className="details-table-form-page">
//             <div className="details-table-page">
//               <DetailsTable
//                 prefilledData={prefilledData}
//                 setTableShowResult={tableShowResult}
//                 tableShowResult={tableShowResult}
//                 handleModelSave={handleModelSave}
//               />
//             </div>
//             <div className="details-form-page">
//               <DetailsForm
//                 handlesave={handlesave}
//                 tableShowResult={tableShowResult}
//                 detailsFormData={detailsFormData}
//                 setTableShowResult={setTableShowResult}
//                 setDetailsFormData={setDetailsFormData}
//                 handleModelSave={handleModelSave}
//                 toggleResult={toggleResult}
//                 prefilledData={prefilledData}
//                 isFilterRetrieve={isFilterRetrieve}
//               />
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };
// export default ProfileFormTable;

import React, { useEffect, useState } from "react";
import NewAILeadsButton from "../../../Components/AiLeads/NewAiLeadsButton/Index";
import DetailsTable from "../../../Components/AiProfile/AddProfile/DetailsTable/Index";
import DetailsForm from "../../../Components/AiProfile/AddProfile/DetailsForm/Index";
import Layout from "../../../Components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { APIUrlOne, GetUserId } from "../../../Utils/Utils";
import moment from "moment";
import Loader from "../../../Components/Loader/Loader";
import { AI_PROFILE } from "../../../Utils/Constants";
import { useLocation, useNavigate } from "react-router-dom";
const ProfileFormTable = () => {
  const location = useLocation();
  const prefilledData = location?.state;
  const navigate = useNavigate();
  const loggedInUserId = GetUserId();
  const [loading, setLoading] = useState();

  const [tableShowResult, setTableShowResult] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isFilterRetrieve, setIsFilterRetrieve] = useState([]);
  const [resultRetrieve, setResultRetrieve] = useState([]);
  const [totalRecords, setTotalRecords] = useState('');
  const [detailsFormData, setDetailsFormData] = useState({
    industry: "",
    ravenue: "",
    state: "",
    noOfEmployee: "",
    country: "",
    ipoStatus: "",
    lastFundingType: "",
    fundingTotal: "",
    // fundingRounds: "",
    fundingDate: "",
    fundingDateAt: "",
    minFundingRounds: "",
    maxFundingRounds: "",
    Jscore: "",
    addedName: "",
  });
  const [hasMore, setHasMore] = React.useState(true);
  const [skip, setSkip] = React.useState(0);
  const formatedDateFrom = moment(detailsFormData?.fundingDate).format("YYYY-MM-DD");
  const formatedDateTo = moment(detailsFormData?.fundingDateAt).format("YYYY-MM-DD");

  // useEffect(() => {
  //   const formatedDateFrom = moment(detailsFormData?.fundingDate).format("YYYY-MM-DD");
  //   const formatedDateTo = moment(detailsFormData?.fundingDateAt).format("YYYY-MM-DD");
  // }, [detailsFormData]);

  // useEffect(() => {
  //   const fundingDate = detailsFormData?.fundingDate;
  //   // Ensure fundingDate is valid before attempting to format
  //   if (moment(fundingDate, moment.ISO_8601, true).isValid()) {
  //     const formattedDateFrom = moment.utc(fundingDate).format("YYYY-MM-DD");
  //   } else {
  //     console.error("Invalid date format:", fundingDate);
  //   }
  // }, [])

  // org_filters get api
  const LeadsFilters = () => {
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/org_filters`,
    };
    axios(option)
      .then((e) => {
        setIsFilterRetrieve(e?.data?.data);
      })
      .catch(() => { });
  };
  React.useEffect(() => {
    LeadsFilters();
  }, []);
  //   if (!detailsFormData?.industry) {
  //     toast.error("Please Select Industry");
  //     return false;
  //   }
  //   if (!detailsFormData?.ravenue) {
  //     toast.error("Please Select  Revenue Range");
  //     return false;
  //   }
  //   if (!detailsFormData?.noOfEmployee) {
  //     toast.error("Please Select Number of Employees");
  //     return false;
  //   }
  //   if (!detailsFormData?.country) {
  //     toast.error("Please Select Country");
  //     return false;
  //   }
  //   if (!detailsFormData?.state) {
  //     toast.error("Please Select State");
  //     return false;
  //   }
  //   if (!detailsFormData?.ipoStatus) {
  //     toast.error("Please Select IPO Status");
  //     return false;
  //   }
  //   if (!detailsFormData?.lastFundingType) {
  //     toast.error("Please Select Last Funding Type");
  //     return false;
  //   }
  //   if (!detailsFormData?.fundingDate) {
  //     toast.error("Please Select Last Funding Date From");
  //     return false;
  //   }
  //   if (!detailsFormData?.fundingDateAt) {
  //     toast.error("Please Select Last Funding Date To");
  //     return false;
  //   }
  //   if (!detailsFormData?.minFundingRounds) {
  //     toast.error("Please Select Min No. Of Funding Rounds");
  //     return false;
  //   }
  //   if (!detailsFormData?.maxFundingRounds) {
  //     toast.error("Please Select Max No. Of Funding Rounds");
  //     return false;
  //   }
  //   if (!detailsFormData?.fundingTotal) {
  //     toast.error("Please Select Last Funding Total");
  //     return false;
  //   }
  //   // if (!detailsFormData?.fundingRounds) {
  //   //   toast.error("Please Select Number Of Funding Rounds");
  //   //   return false;
  //   // }
  //   if (!detailsFormData?.Jscore) {
  //     toast.error("Please Select JScore");
  //     return false;
  //   }
  //   return true;
  // };

  const validations = () => {
    if (!detailsFormData?.industry?.length) {
      toast.error("Please Select Industry");
      return false;
    }
    // if (!detailsFormData?.ravenue?.length) {
    //   toast.error("Please Select Revenue Range");
    //   return false;
    // }
    // if (!detailsFormData?.noOfEmployee?.length) {
    //   toast.error("Please Select Number of Employees");
    //   return false;
    // }
    // if (!detailsFormData?.country) {
    //   toast.error("Please Select Country");
    //   return false;
    // }
    // if (!detailsFormData?.state) {
    //   toast.error("Please Select State");
    //   return false;
    // }
    // if (!detailsFormData?.ipoStatus) {
    //   toast.error("Please Select IPO Status");
    //   return false;
    // }
    // if (!detailsFormData?.lastFundingType) {
    //   toast.error("Please Select Last Funding Type");
    //   return false;
    // }
    // if (!detailsFormData?.fundingDate) {
    //   toast.error("Please Select Last Funding Date From");
    //   return false;
    // }
    // if (!detailsFormData?.fundingDateAt) {
    //   toast.error("Please Select Last Funding Date To");
    //   return false;
    // }
    // if (!detailsFormData?.minFundingRounds) {
    //   toast.error("Please Select Min No. Of Funding Rounds");
    //   return false;
    // }
    // if (!detailsFormData?.maxFundingRounds) {
    //   toast.error("Please Select Max No. Of Funding Rounds");
    //   return false;
    // }
    // if (!detailsFormData?.fundingTotal) {
    //   toast.error("Please Select Last Funding Total");
    //   return false;
    // }
    // if (!detailsFormData?.Jscore) {
    //   toast.error("Please Select JScore");
    //   return false;
    // }
    return true;
  };

  const validationSaveSearch = () => {
    if (!detailsFormData?.industry?.length) {
      toast.error("Please Select Industry");
      return false;
    }

    // if (!detailsFormData?.ravenue?.length) {
    //   toast.error("Please Select Revenue Range");
    //   return false;
    // }
    // if (!detailsFormData?.noOfEmployee?.length) {
    //   toast.error("Please Select Number of Employees");
    //   return false;
    // }
    // if (!detailsFormData?.country) {
    //   toast.error("Please Select Country");
    //   return false;
    // }
    // if (!detailsFormData?.state) {
    //   toast.error("Please Select State");
    //   return false;
    // }
    // if (!detailsFormData?.ipoStatus) {
    //   toast.error("Please Select IPO Status");
    //   return false;
    // }
    // if (!detailsFormData?.lastFundingType) {
    //   toast.error("Please Select Last Funding Type");
    //   return false;
    // }
    // if (!detailsFormData?.fundingDate) {
    //   toast.error("Please Select Last Funding Date From");
    //   return false;
    // }
    // if (!detailsFormData?.fundingDateAt) {
    //   toast.error("Please Select Last Funding Date To");
    //   return false;
    // }
    // if (!detailsFormData?.minFundingRounds) {
    //   toast.error("Please Select Min No. Of Funding Rounds");
    //   return false;
    // }
    // if (!detailsFormData?.maxFundingRounds) {
    //   toast.error("Please Select Max No. Of Funding Rounds");
    //   return false;
    // }
    // if (!detailsFormData?.fundingTotal) {
    //   toast.error("Please Select Last Funding Total");
    //   return false;
    // }
    // if (!detailsFormData?.Jscore) {
    //   toast.error("Please Select JScore");
    //   return false;
    // }
    return true;
  }

  const modalvalidation = () => {
    if (!detailsFormData?.addedName) {
      toast.error("Please Enter Search Name");
      return false;
    }
    return true;
  };
  const handlesave = (e) => {
    e.preventDefault();
  };
  const handleClose = () => setModalOpen(false);
  const minFundingRounds = parseInt(detailsFormData?.minFundingRounds);
  const maxFundingRounds = parseInt(detailsFormData?.maxFundingRounds);
  const TotalFundingRounds = [minFundingRounds, maxFundingRounds];
  const handleModelSave = (e) => {
    if (!modalvalidation()) return;
    setLoading(true);
    const data = {};
    data.name = detailsFormData?.addedName;
    data.user_id = loggedInUserId;
    // data.categories = detailsFormData?.industry ? detailsFormData?.industry : null;
    data.categories = detailsFormData?.industry ? detailsFormData?.industry : null;
    if (Array.isArray(data.categories) && data.categories.length === 0) {
      data.categories = null;
    }
    data.revenue_range = detailsFormData?.ravenue ? detailsFormData?.ravenue : null;
    data.num_employees = detailsFormData?.noOfEmployee ? detailsFormData?.noOfEmployee : null;
    data.state = detailsFormData?.state ? detailsFormData?.state : null;
    data.country = detailsFormData?.country ? detailsFormData?.country : null;
    data.ipo_status = detailsFormData?.ipoStatus ? detailsFormData?.ipoStatus : null;
    data.last_equity_funding_type = detailsFormData?.lastFundingType ? detailsFormData?.lastFundingType : null;
    data.last_funding_at_from = formatedDateFrom === 'Invalid date' ? null : formatedDateFrom;
    data.last_funding_at_to = formatedDateTo === 'Invalid date' ? null : formatedDateTo;
    // data.num_funding_rounds = TotalFundingRounds?.length ? TotalFundingRounds : null;
    data.num_funding_rounds = (minFundingRounds || maxFundingRounds) ? TotalFundingRounds : null;
    data.last_funding_total = detailsFormData?.fundingTotal ? detailsFormData?.fundingTotal : null;
    data.j_score = detailsFormData?.Jscore ? detailsFormData?.Jscore : null;
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/add_filter_org`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          setDetailsFormData({
            industry: "",
            ravenue: "",
            state: "",
            noOfEmployee: "",
            country: "",
            ipoStatus: "",
            lastFundingType: "",
            fundingTotal: "",
            fundingRounds: "",
            fundingDate: "",
            fundingDateAt: "",
            minFundingRounds: "",
            maxFundingRounds: "",
            Jscore: "",
            addedName: "",
          });
          handleClose();
          toast.success(response?.data?.message);
          navigate(AI_PROFILE);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };

  const fetchMoreData = () => {
    if (!resultRetrieve?.length) return
    const hasMore = resultRetrieve?.length < totalRecords;
    if (!hasMore) return
    setSkip((prevskip) => prevskip + 50);
  };

  const categoriesArr = [];
  categoriesArr.push(detailsFormData?.industry);
  const ravenue = [];
  ravenue.push(detailsFormData?.ravenue);
  const num_employeesArr = [];
  num_employeesArr.push(detailsFormData?.noOfEmployee);

  const toggleResult = () => {
    if (!validations()) return;
    setLoading(true);
    const data = {};
    data.categories = detailsFormData?.industry ? categoriesArr : null;
    data.revenue_range = detailsFormData?.ravenue ? [detailsFormData?.ravenue] : null;
    data.num_employees = detailsFormData?.noOfEmployee ? [detailsFormData?.noOfEmployee] : null;
    data.state = detailsFormData?.state ? detailsFormData?.state : null;
    data.country = detailsFormData?.country ? detailsFormData?.country : null;
    data.ipo_status = detailsFormData?.ipoStatus ? detailsFormData?.ipoStatus : null;
    data.last_funding_type = detailsFormData?.lastFundingType ? detailsFormData?.lastFundingType : null;
    data.last_funding_at_from = formatedDateFrom === 'Invalid date' ? null : formatedDateFrom;
    data.last_funding_at_to = formatedDateTo === 'Invalid date' ? null : formatedDateTo;
    data.num_funding_rounds = TotalFundingRounds ? TotalFundingRounds : null;
    data.last_funding_total = detailsFormData?.fundingTotal ? detailsFormData?.fundingTotal : null;
    data.j_score = detailsFormData?.Jscore ? detailsFormData?.Jscore : null;
    const option = {
      method: "POST",
      headers: {
        "content-type": "plain/text",
      },
      url: `${APIUrlOne()}/v1/apply_org_filter?limit=50&skip=${skip ? skip : 0}`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          if (response?.data?.data?.length === 0) {
            setHasMore(false);
          } else {
            setTotalRecords(response?.data?.count)
            setResultRetrieve([...resultRetrieve, ...response?.data?.data]);
          }
          // setDetailsFormData({
          //   industry: "",
          //   ravenue: "",
          //   state: "",
          //   noOfEmployee: "",
          //   country: "",
          //   ipoStatus: "",
          //   lastFundingType: "",
          //   fundingTotal: "",
          //   fundingRounds: "",
          //   fundingDate: "",
          //   fundingDateAt: "",
          //   minFundingRounds: "",
          //   maxFundingRounds: "",
          //   Jscore: "",
          // });
          if (response?.data?.data?.length) {
            setTableShowResult(true);
            // setTableShowResult(!tableShowResult);
            handleClose();
            toast.success(response?.data?.message);
          }
          // navigate(AI_PROFILE);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    if (resultRetrieve?.length >= 50 && !prefilledData) {
      toggleResult();
    }
  }, [skip])

  useEffect(() => {
    if (resultRetrieve?.length >= 50 && prefilledData) {
      LeadsProfileRecords();
    }
  }, [skip, prefilledData])

  useEffect(() => {
    if (prefilledData?.id) {
      setDetailsFormData({
        industry: [prefilledData?.categories],
        ravenue: prefilledData?.revenue_range ? [prefilledData?.revenue_range] : null,
        state: prefilledData?.state,
        noOfEmployee: prefilledData?.num_employees ? [prefilledData?.num_employees] : null,
        country: prefilledData?.country,
        ipoStatus: prefilledData?.ipo_status,
        lastFundingType: prefilledData?.last_funding_type,
        fundingTotal: prefilledData?.last_funding_total,
        fundingRounds: "",
        fundingDate: prefilledData?.last_funding_at_from,
        fundingDateAt: prefilledData?.last_funding_at_to,
        minFundingRounds: prefilledData?.num_funding_rounds_min,
        maxFundingRounds: prefilledData?.num_funding_rounds_max,
        Jscore: prefilledData?.j_score,
      });
    }
  }, [prefilledData])

  useEffect(() => {
    if (detailsFormData?.industry?.length > 0 && prefilledData

    ) {
      LeadsProfileRecords();
    }
  }, [detailsFormData, prefilledData]);

  const LeadsProfileRecords = () => {
    setLoading(true);
    const data = {};
    data.name = detailsFormData?.addedName;
    data.user_id = loggedInUserId;
    if (Array.isArray(detailsFormData?.industry) && detailsFormData?.industry.every(elem => elem === null)) {
      data.categories = null;
    } else {
      data.categories = detailsFormData?.industry ? detailsFormData?.industry : null;
    }

    data.revenue_range = detailsFormData?.ravenue ? detailsFormData?.ravenue : null;
    data.num_employees = detailsFormData?.noOfEmployee ? detailsFormData?.noOfEmployee : null;
    data.state = detailsFormData?.state ? detailsFormData?.state : null;
    data.country = detailsFormData?.country ? detailsFormData?.country : null;
    data.ipo_status = detailsFormData?.ipoStatus ? detailsFormData?.ipoStatus : null;
    data.last_equity_funding_type = detailsFormData?.lastFundingType ? detailsFormData?.lastFundingType : null;
    data.last_funding_at_from = formatedDateFrom === 'Invalid date' ? null : formatedDateFrom;
    data.last_funding_at_to = formatedDateTo === 'Invalid date' ? null : formatedDateTo;
    data.num_funding_rounds = (minFundingRounds || maxFundingRounds) ? TotalFundingRounds : null;
    data.last_funding_total = detailsFormData?.fundingTotal ? detailsFormData?.fundingTotal : null;
    data.j_score = detailsFormData?.Jscore ? detailsFormData?.Jscore : null;
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/apply_org_filter?limit=50&skip=${skip ? skip : 0}`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          // setResultRetrieve(response?.data?.data);
          if (response?.data?.data?.length === 0) {
            setHasMore(false);
          } else {
            setTotalRecords(response?.data?.count)
            setResultRetrieve([...resultRetrieve, ...response?.data?.data]);
          }
          if (response?.data?.data?.length) {
            setTableShowResult(true);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  }
  return (
    <>
      {loading ? <Loader /> : null}
      <Layout className={"paddingSet"}>
        <div className="child-section-of-everypage set-tabs-ai-section">
          <NewAILeadsButton
            prefilledData={prefilledData}
            validationSaveSearch={validationSaveSearch}
            handlesave={handlesave}
            handleModelSave={handleModelSave}
            detailsFormData={detailsFormData}
            setDetailsFormData={setDetailsFormData}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
          <div className="details-table-form-page">
            <div className="details-table-page">
              <DetailsTable
                prefilledData={prefilledData}
                setTableShowResult={tableShowResult}
                tableShowResult={tableShowResult}
                handleModelSave={handleModelSave}
                resultRetrieve={resultRetrieve}
                hasMore={hasMore}
                fetchMoreData={fetchMoreData}
                totalRecords={totalRecords}
              />
            </div>
            <div className="details-form-page">
              <DetailsForm
                handlesave={handlesave}
                tableShowResult={tableShowResult}
                detailsFormData={detailsFormData}
                setTableShowResult={setTableShowResult}
                setDetailsFormData={setDetailsFormData}
                handleModelSave={handleModelSave}
                toggleResult={toggleResult}
                prefilledData={prefilledData}
                isFilterRetrieve={isFilterRetrieve}
                setResultRetrieve={setResultRetrieve}
                setSkip={setSkip}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default ProfileFormTable;
