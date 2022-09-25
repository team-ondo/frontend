import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import SettingsRead from "@/components/organisms/SettingsRead";
import SettingsChange from "@/components/organisms/SettingsChange";
import SettingsDropDown from "@/components/organisms/SettingsDropDown";
import api from "../lib/axios_settings";

export default function SettingsIndex() {
  const [settingsView, setSettingsView] =
    useState<string>("drop down settings");
  const [userData, setUserData] = useState<{}>({});
  const [deviceData, setDeviceData] = useState<[]>([]);
  const [selectedDeviceName, setSelectedDeviceName] =
    useState<string>("hello ondo");
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(selectedDeviceName);
  console.log("SETTINGS", selectedDeviceIndex);
  const pageid = "settings";

  useEffect(() => {
    api.get(`/settings/user`).then((res) => {
      setUserData(res.data);
    });
  }, []);

  useEffect(() => {
    api.get(`/settings/device/`).then((res) => {
      setDeviceData(res.data);
      console.log(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const index: number = deviceData.findIndex(
      (e: {}) => e.device_name === selectedDeviceName
    );
    setSelectedDeviceIndex(index);
  }, [selectedDeviceName]);

  console.log("SETTINGS", selectedDeviceIndex);
  console.log(settingsView);

  return (
    <PageTemplate pageid={pageid}>
      <div className="settings_page">
        {settingsView === "read settings" ? (
          <SettingsRead
            setSettingsView={setSettingsView}
            settingsView={settingsView}
            selectedDeviceName={selectedDeviceName}
            selectedDeviceIndex={selectedDeviceIndex}
            deviceData={deviceData}
            userData={userData}
            isLoading={isLoading}
          />
        ) : settingsView === "change settings" ? (
          <SettingsChange
            setSettingsView={setSettingsView}
            settingsView={settingsView}
            selectedDeviceName={selectedDeviceName}
            selectedDeviceIndex={selectedDeviceIndex}
            deviceData={deviceData}
            userData={userData}
            isLoading={isLoading}
          />
        ) : (
          <SettingsDropDown
            setSettingsView={setSettingsView}
            settingsView={settingsView}
            setSelectedDeviceName={setSelectedDeviceName}
            selectedDeviceName={selectedDeviceName}
            selectedDeviceIndex={selectedDeviceIndex}
            setSelectedDeviceIndex={setSelectedDeviceIndex}
            setDeviceData={setDeviceData}
            deviceData={deviceData}
            userData={userData}
            deviceData={deviceData}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        )}
      </div>
    </PageTemplate>
  );
}
