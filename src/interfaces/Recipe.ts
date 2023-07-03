export interface ImgAttr {
  src: string;
  alt: string;
}

export interface IIngredient {
  /** Amount in metric. Imperial is calculated */
  amount: number;
  /** g, kg, l, ml */
  metric: string;
  /** cups, oz */
  imperial: string;
  name: string;
  img?: ImgAttr;
}

export interface IStep {
  step: string | Array<string>;
  img?: ImgAttr;
}

export interface IRecipe {
  title: string;
  desc?: string;
  img?: ImgAttr;
  steps?: Array<IStep>;
  ingredients?: Array<IIngredient> | Array<Array<IIngredient>>;
}
