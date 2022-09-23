import React, { useState, useEffect } from "react";
import LandingPageTemplate from "@/components/templates/LandingPageTemplate";
import PageTemplate from "@/components/templates/PageTemplate";
import Lp from "@/components/organisms/Lp";
import Top from "@/components/organisms/Top";
import api from "@/lib/axios_settings";
import Cookies from "js-cookie";

export default function Index() {
  const pageid = "index";
  const [isLoggedin, setLoggedin] = useState<boolean>(
    Cookies.get("access_token") ? true : false
  );
  const [page, setPage] = useState<any>();

  useEffect(() => {
    if (isLoggedin) {
      api
        .get("/user/devices")
        .then((res) => {
          setPage(
            <PageTemplate pageid={pageid}>
              <Top deviceId={res.data[0].device_id} />
            </PageTemplate>
          );
        })
        .catch((error: any) => {
          setLoggedin(false);
        });
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
