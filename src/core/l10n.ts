import { makeAutoObservable, runInAction } from "mobx";
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, Language, LanguageDictionary } from "../interfaces/Language";
import * as en from "../languages/en.json";

/**
 * Mobx l10n language and translation store.
 * Merges Language Dictionaries in `src/languages` with `DEFAULT_LANGUAGE` `LanguageDictionary` to fill missing gaps.
 * Any component/page needs to be wrapped with an `observer` to read these values dynamically
 * For text styling wrap in start with `%%<identifier>##` and end with `%%`:
 * bold: `%%b##text%%`
 * italic: `%%i##text%%`
 * bold & italic: `%%bi##text%%` OR `%%ib##text%%`
 * code: `%%c##text%%`
 */
class L10N {
	public language: Language | undefined;
	public dictionary: LanguageDictionary = en;

	public constructor(browserLanguage: string) {
		makeAutoObservable(this);
		this.setLanguage(browserLanguage.slice(0, 2) as Language);
	}

	/** Merge the dictionaries in case of missing translations */
	private mergeLanguages = (target: LanguageDictionary | string, source: LanguageDictionary) => {
    return Object.entries(source).reduce((o, [k, v]) => {
			if (typeof o === "object" && !Array.isArray(o)) {
				o[k] = Boolean(v) && typeof v === "object" ? this.mergeLanguages(o[k] ?? {}, v) : v;
			}
			return o;
    }, target);
	};

	/** Check if the language is available to use and return a valid language */
	private checkLanguageAvailability = (lang: string) => {
		const language = lang.slice(0, 2) as Language;
		if (AVAILABLE_LANGUAGES.includes(language)) return language;
		const navigatorLanguage = navigator.language.slice(0, 2) as Language;
		if (AVAILABLE_LANGUAGES.includes(navigatorLanguage)) return navigatorLanguage;
		return DEFAULT_LANGUAGE;
	};

	/** Set website language */
	public setLanguage = async (lang: Language) => {
		const language = this.checkLanguageAvailability(lang);
		const languageDictionary = language !== DEFAULT_LANGUAGE ? await import(`../languages/${language}.json`) : undefined;

		runInAction(() => {
			this.dictionary = [{}, en, languageDictionary].filter(Boolean).reduce(this.mergeLanguages);
			this.language = language;
		});
	};

	/** Get phrase with bold/italic/code formatting for `Phrase` component */
	public getPhrase = (keys: Array<string>) => {
    const phrase = keys?.reduce((acc: LanguageDictionary | string, cur: string) => {
      return typeof acc !== "string" ? acc?.[cur] : acc;
    }, this.dictionary);

		if (typeof phrase === "string" || Array.isArray(phrase)) return phrase;
	};

	/** Get phrase with bold/italic/code formatting removed */
	public getString = (keys: Array<string> | string) => {
    const phrase = (typeof keys === "string" ? keys.split(".") : keys)?.reduce((acc: LanguageDictionary | string, cur: string) => {
      return typeof acc !== "string" ? acc?.[cur] : acc;
    }, this.dictionary);

		if (typeof phrase !== "string") return;

		/** Remove special formatting */
		const removeFormatting = (text: string) => {
			if (!text.includes("%%")) return text;

			return text.split("%%").filter(Boolean).map(fragment => {
				if (!fragment.includes("##")) return fragment;
				if (fragment.startsWith("i##") || fragment.startsWith("b##") || fragment.startsWith("c##")) {
					return fragment.slice(3);
				}
				if (fragment.startsWith("ib##") || fragment.startsWith("bi##")) return fragment.slice(4);
				return fragment;
			}).join("");
		};

		return typeof phrase === "string" ? removeFormatting(phrase) : undefined;
	};
}

// get language from url to override browser language
const pathnameLanguage = window.location.pathname.split("/").filter(Boolean)?.[0] ?? "";
export const l10n = new L10N(pathnameLanguage);
