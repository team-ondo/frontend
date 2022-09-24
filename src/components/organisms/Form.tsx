import React from "react";
import { styled } from "@stitches/react";
import { indigo, mauve, blackA, tomato } from "@radix-ui/colors";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import Login from "@/components/molecules/Login";
import Signup from "@/components/molecules/Signup";

type Props = {
  setLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
};

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

// Exports
export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;

const Box = styled("div", {
  display: "flex",
  justifyContent: "center",
});

export default function Form({ setLoggedin }: Props) {
  return (
    <Box>
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Manage your account">
          <TabsTrigger value="tab1">Sign Up</TabsTrigger>
          <TabsTrigger value="tab2">Sign In</TabsTrigger>
        </TabsList>
        {/* Sign Up */}
        <Signup setLoggedin={setLoggedin} />
        {/* Sign In */}
        <Login setLoggedin={setLoggedin} />
      </Tabs>
    </Box>
  );
}
