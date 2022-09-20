import React, { useState } from "react";
// import "./style.scss"

interface Props {
  prop?: string;
}

export const CopyMe = (props: Props) => {
  const [thing, setThing] = useState();

  return (
    <div>
      <div>Hello World</div>
    </div>
  );
};
