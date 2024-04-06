import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import "./Style.css";
import AiLeadsTable from "../../Components/AiLeads/Table/Table";
import LeadsFilter from "../../Components/AiLeads/Filter/LeadsFilter";
import AiLeadsAction from "../../Components/AiLeads/AiLeadsButton/AiLeadsAction";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { APIUrlOne, setLeadsFilterStatsData } from "../../Utils/Utils";

const AILeads = () => {
  const [tableCommingData, setTableCommingData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState([]);
  const [istableDataFilter, setIstableDataFilter] = React.useState(false);
  const [currentLeadsLength, setCurrentLeadsLength] = React.useState('');
  const [isDecisionMakerExcel, setIsDecisionMakerExcel] = useState(false);
  const [isSalesForceTrigger, setIsSalesForceTrigger] = useState(false);
  const [page, setPage] = React.useState(1);
  const [showData, setShowData] = React.useState([]);
  const [showlast, setShowlast] = React.useState([]);
  const [jScoredata, setJscore] = React.useState([]);
  const [statsCount, setStatsCount] = useState(0);
  const validateFilters = () => {
    if (!selectedData?.length && !showlast?.length && !jScoredata?.length) {
      toast.error("Please Select Filters");
      return false;
    }
    return true;
  }
  const duplicateApply = (e) => {

    if (!validateFilters()) return;
    setLoading(true);
    const data = {};
    data.categories = selectedData;
    data.revenue_range = showlast;
    data.j_score = jScoredata?.[0];
    const option = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/apply_org_filter?limit=50&skip=0`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((e) => {
        setTimeout(()=>      setLoading(false),100)
        const comingData = e?.data?.data;
        const statsCount = e?.data?.count;
        setStatsCount(statsCount);
        setPage(1);
        // setLeadsFilterStatsData('filterstatscount', statsCount);
        if (comingData.length === 0 || comingData.length % 50 !==0) {
          setHasMore(false);
        } else {
          setTimeout(() => {
            setHasMore(true);
          }, 1000);
        }
        if (page > 1) {
          // setTableCommingData(prevData => [...prevData, ...comingData]);
          setTableCommingData(comingData);
        }
        else {
          setTableCommingData(comingData);
        }
        if (comingData.length === 0) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleApply = (e) => {
    if (!validateFilters()) return;
  
    if(statsCount<=tableCommingData.length) return ;
    setHasMore(false);
    setLoading(true);
    const data = {};
    data.categories = selectedData;
    data.revenue_range = showlast;
    data.j_score = jScoredata?.[0];
    const option = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/apply_org_filter?limit=50&skip=${(page - 1) * 50}`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((e) => {
      setTimeout(()=>      setLoading(false),100)
        const comingData = e?.data?.data;
        const statsCount = e?.data?.count;
        setStatsCount(statsCount);
        // setLeadsFilterStatsData('filterstatscount', statsCount);
     
        if (comingData.length % 50 !== 0 || comingData.length===0) {

          setHasMore(false);
        } else {
          setTimeout(()=>{ setHasMore(true);},1000)
        }
        if (page > 1) {
          setTableCommingData(prevData => [...prevData, ...comingData]);
        }
        else {
          setTableCommingData(comingData);
        }
        if (comingData.length === 0) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <Layout>
        {loading ? <Loader /> : null}
        <div className="child-section-of-everypage  ">
          <InfiniteScroll
            dataLength={tableCommingData.length}
            next={() => setPage(prevPage => prevPage + 1)}
            hasMore={hasMore}
            // loader={<Loader />}
          />
          <AiLeadsAction
            currentLeadsLength={currentLeadsLength}
            setIsDecisionMakerExcel={setIsDecisionMakerExcel}
            setIsSalesForceTrigger={setIsSalesForceTrigger}
            isSalesForceTrigger={isSalesForceTrigger}
            statsCount={statsCount}
          />
          <LeadsFilter
            showlast={showlast}
            setShowlast={setShowlast}
            setJscore={setJscore}
            jScoredata={jScoredata}
            selectedData={selectedData}
            showData={showData}
            setShowData={setShowData}
            setSelectedData={setSelectedData}
            handleApply={() => { duplicateApply() }}
            tableCommingData={tableCommingData}
            setTableCommingData={setTableCommingData}
            istableDataFilter={istableDataFilter}
            setIstableDataFilter={setIstableDataFilter}
            setStatsCount={setStatsCount}
            setPage={setPage}
          />
          <AiLeadsTable
            handleApply={handleApply}
            tableCommingData={tableCommingData}
            setTableCommingData={setTableCommingData}
            istableDataFilter={istableDataFilter}
            setCurrentLeadsLength={setCurrentLeadsLength}
            setIstableDataFilter={setIstableDataFilter}
            isSalesForceTrigger={isSalesForceTrigger}
            isDecisionMakerExcel={isDecisionMakerExcel}
            setIsDecisionMakerExcel={setIsDecisionMakerExcel}
          />
        </div>
      </Layout>
    </>
  );
};
export default AILeads;
