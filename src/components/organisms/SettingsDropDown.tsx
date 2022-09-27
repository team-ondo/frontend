import React from "react";
import styles from "@/styles/components/organisms/Settings.module.scss";
import { styled } from "@stitches/react";
import { indigo } from "@radix-ui/colors";

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
  width: "100%",
  cursor: "pointer",

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
  setSelectedDeviceName: React.Dispatch<React.SetStateAction<string>>;
  deviceData: any;
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

export default function DropDownSettings({
  setSettingsView,
  setSelectedDeviceName,
  deviceData,
  isLoading,
}: Props) {
  const getDeviceName = () => {
    let dropDownText = document.getElementById(
      "drop_menu_settings"
    ) as HTMLSelectElement | null;
    let selectedText = dropDownText?.options[dropDownText.selectedIndex].text;
    if (selectedText) {
      return setSelectedDeviceName(selectedText);
    }
  };

  const settingsViewChange = () => {
    getDeviceName();
    setSettingsView(SettingsViewState.Read);
  };

  if (isLoading) {
    return (
      <div className={styles.device}>
        <div className={styles.device__innner}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.device}>
          <div className={styles.device__inner}>
            <div className={styles.top__device}>
              <div className={styles.select_device}>
                <h3 className={styles.select_device__heading}>
                  Please select your device:
                </h3>
                <select
                  className={styles.select_device__menu}
                  id="drop_menu_settings"
                >
                  {deviceData.map((obj: any, i: number) => {
                    return (
                      <option key={i} value={obj.device_name}>
                        {obj.device_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.select_device__button}>
                <Button title={"Select"} onClick={() => settingsViewChange()}>
                  Select
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
