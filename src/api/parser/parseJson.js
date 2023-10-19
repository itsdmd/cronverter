import { fetchPlain } from "../fetcher/fetcher";

/**
 * Convert JSON plain string into ICA
 * @param {string} inputStr
 * @returns {string[][]}
 * @example parseJsonStr('{"time":"* * * * *","cmd":"echo hello","username":null}')
 * @example parseJsonStr('{"0":{"time":"* * * * *","cmd":"echo su says hello","username":su},"1":{"time":"*\/2 * * * *","cmd":"echo goodbye from sudo","username":sudo}}')
 */
export function parseJsonStr(inputStr) {
	const inputObj = JSON.parse(inputStr);
	const output = [];
	for (const [key, value] of Object.entries(inputObj)) {
		output.push([value.time, value.cmd, value.username]);
	}
	return output;
}

/**
 * Convert JSON object into ICA
 * @param {object} inputObj
 * @returns {string[][]}
 */
export function parseJsonObj(inputObj) {
	return parseJsonStr(JSON.stringify(inputObj));
}

/**
 * Convert JSON data fetched from URL into ICA
 * @param {string} url
 * @returns {string[][]}
 */
export async function parseUrlJson(url) {
	return await fetchPlain(url).then((response) => {
		const data = parseJsonStr(response);
		return data;
	});
}

/**
 * Parse ICA into JSON object
 * @param {string[][]} inputData
 * @returns {{time: string, cmd: string, username: string}[]} JSON object
 */
export function parseToJsonObj(inputData) {
	let output = {};
	for (let i = 0; i < inputData.length; i++) {
		const time = inputData[i][0];
		const cmd = inputData[i][1];
		const username = inputData[i][2];
		output[i] = { time: time, cmd: cmd, username: username };
	}
	return output;
}

/**
 * Parse ICA into JSON plain string
 * @param {string[][]} inputData
 * @returns {string} JSON plain string
 */
export function parseToJsonStr(inputData) {
	return JSON.stringify(parseToJsonObj(inputData));
}
