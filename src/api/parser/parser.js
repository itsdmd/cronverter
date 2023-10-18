import { dataObj } from "./parserTypes";
import { parseCron } from "./parseCron";
// import { parseJson } from "./parseJson";
// import { parseIcs } from "./parseIcs";

/**
 * Factory for parsing input data
 * @param {dataObj} input
 * @param {dataObj} output
 */
export function parseFactory(input, output) {
	// convert input data to ICA
	let interData = null;
	switch (input.format) {
		case dataObj.ICA:
			break;
		case dataObj.CRON:
			interData = parseCron(input.data);
			break;
		case dataObj.JSON:
			// interData = parseJson(input.data);
			break;
		case dataObj.ICS:
			// interData = parseIcs(input.data);
			break;
		default:
			throw new Error("Invalid input format");
	}

	// convert ICA to output data
	switch (output.format) {
		case dataObj.ICA:
			output.data = interData;
			break;
		case dataObj.CRON:
			output.data = convertCron(interData);
			break;
		case dataObj.JSON:
			// output.data = convertJson(interData);
			break;
		case dataObj.ICS:
			// output.data = convertIcs(interData);
			break;
		default:
			throw new Error("Invalid output format");
	}
}
