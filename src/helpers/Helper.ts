export const classNames = (names: Dictionary<boolean | undefined | null | "">): string => {
	return Object.keys(names).filter(key => names[key]).join(" ");
};
