import React, { useEffect, useState } from "react";
// import "./style.scss"

interface Props {
  prop?: string;
}

export const CopyMe = ({ prop }: Props) => {
  const [thing, setThing] = useState("Hello World");

  useEffect(() => {
    if (prop && prop !== thing) setThing(prop);
  }, [prop]);

  return (
    <div>
      <div>{thing}</div>
      <div>Hello World</div>
    </div>
  );
};
