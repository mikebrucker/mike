import { useState } from "react";
import { ColorPicker } from "../../../components/colorPicker";
import "./style.scss";

/** Color Pick */
export const ColorPick = () => {
  const [color, setColor] = useState("#000000");

  return (
    <main className="p-color-pick">
      <ColorPicker title="COLOR_PICKER" isOpen={true} currentColor={color} setColor={setColor} />
    </main>
  );
};