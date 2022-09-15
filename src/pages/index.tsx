import React from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import Top from "@/components/organisms/Top";

export default function Index() {
  const pageid = "index";

  return (
    <PageTemplate pageid={pageid}>
      <Top />
    </PageTemplate>
  );
}
