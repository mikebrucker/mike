export interface Recipe {
	title?: string;
	subtitle?: string;
	img?: string;
	steps?: Array<{
		step: string | Array<string>;
		img?: string;
	}>;
	ingredients?: Array<{
		amount?: string;
		ingredient?: string;
		img?: string;
	}>;
}
