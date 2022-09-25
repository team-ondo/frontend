import React, { useEffect, useState } from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import History from "@/components/organisms/History";
import { useRecoilState } from "recoil";
import { loginState } from "@/globalStates/atoms/Auth";
import { useRouter } from "next/router";

export default function HistoryIndex() {
  const pageid = "history";

  const [page, setPage] = useState<any>();
  const [isLoggedin, setLoggedin] = useRecoilState<boolean>(loginState);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedin) {
      setPage(
        <PageTemplate pageid={pageid}>
          <History />
        </PageTemplate>
      );
    } else {
      router.push("/");
    }
  }, [isLoggedin]);

  return page;
}
