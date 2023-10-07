import { useState } from "react";
import { ColorPicker } from "../../../components/colorPicker";
import "./style.scss";

/** Color Pick */
export const ColorPick = () => {
  const [color, setColor] = useState({ h: 0, s: 0, v: 0 });

  return (
    <main className="p-color-pick">
      <ColorPicker
        title="tools.colorPick.title"
        isOpen={true}
        masterColor={color}
        setMasterColor={setColor}
      />
    </main>
  );
};
