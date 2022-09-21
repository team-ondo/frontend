import React from "react";
import LandingPageTemplate from "@/components/templates/LandingPageTemplate";
import PageTemplate from "@/components/templates/PageTemplate";
import Lp from "@/components/organisms/Lp";
import Top from "@/components/organisms/Top";

export default function Index() {
  const pageid = "index";

  return (
    // <LandingPageTemplate pageid={pageid}>
    //   <Lp />
    // </LandingPageTemplate>
    <PageTemplate pageid={pageid}>
      <Top />
    </PageTemplate>
  );
}
