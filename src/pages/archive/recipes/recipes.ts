import { IRecipe } from "../../../interfaces/recipe";

export const recipes: Dictionary<IRecipe> = {
  ribs: {
    title: "Oven Baked Slow Cooked Ribs",
    desc: "St Louis style or Baby Back ribs slow-cooked with a dry rub and finished with a sauce.",
    steps: [
      {
        step: [
          "Preheat oven to 100º C.",
          "Cover baking tray with foil as it makes clean up after easier and we will wrap the tray with foil as well. Make sure the tray is deep enough to hold all the fat that will come out of the ribs.",
        ],
      },
      {
        step: [
          "(Optional) Remove the membrane from underneath the ribs with a butterknife",
          "Season generously with salt, pepper, paprika, garlic and spicy pepper blend.",
        ],
      },
      {
        step: [
          "Place ribs on to baking tray you previously covered in foil and now cover the entire thing with foil.",
          "Place in the oven for 4 hours.",
        ],
      },
      {
        step: [
          "Remove the ribs from oven and now blast the broiler.",
          "Uncover the ribs and drain the excess fat.",
          "Slather the top of the ribs with BBQ sauce and put back under the broiler for 10-15 minutes or until the sauce is cooked on.",
          "Pull them out of the oven, put them on a cutting board, cut and serve with some more BBQ sauce for dipping.",
        ],
      },
    ],
    ingredients: [],
  },
  "chicken-burrito": {
    title: "Chicken Burrito",
    steps: [
      {
        step: "make burrito",
      },
    ],
  },
  "pizza-dough": {
    title: "Pizza Dough",
    desc: "Simple homemade pizza dough. Good for all types of Pizza, Stromboli, and Calzone.",
    ingredients: [
      [
        {
          name: "Pizza Flour",
          amount: 500,
          metric: "g",
          imperial: "oz",
        },
        {
          name: "Salt",
          amount: 6,
          metric: "g",
          imperial: "oz",
        },
        {
          name: "Sugar",
          amount: 12,
          metric: "g",
          imperial: "oz",
        },
        {
          name: "Yeast",
          amount: 7,
          metric: "g",
          imperial: "oz",
        },
      ],
      [
        {
          name: "Water",
          amount: 325,
          metric: "ml",
          imperial: "oz",
        },
        {
          name: "Oil",
          amount: 30,
          metric: "ml",
          imperial: "oz",
        },
      ],
    ],
    steps: [
      {
        step: "Mix dry stuff in a bowl",
      },
      {
        step: [
          "Heat water up to 43C. Do not go over otherwise the yeast might die.",
          "Add in the oil once it's heated.",
        ],
      },
      {
        step: [
          "Pour the liquid into the dry stuff",
          "Mix it in a stand mixer or a food processor with a dough attachment. Or just use your hands. it's pretty easy.",
          "If it's too dry pour in a spoonful of water, if it's too wet put in a spoonful of flour.",
          "Once it feels like pizza dough let it rise in a oiled bowl for at least 4 hours but preferably overnight.",
        ],
      },
    ],
  },
  "buffalo-chicken-cheesesteak-stromboli": {
    title: "Buffalo Chicken Cheesesteak Stromboli",
    steps: [
      {
        step: ["make dough", "roll dough"],
      },
      {
        step: ["cut chicken", "cook chicken", "hot sauce chicken"],
      },
      {
        step: [
          "put mozz on dough",
          "put chicken on mozz",
          "put blue cheese on chicken",
          "put more mozz",
          "wrap",
          "seal with some more mozz",
        ],
      },
      {
        step: [
          "put in oven for 14 minutes at 200-220",
          "take out",
          "cut and eat with blue cheese side",
        ],
      },
    ],
  },
};
