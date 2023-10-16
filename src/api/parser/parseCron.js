// import * as parser from "cron-parser";
// import { fetch } from "../fetcher/fetcher";

/**
 * Split crontab entries into time expression, command, and optionally username,
 * and return a 2D array of [time, command, username] arrays
 * Can also parse the username field if hasUsernameField is true
 * @param {string} inputData
 * @param {boolean} hasUsernameField
 * @returns {string[][]}
 */
export function parseCron(inputData, hasUsernameField = false) {
	const lines = inputData.split("\n");

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
			return line
				.split(" ")
				.slice(hasUsernameField ? 6 : 5)
				.join(" ");
		});

	let usernames = null;
	if (hasUsernameField) {
		usernames = lines
			.filter((line) => {
				return (/^\d/.test(line) || line.startsWith("*")) && line.length > 10;
			})
			.map((line) => {
				// get substring after the 5th space
				return line.split(" ")[hasUsernameField ? 5 : 4];
			});
	}

	const output = [];
	for (let i = 0; i < time.length; i++) {
		output.push([time[i], cmd[i], hasUsernameField ? usernames[i] : null]);
	}

	return output;
}

/**
 * Parse 2D array into crontab entries
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
