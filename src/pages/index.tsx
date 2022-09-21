import React, { useState, useEffect } from "react";
import LandingPageTemplate from "@/components/templates/LandingPageTemplate";
import PageTemplate from "@/components/templates/PageTemplate";
import Lp from "@/components/organisms/Lp";
import Top from "@/components/organisms/Top";

export default function Index() {
  const pageid = "index";
  const [isLoggedin, setLoggedin] = useState<boolean>(false);
  const [page, setPage] = useState<any>();
  const [deviceId, setDeviceId] = useState<string | null>(
    "a7382f5c-3326-4cf8-b717-549affe1c2eb"
  );

  useEffect(() => {
    if (isLoggedin) {
      setDeviceId("a7382f5c-3326-4cf8-b717-549affe1c2eb");
      setPage(
        <PageTemplate pageid={pageid}>
          <Top deviceId={deviceId} />
        </PageTemplate>
      );
    } else {
      setPage(
        <LandingPageTemplate pageid={pageid}>
          <Lp setLoggedin={setLoggedin} />
        </LandingPageTemplate>
      );
    }
  }, [isLoggedin]);

  return page;
}
