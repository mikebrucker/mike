import React from "react";
import { observer } from "mobx-react";
import { globals } from "../../core/globals";


export const Planets = observer(() => {
	const pauseClass = globals.pauseAnimation ? " paused" : "";

  return (
		<div className="orbit">
			<div className="earth">
				<div className={`earth-globe earth-globe-north${pauseClass}`} />
				<div className={`earth-globe earth-globe-south${pauseClass}`} />
				<div className={`earth-shadow${pauseClass}`} />
				<div className="earth-outline" />
			</div>
			<div className={`moon${pauseClass}`}>
				<div className={`moon-globe${pauseClass}`} />
				<div className="moon-shadow" />
			</div>
		</div>
  );
});
