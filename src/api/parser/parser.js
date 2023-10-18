import { dataFormat, dataObj } from "./parserTypes";
import { parseCron, parseUrlCron, parseToCron } from "./parseCron";
// import { parseJson } from "./parseJson";
// import { parseIcs } from "./parseIcs";

/**
 * Factory for parsing input data
 * @param {dataObj} input
 * @param {dataObj} output
 */
export async function parseFactory(input, output, hasUsernameField = false) {
	// convert input data to ICA
	let interData = null;

	switch (input.format) {
		case dataFormat.ICA:
			break;
		case dataFormat.CRON:
			interData = parseCron(input.data, hasUsernameField);
			break;
		case dataFormat.URL_CRON:
			interData = await new Promise((resolve) => {
				parseUrlCron(input.data, hasUsernameField).then((data) => {
					resolve(data);
				});
			});
			break;
		case dataFormat.JSON:
			// interData = parseJson(input.data, hasUsernameField);
			break;
		case dataFormat.ICS:
			// interData = parseIcs(input.data, hasUsernameField);
			break;
		default:
			throw new Error("Invalid input format");
	}

	// convert ICA to output data
	switch (output.format) {
		case dataFormat.ICA:
			output.data = interData;
			break;
		case dataFormat.CRON:
			output.data = parseToCron(interData);
			break;
		case dataFormat.JSON:
			// output.data = parseToJson(interData);
			break;
		case dataFormat.ICS:
			// output.data = parseToIcs(interData);
			break;
		default:
			throw new Error("Invalid output format");
	}
}
