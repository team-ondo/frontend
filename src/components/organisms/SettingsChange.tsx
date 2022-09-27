import React, { useState } from "react";
import styles from "@/styles/components/organisms/Settings.module.scss";
import { styled } from "@stitches/react";
import { indigo, mauve, tomato } from "@radix-ui/colors";
import api from "@/lib/axios_settings";
import { useForm, SubmitHandler } from "react-hook-form";
import { deviceIdState } from "@/globalStates/atoms/Auth";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

interface SettingInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  oldPassword: string;
  newPassword: string;
  deviceName: string;
  hotTempSetting: number;
  coldTempSetting: number;
  zipcode: string;
}

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

const ErrorMsg = styled("p", {
  color: tomato.tomato8,
  fontSize: 12,
  marginTop: 5,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SettingInput>();
  const [errMessage, setErrMessage] = useState<string | null>();
  const deviceId = useRecoilValue<string>(deviceIdState);
  const router = useRouter();

  const settingOnSubmit: SubmitHandler<SettingInput> = (data) => {
    setErrMessage("");
    const updatedUserSettings = {
      first_name: data.firstName ? data.firstName : userData.first_name,
      last_name: data.lastName ? data.lastName : userData.last_name,
      email: data.email ? data.email : userData.email,
      phone_number: data.phoneNumber ? data.phoneNumber : userData.phone_number,
      old_password: data.oldPassword ? data.oldPassword : userData.old_password,
      new_password: data.newPassword ? data.newPassword : userData.new_password,
    };

    const updatedDeviceSettings = {
      device_name: data.deviceName
        ? data.deviceName
        : deviceData[selectedDeviceIndex].device_name,
      temperature_upper_limit: data.hotTempSetting
        ? data.hotTempSetting
        : deviceData[selectedDeviceIndex].temperature_upper_limit,
      temperature_lower_limit: data.coldTempSetting
        ? data.coldTempSetting
        : deviceData[selectedDeviceIndex].temperature_lower_limit,
      zip_code: data.zipcode
        ? data.zipcode
        : deviceData[selectedDeviceIndex].zip_code,
    };

    api
      .put(`/settings/user/`, updatedUserSettings)
      .then((res) => {
        console.log(res.data);
        router.reload();
      })
      .catch((error: any) => {
        if (error.response.status === 422) {
          setErrMessage(error.response.data.detail[0].msg);
        } else {
          setErrMessage(error.response.data.detail);
        }
      });

    api
      .put(`/settings/device/${deviceId}`, updatedDeviceSettings)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error: any) => {
        if (error.response.status === 422) {
          setErrMessage(error.response.data.detail[0].msg);
        } else {
          setErrMessage(error.response.data.detail);
        }
      });
    setSettingsView(SettingsViewState.Updated);
  };

  return (
    <>
      <form onSubmit={handleSubmit(settingOnSubmit)}>
        <div className={styles.change}>
          <div className={styles.change__inner}>
            <div className={styles.change__contents}>
              {errMessage ? (
                <ErrorMsg css={{ marginBottom: 10 }}>{errMessage}</ErrorMsg>
              ) : (
                ""
              )}
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
                <Input
                  id="email"
                  placeholder={userData.email}
                  {...register("email", {
                    pattern: {
                      value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                      message: "* Invalid email address",
                    },
                  })}
                />
                <ErrorMsg>{errors.email?.message}</ErrorMsg>
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
                <Label htmlFor="coldTempSetting">
                  Cold Temperature Setting
                </Label>
                <Input
                  id="coldTempSetting"
                  placeholder={
                    deviceData[selectedDeviceIndex].temperature_lower_limit
                  }
                />
              </Fieldset>
              <div className={styles.change__button}>
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
