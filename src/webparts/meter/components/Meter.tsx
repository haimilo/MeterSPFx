import * as React from "react";
import { useMemo } from "react";
import { IMeterProps } from "./IMeterProps";
import ProgressBar from "./ProgressBar/ProgressBar";

const Meter = (props: IMeterProps) => {
  const {
    description,
    title,
    percentage,
    showPercentageValue,
    headerAlignment,
  } = props;

  console.log("headerAlignment", headerAlignment);

  const alignHeader = useMemo(() => {
    switch (headerAlignment) {
      case "center":
        return "center";
      case "right":
        return "end";
      case "left":
        return "start";
      default:
        return "start";
    }
  }, [headerAlignment]);

  console.log("alignHeader", alignHeader);

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
        <header
          style={{
            width: "100%",
            display: "flex",
            alignItems: alignHeader,
            flexDirection: "column",
          }}
        >
          <h1>Title: {title}</h1>
          <h2>{description}</h2>
        </header>
        <ProgressBar
          percentage={percentage}
          context={props.context}
          showPercentageValue={showPercentageValue}
        />
      </div>
    </div>
  );
};

export default Meter;
