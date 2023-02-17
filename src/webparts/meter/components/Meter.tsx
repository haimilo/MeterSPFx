import * as React from 'react';
import { useEffect, useState } from 'react';
import { IMeterProps } from './IMeterProps';
import styles from "./Meter.module.scss";

const Meter = (props: IMeterProps) => {
  const {
    description,
    title,
    percentage
  } = props;

  const [setTooltip, setTooltipState] = useState(false);
  const [isOpenPropertyPane, setOpenPropertyPaneState] = useState(false);
  const [timeoutId, setTimeoutId] = useState();

  const acceptAblePercentage = (percentage: number) => {
    if (percentage > 100) {
      return 100;
    } else if (percentage < 0) {
      return 0;
    } else {
      return percentage;
    }
  }

  useEffect(() => {
    // Clear timeout if the component is unmounted
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
        <h1
          // className={styles.Title}
        >Title: {title}</h1>
        <h2
          // className={styles.Description}
        >{description}</h2>
        <p
          // className={styles.Percentage}
        >Percentage: {percentage}%</p>
        <div
          className={styles.MeterBarContainer}
          onMouseOver={() => {
            setTooltipState(() => true);
            const newTimeoutId = setTimeout(() => {
              setTooltipState(() => false);
            }, 5000);
            setTimeoutId(newTimeoutId as any);
          }}
        >
          <div
            className={styles.MeterBarPercentage}
            style={{
              width: `${acceptAblePercentage(percentage)}%`,
            }}
          />
          <span
            className={styles.MeterBarPercentageText}
          >
            {acceptAblePercentage(percentage)}%
          </span>

          {setTooltip && (
            <div
              className={styles.MeterBarPercentageTooltip}

              onMouseOut={() => {
                isOpenPropertyPane && setTooltipState(false);
              }}

              onClick={() => {
                // open the config
                props.context.propertyPane.open();
                setOpenPropertyPaneState(true);
              }}
            >
              The percentage is:
              {acceptAblePercentage(percentage)}%
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Meter;