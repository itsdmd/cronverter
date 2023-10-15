import { inputFormat, outputFormat } from "./parserTypes";
import { parseCron } from "./parseCron";
import { parseJson } from "./parseJson";
import { parseIcs } from "./parseIcs";

/**
 * Class for storing input data and parsing it
 * @param {inputFormat} inF
 * @param {outputFormat} outF
 * @param {string} data
 */
class inputData {
	constructor(inF, outF, data) {
		this.inF = inF;
		this.outF = outF;
		this.data = data;
	}

	/**
	 * Parse input data to output format
	 * @returns {outputData}
	 */
	parse() {
		parseFactory(this.inF, this.outF, this.data);
	}
}

/**
 * Class for storing parsed output data
 * @param {outputFormat} outF
 * @param {string} data
 */
class outputData {
	constructor(outF, data) {
		this.outF = outF;
		this.data = data;
	}
}

/**
 * Factory for parsing input data
 * @param {inputFormat} inF
 * @param {outputFormat} outF
 * @param {string} data
 * @returns {outputData}
 */
function parseFactory(inF, outF, data) {
	entries = () => {
		switch (inF) {
			case inputFormat.CRON:
				return parseCron(data);
			case inputFormat.JSON:
				return parseJson(data);
			case inputFormat.ICS:
				return parseIcs(data);
			default:
				throw new Error("Invalid input format");
		}
	};

	return new outputData(outF, entries);
}

export { inputData, inputFormat, outputFormat };
