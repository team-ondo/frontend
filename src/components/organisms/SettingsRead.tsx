import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Settings.module.scss";
import { styled } from "@stitches/react";
import { indigo, mauve, blackA } from "@radix-ui/colors";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import api from "../../lib/axios_settings";
import { UserData, DeviceData } from "@/pages/settings";

const StyledTabs = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
  width: 350,
  boxShadow: `0 2px 10px ${blackA.blackA4}`,
  borderRadius: 4,
});

const StyledList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: "flex",
  borderBottom: `1px solid ${mauve.mauve6}`,
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "white",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  lineHeight: 1,
  color: mauve.mauve11,
  userSelect: "none",
  "&:first-child": { borderTopLeftRadius: 6 },
  "&:last-child": { borderTopRightRadius: 6 },
  "&:hover": { color: indigo.indigo11 },
  '&[data-state="active"]': {
    color: indigo.indigo11,
    boxShadow: "inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",
    backgroundColor: indigo.indigo3,
  },
  "&:focus": { position: "relative" },
});

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: 20,
  backgroundColor: "white",
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: "none",
});

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: "unset",
  backgroundColor: "white",
  width: 25,
  height: 25,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  "&:hover": { backgroundColor: indigo.indigo3 },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: indigo.indigo11,
});

// Exports
export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;
export const Checkbox = StyledCheckbox;
export const CheckboxIndicator = StyledIndicator;

const Box = styled("div", {
  display: "flex",
  justifyContent: "center",
});
const Flex = styled("div", { display: "flex" });

const Text = styled("div", {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

const Annotation = styled("p", {
  marginTop: 5,
  color: mauve.mauve11,
  fontSize: 12,
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
const Fieldset = styled("fieldset", {
  all: "unset",
  marginBottom: 15,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const Label = styled("label", {
  fontSize: 13,
  lineHeight: 1,
  marginBottom: 10,
  color: indigo.indigo12,
  display: "block",
});

const Input = styled("input", {
  all: "unset",
  flex: "1 0 auto",
  borderRadius: 4,
  padding: "0 10px",
  fontSize: 15,
  lineHeight: 1,
  color: indigo.indigo11,
  boxShadow: `0 0 0 1px ${indigo.indigo7}`,
  height: 35,
  "&:focus": { boxShadow: `0 0 0 2px ${indigo.indigo8}` },
  "&::placeholder": { color: mauve.mauve7 },
});

const FieldCheck = styled("fieldset", {
  all: "unset",
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const CheckLink = styled("a", {
  color: indigo.indigo11,
  textDecoration: "underline",
  "&:visited": { color: indigo.indigo11 },
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
            </div>
            <div className={styles.device_settings}>
              <h2 className={styles.user_settings__heading}>Device Settings</h2>
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
