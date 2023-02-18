import { WebPartContext } from "@microsoft/sp-webpart-base";
import * as React from "react";
import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";

export interface IProgressBar {
  context: WebPartContext;
  percentage: number;
  showPercentageValue: boolean;
}

const ProgressBar = (props: IProgressBar) => {
  const { percentage, showPercentageValue } = props;
  const [setTooltip, setTooltipState] = useState(false);
  const [isOpenPropertyPane, setOpenPropertyPaneState] = useState(false);
  const [timeoutId, setTimeoutId] = useState();
  console.log("percentage", percentage);

  const perfectPercentage = React.useMemo(() => {
    if (percentage === undefined) {
      return 0;
    } else {
      return percentage;
    }
  }, [percentage]);

  useEffect(() => {
    // Clear timeout if the component is unmounted
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div
      className={styles.MeterBarContainer}
      onMouseOver={() => {
        setTooltipState(() => true);
        const newTimeoutId = setTimeout(() => {
          setTooltipState(() => false);
        }, 3000);
        setTimeoutId(newTimeoutId as any);
      }}
    >
      <div
        className={styles.MeterBarPercentage}
        style={{
          width: `${perfectPercentage}%`,
        }}
      />
      {showPercentageValue && (
        <span className={styles.MeterBarPercentageText}>
          {perfectPercentage}%
        </span>
      )}
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
          {`The percentage is: ${perfectPercentage}%`}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
