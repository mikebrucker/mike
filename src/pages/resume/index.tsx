import React, { useEffect } from "react";

/** Resume redirect */
export const Resume = () => {
  useEffect(() => {
    window.location.href = location.origin + "/Brucker_Mike-Resume.pdf";
  }, []);

  return (
    <div className="page">
      <h6>Resume is downloading or opening...</h6>
    </div>
  );
};
