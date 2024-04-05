import * as React from "react";
import PropTypes from "prop-types";
import "./Style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import decisionMakerImage from "../../../../Assets/Cloudfigma.svg";
import ContactDetailList from "../../../AiLeads/ContactDetailList/ContactDetailList";
import emptyfile from "../../../../Assets/emptyfile.svg";
import InfiniteScroll from "react-infinite-scroll-component";

function Row({ row }) {
  const getColor = (aiScore) => {
    if (aiScore > 80) {
      return "green";
    } else if (aiScore >= 50 && aiScore <= 80) {
      return "yellow";
    } else {
      return "red";
    }
  };
  const color = getColor(row.ai_score);
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className="row-in-prospect-table-aiprofile"
      >
        <TableCell className="Decision-maker-userTeblesell" align="left">
          <img
            className={
              row?.suspect_status ? "decisionMakerImage" : "hide-image"
            }
            src={decisionMakerImage}
            alt=""
          />
          <div className="Decision-maker-user-name-main-container">
            <div className={`${row?.decision_maker ? 'Decision-maker-user-name' : 'border-change'}`}>
              {/* <p>DL</p> */}
              {/* <p className="letter-heading">{row?.first_name ? row?.first_name?.split(" ")?.find(item=>!item.includes('('))?.charAt(0) : ""} {row?.last_name ? row?.last_name?.split(" ")?.find(item=>!item.includes('('))?.charAt(0) : ""}</p> */}

              <p className="Front-name">{row?.first_name ? row?.first_name?.substring(0, 2) : ""}</p>
            </div>
            <div>
          
              <h3 className="company-name-country">{row?.first_name ? row?.first_name : "-"} {row?.last_name ? row?.last_name : "-"}</h3>
              <p className="after-company-name-country">{row?.primary_job_title?.substring(0,30) + (row?.primary_job_title?.length > 10 ? "..." : "")}</p>
            </div>
          </div>
        </TableCell>
        {/* <TableCell align="left" className="Decision-maker-Score-tablecell"> */}
        {/* <div
            className="ai-score-background"
            style={{
              background:
                color === "red"
                  ? "#DA291C"
                  : color === "yellow"
                    ? "#EAB121"
                    : color === "green"
                      ? "#0EB93E"
                      : null,
            }}
          >
            {row?.ai_score}
          </div> */}
        {/* - */}
        {/* </TableCell> */}
        <TableCell align="left">
          <h3 className="annual-revenue-table">{row?.primary_organization ? row?.primary_organization : "-"}</h3>
        </TableCell>
        <TableCell
          align="left"
          className="table-cell-of-contact-details-dropdown-th"
        >
          <div>
            <div className="email-and-other-info">
              <div className="maked-component-of-dropdown">
                <ContactDetailList item={row} />
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
const rows = [1, 1, 1, 1, 1];
export default function ProspectProfileTable({ tableShowResult, resultRetrieve,fetchMoreData, hasMore}) {
  return (
    <div className="ai-profile-table-main">

      {tableShowResult ?

<>
<InfiniteScroll
  dataLength={resultRetrieve?.length}
  next={() => fetchMoreData()}
  hasMore={hasMore}
  scrollableTarget="DecisionMaker-table-main-profile"
>
        <TableContainer
          component={Paper}
          className="DecisionMaker-table-main-profile"
        >
          <Table aria-label="collapsible table" className="DecisionMaker-table">
            <TableHead>
              <TableRow className="table-row-ai-leads ">
                <TableCell className="Decisions-row-table ">Name & title</TableCell>
                {/* <TableCell
                  className="col-1"
                >
                  Score
                </TableCell> */}
                <TableCell className="Decisions-row-table-company ">
                  Company
                </TableCell>
                <TableCell className="Decisions-row-table-detaial ">
                  Contact details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultRetrieve?.map((row, index) => (
                <React.Fragment key={index}>
                  <Row
                    key={row?.name}
                    row={row}
                  />
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </InfiniteScroll>
        </>
        :
        <TableContainer component={Paper} className="aiprofile-table-container">
          <Table aria-label="collapsible table" className="ai-leads-table-empty">
            <TableHead>
              <TableRow className="table-row-ai-leads"></TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                <TableCell colSpan={4} className="tCell-table-outer-main">
                  <div className="empty-container-div-main">
                    <div className="icon-and-backgroundimage">
                      <div className="empty-icon-div"></div>
                      <div>
                        <img src={emptyfile} alt="" className="empty-icon-image" />
                      </div>
                    </div>
                    <p className="no-result-found-empty">No result for now</p>
                    <p className="add-filter-empty">
                      Please add filters to view results
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      }
    </div>
    // <>
    // </>
  );
}