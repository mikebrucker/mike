import { action, makeAutoObservable, runInAction } from "mobx";

/**
 * Global variable helpers
 */
class Globals {
	public pauseAnimation = false;

	constructor() {
		makeAutoObservable(this);
	}

	@action
	public setPauseAnimation = async (pause: boolean, ms = 0) => {
		setTimeout(() => {
			runInAction(() => {
				this.pauseAnimation = pause;
			});
		}, ms);
	}
}

export const globals = new Globals();
