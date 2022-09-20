import { action, makeAutoObservable, runInAction } from "mobx";
import { LanguageDictionary } from "../interfaces/Dictionary";
import * as en from "../languages/en.json"

export type LanguageCodes = Language|"aa"|"ab"|"af"|"am"|"ar"|"as"|"ay"|"az"|"ba"|"be"|"bg"|"bh"|"bi"|"bn"|"bo"|"br"|"ca"|"co"|"cs"|"cy"|"da"|"de"|"dz"|"el"|"en"|"eo"|"es"|"et"|"eu"|"fa"|"fi"|"fj"|"fo"|"fr"|"fy"|"ga"|"gd"|"gl"|"gn"|"gu"|"ha"|"he"|"hi"|"hr"|"hu"|"hy"|"ia"|"id"|"ie"|"ik"|"in"|"is"|"it"|"iw"|"ja"|"ji"|"jw"|"ka"|"kk"|"kl"|"km"|"kn"|"ko"|"ks"|"ku"|"ky"|"kz"|"la"|"ln"|"lo"|"ls"|"lt"|"lv"|"mg"|"mi"|"mk"|"ml"|"mn"|"mo"|"mr"|"ms"|"mt"|"my"|"na"|"ne"|"nl"|"no"|"oc"|"om"|"or"|"pa"|"pl"|"ps"|"pt"|"qu"|"rm"|"rn"|"ro"|"ru"|"rw"|"sa"|"sb"|"sd"|"sg"|"sh"|"si"|"sk"|"sl"|"sm"|"sn"|"so"|"sq"|"sr"|"ss"|"st"|"su"|"sv"|"sw"|"sx"|"ta"|"te"|"tg"|"th"|"ti"|"tk"|"tl"|"tn"|"to"|"tr"|"ts"|"tt"|"tw"|"uk"|"ur"|"us"|"uz"|"vi"|"vo"|"wo"|"xh"|"yi"|"yo"|"zh"|"zu";
export const LANGUAGE_CODES: Array<LanguageCodes> = ["aa","ab","af","am","ar","as","ay","az","ba","be","bg","bh","bi","bn","bo","br","ca","co","cs","cy","da","de","dz","el","en","eo","es","et","eu","fa","fi","fj","fo","fr","fy","ga","gd","gl","gn","gu","ha","he","hi","hr","hu","hy","ia","id","ie","ik","in","is","it","iw","ja","ji","jw","ka","kk","kl","km","kn","ko","ks","ku","ky","kz","la","ln","lo","ls","lt","lv","mg","mi","mk","ml","mn","mo","mr","ms","mt","my","na","ne","nl","no","oc","om","or","pa","pl","ps","pt","qu","rm","rn","ro","ru","rw","sa","sb","sd","sg","sh","si","sk","sl","sm","sn","so","sq","sr","ss","st","su","sv","sw","sx","ta","te","tg","th","ti","tk","tl","tn","to","tr","ts","tt","tw","uk","ur","us","uz","vi","vo","wo","xh","yi","yo","zh","zu"];

export type Language = "en" | "de";
export const LANGUAGES: Array<Language> = ["en", "de"];
export const DEFAULT_LANGUAGE = "en";

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

	constructor(browserLanguage: string) {
		makeAutoObservable(this);
		this.setLanguage(browserLanguage.slice(0, 2) as Language);
	}

	private mergeLanguages = (target: LanguageDictionary | string, source: LanguageDictionary | string) => {
    return Object.entries(source).reduce((o, [k, v]) => {
			if (typeof o === "object" && !Array.isArray(o)) o[k] = v && typeof v === 'object' ? this.mergeLanguages(o[k] = o[k] || {}, v) : v;
			return o;
    }, target);
	}


	@action
	public setLanguage = async (lang: Language) => {
		let language = lang;

		if (!LANGUAGES.includes(language)) language = DEFAULT_LANGUAGE;

		const languageDictionary = await import(`../languages/${language}.json`);

		runInAction(() => {
			this.languageDictionary = [{}, en, languageDictionary].reduce(this.mergeLanguages);
			this.language = language;
		});
	}

	public getPhrase = (keys: Array<string>) => {
    const phrase = keys?.reduce((acc: LanguageDictionary | string, cur: string) => {
      return typeof acc !== "string" ? acc?.[cur] : acc;
    }, this.languageDictionary);

		if (typeof phrase === "string" || Array.isArray(phrase)) return phrase;
	}

	public getString = (keys: Array<string> | string) => {
    const phrase = (typeof keys === "string" ? keys.split(".") : keys)?.reduce((acc: LanguageDictionary | string, cur: string) => {
      return typeof acc !== "string" ? acc?.[cur] : acc;
    }, this.languageDictionary);

		if (typeof phrase !== "string") return;

		const formatString = (text: string) => {
			if (!text.includes("%%")) return text;

			return text.split("%%").filter(Boolean).map((fragment, i) => {
				if (!fragment.includes("##")) return fragment;
				if (fragment.startsWith("i##") || fragment.startsWith("b##") || fragment.startsWith("c##")) {
					return fragment.slice(3);
				}
				if (fragment.startsWith("ib##") || fragment.startsWith("bi##")) return fragment.slice(4);
				return fragment;
			}).join("");
		}

		return typeof phrase === "string" ? formatString(phrase) : undefined;
	}
}

// get language from url to override browser language
const pathnameLanguage = window.location.pathname.split("/").filter(Boolean)?.[0];
export const l10n = new L10N(!LANGUAGE_CODES.includes(pathnameLanguage as Language) ? navigator.language : pathnameLanguage);
