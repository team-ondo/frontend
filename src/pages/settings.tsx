import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import SettingsRead from "@/components/organisms/SettingsRead";
import SettingsChange from "@/components/organisms/SettingsChange";

export default function SettingsIndex() {
  const [settingsView, setSettingsView] = useState<string>("read settings");

  const pageid = "settings";

  return (
    <PageTemplate pageid={pageid}>
      {settingsView === "read settings" ? (
        <SettingsRead
          setSettingsView={setSettingsView}
          settingsView={settingsView}
        />
      ) : (
        <SettingsChange
          setSettingsView={setSettingsView}
          settingsView={settingsView}
        />
      )}
    </PageTemplate>
  );
}
