import { ProgressNavbar } from "@eduriam/ui-core";

import React from "react";

export interface IStudySessionProgressBar {
  value: number;
  maxValue: number;
  onExit: () => void;
}

const StudySessionProgressBar: React.FC<IStudySessionProgressBar> = ({
  value,
  maxValue,
  onExit,
}) => {
  const progressValue =
    maxValue > 0 ? Math.min(100, (value / maxValue) * 100) : 0;

  return (
    <ProgressNavbar
      leftButton={{ icon: "close", onClick: onExit }}
      progressValue={progressValue}
    />
  );
};

export default StudySessionProgressBar;
