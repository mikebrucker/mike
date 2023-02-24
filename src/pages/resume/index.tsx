import React, { useEffect } from "react";

/** Resume redirect */
export const Resume = () => {
  useEffect(() => {
    window.location.href = location.origin + "/Brucker_Mike-Resume.pdf";
  }, []);

  return null;
};
