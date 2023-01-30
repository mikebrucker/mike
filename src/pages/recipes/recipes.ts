import { Recipe } from "../../interfaces/Recipe";

export const recipes: Dictionary<Recipe> = {
	ribs: {
		title: "Ribs",
		subtitle: "Oven baked slow cooked ribs.",
		steps: [
			{
				step: [
					"Preheat oven to 100º C.",
					"Cover baking tray with foil as it makes clean up after easier and we will wrap the tray with foil as well. Make sure the tray is deep enough to hold all the fat that will come out of the ribs."
				],
			},
			{
				step: "(Optional) Remove the membrane from underneath the ribs with a butterknife",
			},
			{
				step: "Season generously with salt, pepper, paprika, garlic and spicy pepper blend.",
			},
			{
				step: "Place ribs on to baking tray and cover the entire thing with foil. Place in the oven for 4 hours",
			},
			{
				step: [
					"Remove the ribs from oven and now blast the broiler.",
					"Uncover the ribs and drain the excess fat.",
					"Slather the top of the ribs with BBQ sauce and put back under the broiler for 10-15 minutes or until the sauce is cooked on."
				]
			},
			{
				step: "Pull them out of the oven, put them on a cutting board, cut and serve with some more BBQ sauce for dipping."
			},
		],
		ingredients: []
	}
};
