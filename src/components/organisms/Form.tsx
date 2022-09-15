import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "@/styles/components/organisms/Form.module.scss";
import SignUp from "@/components/organisms/SignUp";

export default function Form() {
  return (
    <div>
      <Tabs.Root className={styles.tabs__root}>
        <Tabs.List className={styles.tabs__list}>
          <Tabs.Trigger value="tab1" className={styles.tabs__trigger}>Sign up</Tabs.Trigger>
          <Tabs.Trigger value="tab2" className={styles.tabs__trigger}>Sign in</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <SignUp />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
