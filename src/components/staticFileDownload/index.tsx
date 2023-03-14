import React, { useEffect } from "react";
import { Phrase } from "../l10n";

interface Props {
  file: string;
}

/** Static file download */
export const StaticFileDownload = ({ file }: Props) => {
  useEffect(() => {
    window.location.href = location.origin + "/" + file;
  }, []);

  return (
    <div className="page">
      <h6>{file ?? "File"} <Phrase>download.is</Phrase></h6>
    </div>
  );
};
