import React from "react";
import LandingPageTemplate from "@/components/templates/LandingPageTemplate";
import Lp from "@/components/organisms/Lp";

export default function Index() {
  const pageid = "index";

  return (
    <LandingPageTemplate pageid={pageid}>
      <Lp />
    </LandingPageTemplate>
  );
}
