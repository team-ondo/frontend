import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Settings.module.scss";
import { styled } from "@stitches/react";
import { indigo, mauve, blackA } from "@radix-ui/colors";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import api from "@/lib/axios_settings";

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
  deviceData: React.Dispatch<React.SetStateAction<[]>>;
  userData: React.Dispatch<React.SetStateAction<{}>>;
};

const SettingsViewState = {
  DropDown: 0,
  Read: 1,
  Change: 2,
  Updated: 3,
} as const;
type SettingViewState =
  typeof SettingsViewState[keyof typeof SettingsViewState];

export default function SettingsChange({
  setSettingsView,
  deviceData,
  selectedDeviceIndex,
  userData,
}: Props) {
  const submitSettingsChange = () => {
    let firstName = (document.getElementById("firstName") as HTMLInputElement).value;
    let lastName = (document.getElementById("lastName") as HTMLInputElement).value;
    let email = (document.getElementById("email") as HTMLInputElement).value;
    let phoneNumber = (document.getElementById("phoneNumber") as HTMLInputElement).value;
    let oldPassword = (document.getElementById("oldPassword") as HTMLInputElement).value;
    let newPassword = (document.getElementById("newPassword") as HTMLInputElement).value;

    let deviceName = (document.getElementById("deviceName") as HTMLInputElement).value;
    let hotTempSetting = (document.getElementById("hotTempSetting") as HTMLInputElement).value;
    let coldTempSetting = (document.getElementById("coldTempSetting") as HTMLInputElement).value;
    let zipcode = (document.getElementById("zipcode") as HTMLInputElement).value;

    const updatedUserSettings: {} = {
      // comments contain original data
      first_name: firstName ? firstName : userData.first_name, // Akemi
      last_name: lastName ? lastName : userData.last_name, // Kimura
      email: email ? email : userData.email, //test@test.com
      phone_number: phoneNumber ? phoneNumber : userData.phone_number, //090-0000-0000
      old_password: oldPassword ? oldPassword : userData.old_password, //secretPassword
      new_password: newPassword ? newPassword : "secretPassword",
    };

    const updatedDeviceSettings: {} = {
      device_name: deviceName
        ? deviceName
        : deviceData[selectedDeviceIndex].device_name, //Roppongi_Device
      temperature_upper_limit: hotTempSetting
        ? hotTempSetting
        : deviceData[selectedDeviceIndex].temperature_upper_limit, //30.2
      temperature_lower_limit: coldTempSetting
        ? coldTempSetting
        : deviceData[selectedDeviceIndex].temperature_lower_limit, //27?
      zip_code: zipcode ? zipcode : deviceData[selectedDeviceIndex].zip_code, //1001701
    };

    api.put(`/settings/user/`, updatedUserSettings).then((res) => {
      console.log(res.data);
      location.reload();
    });

    api.put(`/settings/device/`, updatedDeviceSettings).then((res) => {
      console.log(res.data);
    });
    setSettingsView(SettingsViewState.Updated);
  };

  return (
    <>
      <div className={styles.top}>
        <div className={styles.top__inner}>
          <h2>User Settings</h2>
          <Fieldset>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder={userData.first_name} />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder={userData.last_name} />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder={userData.email} />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input id="oldPassword" type="password" />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" placeholder={userData.phone_number} />
          </Fieldset>
          <h2>Device Settings</h2>
          <Fieldset>
            <Label htmlFor="deviceName">Device Name</Label>
            <Input id="deviceName" placeholder={deviceData[selectedDeviceIndex].device_name} />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="zipcode">Zip Code (Device Location)</Label>
            <Input id="zipcode" placeholder={deviceData[selectedDeviceIndex].zip_code} />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="hotTempSetting">Hot Temperature Setting</Label>
            <Input
              id="hotTempSetting"
              placeholder={deviceData[selectedDeviceIndex].temperature_upper_limit}
            />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="coldTempSetting">Cold Temperature Setting</Label>
            <Input
              id="coldTempSetting"
              placeholder={deviceData[selectedDeviceIndex].temperature_lower_limit}
            />
          </Fieldset>
          <Button onClick={() => submitSettingsChange()}>Submit</Button>
        </div>
      </div>
    </>
  );
}
