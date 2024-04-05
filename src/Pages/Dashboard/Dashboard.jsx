import React, { useEffect } from "react";
import "./Dashboard.css";
import Layout from "../../Components/Layout/Layout";
import InfoDashboard from "../../Components/InfoDashboard/InfoDashboard";
import TwitterFeed from "../../Components/TwitterFeed/TwitterFeed";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import { GetOktaAuthData } from "../../Utils/Utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useOktaAuth();
  const getAuthData = GetOktaAuthData();
    useEffect(() => {
      const authId = getAuthData?.user?.id;
      if (authId?.length > 0) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }, [getAuthData?.user?.id, navigate]);

  useEffect(() => {
    const getUser = async () => {
      try {
      } catch (error) {}
    };

    const fetchState = () => {
      auth.oktaAuth.token
        .parseFromUrl()
        .then(async () => {

        })
        .catch(() => {});
    };
    fetchState();

    auth.authState?.isAuthenticated && getUser();
  }, [auth.authState, auth.oktaAuth]);
  return (
    <Layout>
      <div className="child-section-of-everypage">
        <InfoDashboard />
        <TwitterFeed />
      </div>
    </Layout>
  );
};

export default Dashboard;
