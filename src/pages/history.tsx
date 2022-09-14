import React from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import History from "@/components/organisms/History";

export default function Index() {
  const pageid = "history";

  return (
    <PageTemplate pageid={pageid}>
      <History />
    </PageTemplate>
  );
}
