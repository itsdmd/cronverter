import { outputFormat } from "./parserTypes";
// import * as parser from "cron-parser";
// import { fetch } from "../fetcher/fetcher";

/**
 * Parse crontab entries from inputData into outputFormat object
 * @param {outputFormat} outputFormat
 * @param {string} inputData
 * @returns {string[][]}
 */
export function parseCron(inputData) {
	const exprArray = extractCronEntries(inputData);
	return exprArray;
}

/**
 * Split crontab entries into time expression and command,
 * and return an array of arrays with the time expression and command
 * @param {string} input
 * @returns {string[][]}
 */
function extractCronEntries(input) {
	const lines = input.split("\n");

	const time = lines
		.filter((line) => {
			// filter out lines that don't start with a number or asterisk
			return (/^\d/.test(line) || line.startsWith("*")) && line.length > 10;
		})
		.map((line) => {
			// get substring until the 5th space
			return line.split(" ").slice(0, 5).join(" ");
		});

	const cmd = lines
		.filter((line) => {
			return (/^\d/.test(line) || line.startsWith("*")) && line.length > 10;
		})
		.map((line) => {
			// get substring after the 5th space
			return line.split(" ").slice(5).join(" ");
		});

	const output = [];
	for (let i = 0; i < time.length; i++) {
		output.push([time[i], cmd[i]]);
	}

	return output;
}
