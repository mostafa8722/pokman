import * as React from "react";
import PropTypes from "prop-types";
import "./Style.css";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import decisionMakerImage from "../../../../Assets/Cloudfigma.svg";
import ContactDetailList from "../../../../Components/AiLeads/ContactDetailList/ContactDetailList";
import RightSidebar from "../../../../Components/RightSiderbar/RightSiderbar";
import { Tooltip } from "@mui/material";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";
import { toast } from "react-toastify";
import { APIUrlOne, APIUrlTwo, GetUserId } from "../../../../Utils/Utils";
import { useLocation } from "react-router-dom";
import IndustryDropdown from "../../../../Components/AiLeads/IndustrySectorDropdown/Index";
import InfiniteScroll from "react-infinite-scroll-component";
function Row({ row, selected, onSelect }) {
  const [open, setOpen] = React.useState(false);
  const loggedInUserId = GetUserId();
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [dataShortestPath, setDataShortestPath] = React.useState();
  const handleRightsidebar = (event) => {
    const data = {};
    data.source_uid = Number(loggedInUserId);
    data.target_uid = Number(event);
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      data: data,
      url: `${APIUrlTwo()}/v1/shortest-path`,
    };
    axios(option)
      .then((response) => {
        if (response?.status === 200) {
          // const shortestPath = { ...response.data };
          // shortestPath.source = loggedInUserId;
          // shortestPath.target = event;
          const data = Object.values(response.data);
          setDataShortestPath(data);
          setOpenSidebar(true);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  return (
    <TableRow className="juyds" sx={{ "& > *": { borderBottom: "unset" } }}>
      <>
        <TableCell className="Decision-maker-userTeblesell" align="left">
          <img
            className={
              row?.suspect_status === null ? "hide-image" : "decisionMakerImage"
            }
            src={decisionMakerImage}
            alt=""
          />
          <div className="Decision-maker-user-name-main-container">
            <div
              className={
                row?.decision_maker === true
                  ? "Decision-maker-user-name"
                  : "Decision-maker-user-namenoborder"
              }
            >
              <p className="letter-heading">
                {row?.first_name?.substring(0, 2)}
              </p>
            </div>
            <div className="name-and-title-text">
              <h3 className="company-name-country">
                {`${row?.first_name} ${row?.last_name}`}{" "}
              </h3>
              <p className="after-company-name-country">
                {row?.primary_job_title}
                {/* {row?.primary_job_title?.substring(0, 15) +
                  (row?.primary_job_title?.length > 10 ? "...." : "")} */}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell component="th" scope="row">
          <p>{row?.strengthData?.strength}</p>
        </TableCell>
        <TableCell align="left">
          <h3 className="annual-revenue-table">{row.primary_organization}</h3>
        </TableCell>
        <TableCell
          align="left"
          className="table-cell-of-contact-details-dropdown-th"
        >
          <div style={{ position: "absolute" }}>
            <div className="email-and-other-info">
              <div className="maked-component-of-dropdown">
                <IndustryDropdown row={row} />
              </div>
            </div>
          </div>
        </TableCell>
        {/* <TableCell align="left">
                    <h3 className="industry-sector-table">-</h3>
                </TableCell> */}
        <TableCell align="left">
          <div className="Suspect-table-data">
            <h3 className="industry-sector-table">
              {row?.suspect_status ? row.suspect_status : "-"}
            </h3>
          </div>
        </TableCell>
        <TableCell
          align="left"
          className="table-cell-of-contact-details-dropdown-th"
        >
          <div style={{ position: "absolute" }}>
            <div className="email-and-other-info">
              <div className="maked-component-of-dropdown">
                <ContactDetailList item={row} />
              </div>
            </div>
          </div>
        </TableCell>
      </>
      <div className="table-cellhandleRightsidebar">
        {/* <Tooltip   className="dfvbvfe2wefvfe2wefvwfv" title={"View AI Path"}> */}
        <IconButton
          aria-label="expand row"
          size="small"
          // onClick={() => handleRightsidebar(row?.person_id)}
          className="button-collapse-table"
        >
          <RightSidebar
          rowid={row?.person_id}
          handleRightsidebar={handleRightsidebar}
            dataShortestPath={dataShortestPath}
            openSidebar={openSidebar}
          />
        </IconButton>
        {/* </Tooltip> */}
      </div>
    </TableRow>
  );
}
Row.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default function EmployeesTable({
  tableCommingData,
  setTableCommingData,
  istableDataFilter,
  setCurrentLeadsLength,
  dataForInformation,
  rowData,
}) {
  const location = useLocation();
  const newdata = location?.state?.data;
  const [loading, setLoading] = React.useState(false);
  const [decisionMakerData, setDecisionMakerData] = React.useState([]);
  const [comingOrgId, setComingOrgId] = React.useState("");
  const loggedInUserId = GetUserId();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [strengthTableData, setStrengthTableData] = React.useState([]);
  const decisionMakerTableData = decisionMakerData;
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const getStrength = async () => {
    if (!decisionMakerTableData?.length) return;
    setLoading(true);
    const tuples = decisionMakerTableData.map((item) => ({
      items: [Number(loggedInUserId), item?.person_id],
    }));
    const data = { tuples };
    const options = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      data: data,
      url: `${APIUrlTwo()}/v1/conn_strength`,
    };
    try {
      const response = await axios(options);
      const strengthData = response?.data;
      const updatedData = decisionMakerTableData?.map((item, index) => ({
        ...item,
        strengthData: strengthData[index],
      }));
      setStrengthTableData(updatedData);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getStrength();
  }, [decisionMakerTableData]);
  // const fetchMoreData = () => {
  //     const newSkip = skip + 50;
  //     setSkip(newSkip);
  //     aiDecisionMakerTable(newSkip);
  // };
  const fetchMoreData = () => {
    if (!decisionMakerData?.length) return;
    const hasMore = decisionMakerData?.length < rowData?.people_count;
    if (!hasMore) return;
    setSkip((prevskip) => prevskip + 50);
    // const newSkip = skip + 10;
    // aiDecisionMakerTable(newSkip);
  };
  const aiDecisionMakerTable = (eventName) => {
    setLoading(true);
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      // url: `${APIUrlOne()}/v1/decision_maker?org_id=${newdata?.org_id || newdata.id}&limit=50&skip=${eventName ? eventName : 0}`,
      url: `${APIUrlOne()}/v1/decision_maker?org_id=${
        newdata?.org_id || newdata.id
      }&limit=50&skip=${skip ? skip : 0}`,
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        const comingData = e?.data?.data;
        if (comingData.length === 0) {
          setHasMore(false);
          setDecisionMakerData([]);
          setStrengthTableData([]);
        } else {
          setDecisionMakerData([...comingData]);
        }
      })
      // axios(option)
      //     .then((e) => {
      //         setLoading(false);
      //         setDecisionMakerData(e?.data?.data);
      //         setHasMore(false);
      //     })
      .catch(() => {
        setLoading(false);
      });
  };
  // React.useEffect(() => {
  //     if (dataForInformation) {
  //         aiDecisionMakerTable();
  //     }
  // }, [dataForInformation]);
  React.useEffect(() => {
    if (dataForInformation) {
      aiDecisionMakerTable();
    }
  }, [dataForInformation]);
  React.useEffect(() => {
    if (dataForInformation) {
      setComingOrgId(dataForInformation?.org_id);
    }
  }, [dataForInformation]);
  // React.useEffect(() => {
  //     aiDecisionMakerTable();
  // }, []);
  React.useEffect(() => {
    if (tableCommingData) {
      setCurrentLeadsLength(tableCommingData?.length);
    }
  }, [tableCommingData]);
  const handleSelectAllClick = (event) => {
    if (decisionMakerTableData.length === 0) {
      return;
    }
    if (event.target.checked) {
      const newSelecteds = decisionMakerTableData.map((row) => row.first_name);
      setSelectedRows(newSelecteds);
    } else {
      setSelectedRows([]);
    }
  };
  React.useEffect(() => {
    if (decisionMakerData?.length >= 50) {
      aiDecisionMakerTable(comingOrgId);
    }
  }, [skip]);
  return (
    <>
      {loading ? <Loader /> : null}
      <InfiniteScroll
        // rowData?.people_count (may be we need to use here)
        dataLength={decisionMakerData?.length}
        next={() => fetchMoreData()}
        hasMore={hasMore}
        scrollableTarget="DecisionMaker-table-main"
      >
        {" "}
        {strengthTableData?.length ? (
          <TableContainer
            component={Paper}
            className="DecisionMaker-table-main"
          >
            <Table
              aria-label="collapsible table"
              className="DecisionMaker-table"
            >
              <TableHead>
                <TableRow className="table-row-ai-leads">
                  <TableCell className="Decisions-row-tableNameaAndtitle">
                    Name & title
                  </TableCell>
                  <TableCell align="left" className="DecisionstableJOIStrength">
                    JOI Strength
                  </TableCell>
                  <TableCell
                    align="left"
                    className="employee-row-tableCompanydata"
                  >
                    Company
                  </TableCell>
                  <TableCell
                    align="left"
                    className="annual-row-tableIndustrySector"
                  >
                    Industry/ Sector
                  </TableCell>
                  <TableCell align="left" className="industry-row-tableStatus">
                    JOSF Status
                  </TableCell>
                  <TableCell
                    align="left"
                    className="prospects-row-tableContact"
                  >
                    Contact details
                  </TableCell>
                  <TableCell
                    align="left"
                    className="prospects-row-table"
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {strengthTableData?.map((row, index) => (
                  <React.Fragment key={index}>
                    <Row
                      row={row}
                      selected={selectedRows.includes(row.first_name)}
                      onSelect={(firstName) => {
                        const selectedIndex = selectedRows.indexOf(firstName);
                        let newSelected = [];
                        if (selectedIndex === -1) {
                          newSelected = newSelected.concat(
                            selectedRows,
                            firstName
                          );
                        } else if (selectedIndex === 0) {
                          newSelected = newSelected.concat(
                            selectedRows.slice(1)
                          );
                        } else if (selectedIndex === selectedRows.length - 1) {
                          newSelected = newSelected.concat(
                            selectedRows.slice(0, -1)
                          );
                        } else if (selectedIndex > 0) {
                          newSelected = newSelected.concat(
                            selectedRows.slice(0, selectedIndex),
                            selectedRows.slice(selectedIndex + 1)
                          );
                        }
                        setSelectedRows(newSelected);
                      }}
                    />
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="ai-leads-table-main">
            <div className="ai-leads-no-data-available-outter">
              <div className="ai-leads-no-data-available">
                No Data Available
              </div>
            </div>
          </div>
        )}
      </InfiniteScroll>
    </>
  );
}
