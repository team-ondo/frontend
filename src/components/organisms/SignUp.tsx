import React from "react";
import styles from "@/styles/components/organisms/SignUp.module.scss";

export default function SignUp() {
  return (
    <form className={styles.signup}>
      <p className={styles.signup__text}>
        Please register your account!
      </p>
      <div className={styles.signup__field}>
        <label className={styles.signup__label}>
          First Name
        </label>
      </div>
    </form>
  );
}
