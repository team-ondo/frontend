import React from "react";
import styles from "@/styles/components/organisms/Settings.module.scss";
import { styled } from "@stitches/react";
import { indigo, mauve } from "@radix-ui/colors";
import api from "@/lib/axios_settings";
import { deviceIdState } from "@/globalStates/atoms/Auth";
import { useRecoilValue } from "recoil";

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
  width: "100%",

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

type Props = {
  setSettingsView: React.Dispatch<React.SetStateAction<number>>;
  selectedDeviceIndex: number;
  deviceData: any;
  userData: any;
};

const SettingsViewState = {
  DropDown: 0,
  Read: 1,
  Change: 2,
  Updated: 3,
} as const;
type SettingsViewState =
  typeof SettingsViewState[keyof typeof SettingsViewState];

export default function SettingsChange({
  setSettingsView,
  deviceData,
  selectedDeviceIndex,
  userData,
}: Props) {
  const deviceId = useRecoilValue<string>(deviceIdState);

  const submitSettingsChange = () => {
    let firstName = (document.getElementById("firstName") as HTMLInputElement)
      .value;
    let lastName = (document.getElementById("lastName") as HTMLInputElement)
      .value;
    let email = (document.getElementById("email") as HTMLInputElement).value;
    let phoneNumber = (
      document.getElementById("phoneNumber") as HTMLInputElement
    ).value;
    let oldPassword = (
      document.getElementById("oldPassword") as HTMLInputElement
    ).value;
    let newPassword = (
      document.getElementById("newPassword") as HTMLInputElement
    ).value;

    let deviceName = (document.getElementById("deviceName") as HTMLInputElement)
      .value;
    let hotTempSetting = (
      document.getElementById("hotTempSetting") as HTMLInputElement
    ).value;
    let coldTempSetting = (
      document.getElementById("coldTempSetting") as HTMLInputElement
    ).value;
    let zipcode = (document.getElementById("zipcode") as HTMLInputElement)
      .value;

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

    api
      .put(`/settings/device/${deviceId}`, updatedDeviceSettings)
      .then((res) => {
        console.log(res.data);
      });
    setSettingsView(SettingsViewState.Updated);
  };

  return (
    <>
      <div className={styles.change}>
        <div className={styles.change__inner}>
          <div className={styles.change__contents}>
            <h2 className={styles.change__heading}>User Settings</h2>
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
            <h2 className={styles.change__heading}>Device Settings</h2>
            <Fieldset>
              <Label htmlFor="deviceName">Device Name</Label>
              <Input
                id="deviceName"
                placeholder={deviceData[selectedDeviceIndex].device_name}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="zipcode">Zip Code (Device Location)</Label>
              <Input
                id="zipcode"
                placeholder={deviceData[selectedDeviceIndex].zip_code}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="hotTempSetting">Hot Temperature Setting</Label>
              <Input
                id="hotTempSetting"
                placeholder={
                  deviceData[selectedDeviceIndex].temperature_upper_limit
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="coldTempSetting">Cold Temperature Setting</Label>
              <Input
                id="coldTempSetting"
                placeholder={
                  deviceData[selectedDeviceIndex].temperature_lower_limit
                }
              />
            </Fieldset>
            <div className={styles.change__button}>
              <Button onClick={() => submitSettingsChange()}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
