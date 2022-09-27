import React from "react";
import styles from "@/styles/components/organisms/Settings.module.scss";
import { styled } from "@stitches/react";
import { indigo, mauve } from "@radix-ui/colors";
import { UserData, DeviceData } from "@/pages/settings";

const Text = styled("div", {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  cursor: "pointer",
  width: 355,

  variants: {
    variant: {
      indigo: {
        backgroundColor: indigo.indigo4,
        color: indigo.indigo11,
        "&:hover": { backgroundColor: indigo.indigo5 },
        "&:focus": { boxShadow: `0 0 0 2px ${indigo.indigo7}` },
      },
    },
  },

  defaultVariants: {
    variant: "indigo",
  },
});

type Props = {
  setSettingsView: React.Dispatch<React.SetStateAction<number>>;
  selectedDeviceIndex: number;
  deviceData: any;
  userData: UserData;
  isLoading: boolean;
};

const SettingsViewState = {
  DropDown: 0,
  Read: 1,
  Change: 2,
  Updated: 3,
} as const;
type SettingsViewState =
  typeof SettingsViewState[keyof typeof SettingsViewState];

export default function SettingsRead({
  setSettingsView,
  selectedDeviceIndex,
  deviceData,
  userData,
  isLoading,
}: Props) {
  const openSettingsChange = () => {
    setSettingsView(SettingsViewState.Change);
  };

  if (isLoading) {
    return (
      <div className={styles.top}>
        <div className={styles.top__inner}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.top}>
          <div className={styles.top__inner}>
            <div className={styles.top__contents}>
              <div className={styles.user_settings}>
                <h2 className={styles.user_settings__heading}>User Settings</h2>
                <Text>First Name: {userData.first_name}</Text>
                <Text>Last Name: {userData.last_name}</Text>
                <Text>Email: {userData.email}</Text>
                <Text>Password: *****</Text>
                <Text>Phone Number: {userData.phone_number}</Text>
                <h2 className={styles.user_settings__heading}>
                  Device Settings
                </h2>
                <Text>
                  Device ID: {deviceData[selectedDeviceIndex].device_id}
                </Text>
                <Text>
                  Device Name: {deviceData[selectedDeviceIndex].device_name}
                </Text>
                <Text>
                  Device Location: {deviceData[selectedDeviceIndex].zip_code}
                </Text>
                <Text>
                  Hot Temperature Limit:{" "}
                  {deviceData[selectedDeviceIndex].temperature_upper_limit}
                </Text>
                <Text>
                  Cold Temperature Limit:{" "}
                  {deviceData[selectedDeviceIndex].temperature_lower_limit}
                </Text>
              </div>
            </div>
            <div className={styles.user_settings__button}>
              <Button onClick={() => openSettingsChange()}>
                Change Settings
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
