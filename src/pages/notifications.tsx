import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import Notifications from "@/components/organisms/Notifications";
import { useRecoilValue } from "recoil";
import { loginState } from "@/globalStates/atoms/Auth";
import { useRouter } from "next/router";

export default function NotificationsIndex() {
  const pageid = "notifications";

  const [page, setPage] = useState<any>();
  const isLoggedin = useRecoilValue<boolean>(loginState);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedin) {
      setPage(
        <PageTemplate pageid={pageid}>
          <Notifications />
        </PageTemplate>
      );
    } else {
      router.push("/");
    }
  }, [isLoggedin]);

  return page;
}
