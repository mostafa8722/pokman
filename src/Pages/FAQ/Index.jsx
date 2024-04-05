import React from "react";
import Layout from "../../Components/Layout/Layout";
import "./Style.css"
// import ComingSoon from "../../Components/AiLeads/Comingsoon/ComingSoon";
import Faqscreen from "../../Components/FAQ/Accordian/Accordian";
import Glossary from "../../Components/FAQ/Glossary/Glossary";
const FaqLayout = () => {
  return (
    <>
      <Layout className={"paddingSet"}>
        <div className="Faqscreen-parent">
            {/* <ComingSoon/> */}
            
          <Faqscreen />
          <Glossary/>
        </div>
      </Layout>
    </>
  );
};
export default FaqLayout;