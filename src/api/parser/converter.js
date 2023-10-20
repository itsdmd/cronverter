import { dataType, dataObj } from "./parserTypes";
import * as parseCron from "./parseCron";
import * as parseJson from "./parseJson";
// import { parseIcs } from "./parseIcs";

/**
 * Type conversion factory
 * @example
 * const inputObj = new dataObj(dataFormat.CRON, "* * * * * echo hello");
 * const outputObj = new dataObj(dataFormat.JSON);
 * converter(input, output);		// output.data = '[{"time":"* * * * *","cmd":"echo hello","username":null}]'
 * @param {dataObj} inputObj
 * @param {dataObj} outputObj
 * @param {boolean} hasUsernameField
 * @returns {Promise<void>}
 */
export async function converter(inputObj, outputObj, hasUsernameField = false) {
	// convert input data to ICA
	let interData = null;

	switch (inputObj.format) {
		case dataType.ICA:
			break;
		case dataType.CRON:
			interData = parseCron.parseCron(inputObj.data, hasUsernameField);
			break;
		case dataType.URL_CRON:
			interData = await new Promise((resolve) => {
				parseCron.parseUrlCron(inputObj.data, hasUsernameField).then((data) => {
					resolve(data);
				});
			});
			break;
		case dataType.JSON:
			interData = parseJson.parseJsonStr(inputObj.data);
			break;
		case dataType.URL_JSON:
			interData = await new Promise((resolve) => {
				parseJson.parseUrlJson(inputObj.data).then((data) => {
					resolve(data);
				});
			});
			break;
		case dataType.ICS:
			// interData = parseIcs(input.data, hasUsernameField);
			break;
		default:
			throw new Error("Invalid input format");
	}

	// convert ICA to output data
	switch (outputObj.format) {
		case dataType.ICA:
			outputObj.data = interData;
			break;
		case dataType.CRON:
			outputObj.data = parseCron.parseToCron(interData);
			break;
		case dataType.JSON:
			outputObj.data = parseJson.parseToJsonStr(interData);
			break;
		case dataType.ICS:
			// output.data = parseToIcs(interData);
			break;
		default:
			throw new Error("Invalid output format");
	}
}
