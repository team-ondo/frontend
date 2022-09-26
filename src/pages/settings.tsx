import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import SettingsRead from "@/components/organisms/SettingsRead";
import SettingsChange from "@/components/organisms/SettingsChange";
import SettingsDropDown from "@/components/organisms/SettingsDropDown";
import api from "@/lib/axios_settings";

export type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export type DeviceData = {
  device_id: number;
  device_name: string;
  zip_code: string;
  temperature_upper_limit: number;
  temperature_lower_limit: number;
};

const SettingsViewState = { DropDown: 0, Read: 1, Change: 2, Updated: 3 } as const; 
type SettingViewState = typeof SettingsViewState[keyof typeof SettingsViewState];

export default function SettingsIndex() {
  const [settingsView, setSettingsView] = useState<number>(SettingsViewState.DropDown);
  const [userData, setUserData] = useState<{}>({});
  const [deviceData, setDeviceData] = useState<[]>([]);
  const [selectedDeviceName, setSelectedDeviceName] =
    useState<string>("hello ondo");
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // console.log(selectedDeviceName);
  // console.log("SETTINGS", selectedDeviceIndex);
  const pageid = "settings";

  useEffect(() => {
    api.get(`/settings/user`).then((res) => {
      setUserData(res.data);
    });
    api.get(`/settings/device/`).then((res) => {
      setDeviceData(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const index: number = deviceData.findIndex(
      (e: {}) => e.device_name === selectedDeviceName
    );
    setSelectedDeviceIndex(index);
  }, [selectedDeviceName]);

  // console.log("SETTINGS", selectedDeviceIndex);
  // console.log(settingsView);

  return (
    <PageTemplate pageid={pageid}>
        {settingsView === SettingsViewState.Read ? (
          <SettingsRead
            setSettingsView={setSettingsView}
            settingsView={settingsView}
            selectedDeviceName={selectedDeviceName}
            selectedDeviceIndex={selectedDeviceIndex}
            deviceData={deviceData}
            userData={userData}
            isLoading={isLoading}
          />
        ) : settingsView === SettingsViewState.Change ? (
          <SettingsChange
            setSettingsView={setSettingsView}
            settingsView={settingsView}
            selectedDeviceName={selectedDeviceName}
            selectedDeviceIndex={selectedDeviceIndex}
            deviceData={deviceData}
            userData={userData}
            isLoading={isLoading}
          />
        ) : settingsView === SettingsViewState.Updated ? (
          <div className="settings_updated">
            Settings Updated!
            <br></br><br></br> Please wait a moment...
          </div>
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
    </PageTemplate>
  );
}
