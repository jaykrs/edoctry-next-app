import React from "react";

import TextWithButtonCard from "../Cards/TextWithButtonCard/TextWithButtonCard";

const InstructorAssignmentsDisplay = () => {
  return (
    <div>
      <TextWithButtonCard
        txt="Jump Into Assignment Creation"
        btnTxt="Create Assignment"
        btnLink="/assignment/create"
      />
    </div>
  );
};

export default InstructorAssignmentsDisplay;
