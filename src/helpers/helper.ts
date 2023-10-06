/** Use for a dynamic className */
export const classNames = (names: Dictionary<boolean | undefined | null | "">): string => {
  return Object.keys(names)
    .filter(key => names[key])
    .join(" ");
};

/** Prevent scroll on body for popups */
export const preventScroll = (preventScroll?: boolean) => {
  document.body.style.overflow = preventScroll ? "hidden" : "initial";
};

/** Filter out undefined values and return a joined string */
export const booleanJoin = (joiner: string, ...args: Array<string | null | undefined>) => {
  return args.filter(Boolean).join(joiner);
};
