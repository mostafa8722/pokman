import React, { useEffect, useState } from "react";
import "./Style.css";
import Layout from "../../../Components/Layout/Layout";
import CompanyProfile from "../../../Components/AiLeads/CompanyProfile/Index";
import CompanyProfileTabs from "../../../Components/AiLeads/CompanyProfileTabs/Index";
import { useLocation } from "react-router-dom/dist";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import { APIUrlOne } from "../../../Utils/Utils";
const AILeads = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const newdata = location?.state?.data;
  const [dataForInformation, setDataForInformation] = useState('');
  const informationData = () => {
    setLoading(true);
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/get_org_description?org_id=${newdata?.org_id || newdata.id}`,
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        if (e?.status === 200) {
          setDataForInformation(e?.data?.data[0]);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    if (newdata) {
      informationData()
    }
  }, [newdata])
  return (
    <>
      {
        loading ? <Loader /> : null
      }
      <Layout>
        <div className="">
          <div className="child-section-of-everypage-CompanyProfileScreen">
            <CompanyProfile dataForInformation={dataForInformation} />
          </div>
          <div className="child-section-CompanyProfileTabs">
            {/* <CompanyProfileTabs dataForInformation={dataForInformation} /> */}
            <CompanyProfileTabs dataForInformation={dataForInformation} rowData={newdata} />
          </div>
        </div>
      </Layout>
    </>
  );
};
export default AILeads;