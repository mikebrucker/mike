import { makeAutoObservable, runInAction } from "mobx";
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, Language, LanguageDictionary } from "../interfaces/Language";
import * as en from "../languages/en.json";

/**
 * For text styling wrap in start with `%%<identifier>##` and end with `%%`:
 * bold: `%%b##text%%`
 * italic: `%%i##text%%`
 * bold & italic: `%%bi##text%%` OR `%%ib##text%%`
 * code: `%%c##text%%`
 */
class L10N {
	public language: Language | undefined;
	public languageDictionary: LanguageDictionary = en;

	public constructor(browserLanguage: string) {
		makeAutoObservable(this);
		this.setLanguage(browserLanguage.slice(0, 2) as Language);
	}

	private mergeLanguages = (target: LanguageDictionary | string, source: LanguageDictionary) => {
    return Object.entries(source).reduce((o, [k, v]) => {
			if (typeof o === "object" && !Array.isArray(o)) {
				// eslint-disable-next-line no-param-reassign
				o[k] = Boolean(v) && typeof v === "object" ? this.mergeLanguages(o[k] ?? {}, v) : v;
			}
			return o;
    }, target);
	};

	private checkLanguageAvailability = (lang: string) => {
		const language = lang.slice(0, 2) as Language;
		if (AVAILABLE_LANGUAGES.includes(language)) return language;
		const navigatorLanguage = navigator.language.slice(0, 2) as Language;
		if (AVAILABLE_LANGUAGES.includes(navigatorLanguage)) return navigatorLanguage;
		return DEFAULT_LANGUAGE;
	};

	public setLanguage = async (lang: Language) => {
		const language = this.checkLanguageAvailability(lang);
		const languageDictionary = language !== DEFAULT_LANGUAGE ? await import(`../languages/${language}.json`) : undefined;

		runInAction(() => {
			this.languageDictionary = [{}, en, languageDictionary].filter(Boolean).reduce(this.mergeLanguages);
			this.language = language;
		});
	};

	public getPhrase = (keys: Array<string>) => {
    const phrase = keys?.reduce((acc: LanguageDictionary | string, cur: string) => {
      return typeof acc !== "string" ? acc?.[cur] : acc;
    }, this.languageDictionary);

		if (typeof phrase === "string" || Array.isArray(phrase)) return phrase;
	};

	public getString = (keys: Array<string> | string) => {
    const phrase = (typeof keys === "string" ? keys.split(".") : keys)?.reduce((acc: LanguageDictionary | string, cur: string) => {
      return typeof acc !== "string" ? acc?.[cur] : acc;
    }, this.languageDictionary);

		if (typeof phrase !== "string") return;

		const formatString = (text: string) => {
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

		return typeof phrase === "string" ? formatString(phrase) : undefined;
	};
}

// get language from url to override browser language
const pathnameLanguage = window.location.pathname.split("/").filter(Boolean)?.[0] ?? "";
export const l10n = new L10N(pathnameLanguage);
