import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Settings.module.scss";
import PageTemplate from "@/components/templates/PageTemplate";
import SettingsRead from "@/components/organisms/SettingsRead";
import SettingsChange from "@/components/organisms/SettingsChange";
import SettingsDropDown from "@/components/organisms/SettingsDropDown";
import api from "@/lib/axios_settings";
import { useRecoilValue } from "recoil";
import { loginState } from "@/globalStates/atoms/Auth";
import { useRouter } from "next/router";

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

const SettingsViewState = {
  DropDown: 0,
  Read: 1,
  Change: 2,
  Updated: 3,
} as const;
type SettingViewState =
  typeof SettingsViewState[keyof typeof SettingsViewState];

export default function SettingsIndex() {
  const [settingsView, setSettingsView] = useState<number>(
    SettingsViewState.DropDown
  );
  const [userData, setUserData] = useState<any>({});
  const [deviceData, setDeviceData] = useState<any>([]);
  const [selectedDeviceName, setSelectedDeviceName] = useState<string>("");
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pageid = "settings";

  const isLoggedin = useRecoilValue<boolean>(loginState);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedin) {
      api.get(`/settings/user`).then((res) => {
        setUserData(res.data);
      });
      api.get(`/settings/device/`).then((res) => {
        setDeviceData(res.data);
        setIsLoading(false);
      });
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    let index: number = deviceData.findIndex(
      (e: { device_name: string }) => e.device_name === selectedDeviceName
    );
    if (index === -1) {
      index = 0;
    }
    setSelectedDeviceIndex(index);
  }, [selectedDeviceName]);

  if (isLoggedin) {
    return (
      <PageTemplate pageid={pageid}>
        {settingsView === SettingsViewState.Read ? (
          <SettingsRead
            setSettingsView={setSettingsView}
            selectedDeviceIndex={selectedDeviceIndex}
            deviceData={deviceData}
            userData={userData}
            isLoading={isLoading}
          />
        ) : settingsView === SettingsViewState.Change ? (
          <SettingsChange
            setSettingsView={setSettingsView}
            selectedDeviceIndex={selectedDeviceIndex}
            deviceData={deviceData}
            userData={userData}
          />
        ) : settingsView === SettingsViewState.Updated ? (
          <div className={styles.settings_updated}>
            Settings Updated
            <br></br>
            <br></br> Please wait a moment...
          </div>
        ) : (
          <SettingsDropDown
            setSettingsView={setSettingsView}
            setSelectedDeviceName={setSelectedDeviceName}
            deviceData={deviceData}
            isLoading={isLoading}
          />
        )}
      </PageTemplate>
    );
  } else {
    return "";
  }
}
