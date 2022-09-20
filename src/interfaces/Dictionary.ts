export interface Dictionary<Thing> {
	[key: string]: Thing;
}

export interface LanguageDictionary {
	[key: string]: LanguageDictionary | string;
}
