import React from 'react';
import styles from '@/styles/components/molecules/Weather.module.scss';

export default function Weather() {
  return (
    <div className={styles.weather}>
      <p className={styles.location}>Tokyo</p>
      <p className={styles.date}>Thursday, 9/8/2022</p>
      <p className={styles.temperature}>32℃</p>
      <p className={styles.humidity}>60%</p>
    </div>
  )
}
