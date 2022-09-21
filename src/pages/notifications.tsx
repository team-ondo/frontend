import React from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import Notifications from "@/components/organisms/Notifications";

export default function NotificationsIndex() {
  const pageid = "notifications";

  return (
    <PageTemplate pageid={pageid}>
      <Notifications />
    </PageTemplate>
  );
}
