export const MAX_VERSION_SEGMENTS = 3;
export const VERSION_SEPARATOR = ".";
export const RELEASE_SEPARATOR = "-";
export const ASCII_CHAR_OFFSET = 97;
export const ALPHABET_LAST_INDEX = 23;
export const FALLBACK_PRE_RELEASE = "RELEASE";
export const BUTTON_LABEL_DELAY = 2000;
export const REGEX_HAS_NO_PRE_RELEASE = /^\d+(\.\d+)*$/gm;
export const REGEX_HAS_PRE_RELEASE = /^\d+(\.\d+)*-\w+/gm;
export const REGEX_ILLEGAL_COMBO = /^(?=.*[a-zA-Z])((?!-).)*$|(?:[a-zA-Z]).*[-]/gm;
export const GREEK_ALPHABET = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega"];

export class Version {
	major = 0;
	minor = 0;
	patch = 0;
	preRelease = -1;
}

/**
 * Get the Greek alphabet letter for a given index number
 * @param {*} number The index number
 * @returns The name of the corresponding Greek alphabet letter
 */
export const getGreekAlphabetNameByNumber = (number) => {
	return number >= 0 && number <= ALPHABET_LAST_INDEX
		? //Return alphabet value if within bounds
		  GREEK_ALPHABET[number]
		: //Return fallback pre-release name
		  FALLBACK_PRE_RELEASE;
};
