export interface RecipeIngredient {
	amount?: string;
	ingredient?: string;
}

export interface Recipe {
	id: string;
	title?: string;
	subtitle?: string;
	steps?: Array<string>;
	ingredients?: Array<RecipeIngredient>;
}
