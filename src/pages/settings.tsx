import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import SettingsRead from "@/components/organisms/SettingsRead";
import SettingsChange from "@/components/organisms/SettingsChange";
import SettingsDropDown from "@/components/organisms/SettingsDropDown";

export default function SettingsIndex() {
  const [settingsView, setSettingsView] = useState<string>("drop down settings");
  const [deviceSelection, setDeviceSelection] = useState<string>("hello ondo");

  console.log(deviceSelection);

  const pageid = "settings";

  return (
    <PageTemplate pageid={pageid}>
      <div className="settings_page">
        {settingsView === "drop down settings" ? (
          <SettingsDropDown
            setSettingsView={setSettingsView}
            settingsView={settingsView}
            setDeviceSelection={setDeviceSelection}
            deviceSelection={deviceSelection}
          />
        ) : (
          <SettingsRead
            setSettingsView={setSettingsView}
            settingsView={settingsView}
            deviceSelection={deviceSelection}
          />
        )}
      </div>
    </PageTemplate>
  );
}
