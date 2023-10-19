import { fetchPlain } from "../fetcher/fetcher";

/**
 * Convert JSON plain string into ICA
 * @param {string} inputStr
 * @returns {string[][]}
 */
export function parseJsonStr(inputStr) {
	return output;
}

/**
 * Convert JSON object into ICA
 * @param {object} inputObj
 * @returns {string[][]}
 */
export function parseJsonObj(inputObj) {
	const inputStr = JSON.stringify(inputObj);
	return parseJsonStr(inputStr);
}

/**
 * Convert JSON data fetched from URL into ICA
 * @param {string} url
 * @param {boolean} hasUsernameField
 * @returns {string[][]}
 */
export async function parseUrlCron(url) {
	return await fetchPlain(url).then((response) => {
		const data = parseCron(response, hasUsernameField);
		return data;
	});
}

/**
 * Parse ICA into JSON
 * @param {string[][]} inputData
 * @returns {string}
 */
export function parseToCron(inputData) {
	let output = "";
	for (let i = 0; i < inputData.length; i++) {
		output += inputData[i].join(" ") + "\n";
	}
	return output;
}
