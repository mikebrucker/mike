export interface ImgAttr {
	src: string;
	alt: string;
}

export interface Recipe {
	title?: string;
	subtitle?: string;
	img?: ImgAttr;
	steps?: Array<{
		step: string | Array<string>;
		img?: ImgAttr;
	}>;
	ingredients?: Array<{
		amount?: string;
		ingredient?: string;
		img?: ImgAttr;
	}>;
}
