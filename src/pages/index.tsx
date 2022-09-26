import React, { useState, useEffect } from "react";
import LandingPageTemplate from "@/components/templates/LandingPageTemplate";
import PageTemplate from "@/components/templates/PageTemplate";
import Lp from "@/components/organisms/Lp";
import Top from "@/components/organisms/Top";
import api from "@/lib/axios_settings";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, deviceIdState } from "@/globalStates/atoms/Auth";

export default function Index() {
  const pageid = "index";
  const [page, setPage] = useState<any>();
  const [isLoggedin, setLoggedin] = useRecoilState<boolean>(loginState);
  const setDeviceId = useSetRecoilState<string>(deviceIdState);

  useEffect(() => {
    if (isLoggedin) {
      api
        .get("/user/devices")
        .then((res) => {
          setDeviceId(res.data[0].device_id);
          setPage(
            <PageTemplate pageid={pageid}>
              <Top />
            </PageTemplate>
          );
        })
        .catch((error: any) => {
          setLoggedin(false);
        });
    } else {
      setPage(
        <LandingPageTemplate pageid={pageid}>
          <Lp />
        </LandingPageTemplate>
      );
    }
  }, [isLoggedin]);

  return page;
}
