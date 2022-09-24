import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Settings.module.scss";
import { styled } from "@stitches/react";
import { indigo, mauve, blackA } from "@radix-ui/colors";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import api from "../../lib/axios_settings";

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
  setSettingsView: React.Dispatch<React.SetStateAction<string>>;
  settingsView: React.Dispatch<React.SetStateAction<string>>;
};

export default function SettingsRead({
  setSettingsView: setSettingsView,
  settingsView: settingsView,
}: Props) {

  const [userData, setUserData] = useState<any>({});
  const [deviceData, setDeviceData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    sessionStorage.setItem(
      "ondo-token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjM4Mjk3MDd9.7fYABOWQe5WCpdnQ1Mjef3JMuqus21c6acwW4nL7Kj4"
    );
    api.get(`/settings/user`).then((res) => {
      setUserData(res.data);
    });
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "ondo-token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjM4Mjk3MDd9.7fYABOWQe5WCpdnQ1Mjef3JMuqus21c6acwW4nL7Kj4"
    );
    api.get(`/settings/device/`).then((res) => {
      setDeviceData(res.data);
      setIsLoading(false);
    });
  }, []);

  const openSettingsChange = () => {
    setSettingsView("change settings");
  };

  if (isLoading === true) {
    return <div className="loading">Loading...</div>
  } else {
      return (
        <>
        <div className="user-settings">
          <h2>User Settings</h2>
          <br></br>
          <Text>First Name: {userData.first_name}</Text>
          <Text>Last Name: {userData.last_name}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Phone Number: {userData.phone_number}</Text>
        </div>
        <div className="device-settings">
          <h2>Device Settings</h2>
          <br></br>
          <Text>Device ID: {deviceData[0].device_id}</Text>
          <Text>Device Name: {deviceData[0].device_name}</Text>
          <Text>Device Location: {deviceData[0].zip_code}</Text>
          <Text>Hot Temperature Limit: {deviceData[0].temperature_upper_limit}</Text>
          <Text>
            Cold Temperature Limit: {deviceData[0].temperature_lower_limit}
          </Text>
          <Button onClick={() => openSettingsChange()}>Change Settings</Button>
        </div>
      </>
    );
  }
}
