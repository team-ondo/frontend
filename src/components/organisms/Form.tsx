import React from "react";
import { styled } from "@stitches/react";
import { indigo, mauve, blackA } from "@radix-ui/colors";
import * as TabsPrimitive from "@radix-ui/react-tabs";

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

// Exports
export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;

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

const Form = () => (
  <Box css={{}}>
    <Tabs defaultValue="tab1">
      <TabsList aria-label="Manage your account">
        <TabsTrigger value="tab1">Sign Up</TabsTrigger>
        <TabsTrigger value="tab2">Sign In</TabsTrigger>
      </TabsList>
      {/* Sign Up */}
      <TabsContent value="tab1">
        <Text>Please register your account.</Text>
        <Fieldset>
          <Label htmlFor="firstname">First Name</Label>
          <Input id="firstname" placeholder="Yoshi" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="lastname">Last Name</Label>
          <Input id="lastname" placeholder="Kimura" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="email">Email</Label>
          <Input type="mail" id="email" placeholder="sample@example.com" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" />
          <Annotation>※Please do not include hyphen.</Annotation>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="serialnumber">Serial Number</Label>
          <Input id="serialnumber" />
          <Annotation>※Please enter the number on the device.</Annotation>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="zipcode">Zip Code</Label>
          <Input id="zipcode" />
          <Annotation>
            ※Please the zip code of the house where you want to place the
            device.
            <br />
            ※Please do not include hyphen.
          </Annotation>
        </Fieldset>
        <Flex css={{ marginTop: 20, justifyContent: "center" }}>
          <Button variant="indigo">Sign Up</Button>
        </Flex>
      </TabsContent>
      {/* Sign In */}
      <TabsContent value="tab2">
        <Text>If you already have account, please sign in here.</Text>
        <Fieldset>
          <Label htmlFor="email">Email</Label>
          <Input type="mail" id="email" placeholder="sample@example.com" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="loginPassword">Password</Label>
          <Input id="loginPassword" type="password" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" />
        </Fieldset>
        <Flex css={{ marginTop: 20, justifyContent: "center" }}>
          <Button variant="indigo">Sign In</Button>
        </Flex>
      </TabsContent>
    </Tabs>
  </Box>
);

export default Form;
