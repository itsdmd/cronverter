import { outputFormat } from "./parserTypes";
// import * as parser from "cron-parser";
// import { fetch } from "../fetcher/fetcher";

import { getErrorMessage } from "../../functions/getErrorMessage";

export async function parseCron(outputFormat: outputFormat, dataUrl: string) {
	console.log(outputFormat, dataUrl);

	try {
		// fetch plain text data from dataUrl
		const output = await fetch(dataUrl)
			.then(async (response: any) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				} else {
					const result = await response.text();
					return extractCronExpressions(result);
				}
			})
			.catch((err) => {
				throw new Error(`Failed to fetch ${dataUrl}: ${err}`);
			});

		return output;
	} catch (err: unknown) {
		throw new Error("Failed to parse cron expression: " + getErrorMessage(err));
	}
}

function extractCronExpressions(input: string): string[][] {
	const lines = input.split("\n");

	const time = lines
		.filter((line) => {
			return (/^\d/.test(line) || line.startsWith("*")) && line.length > 10;
		})
		.map((line) => {
			// get substring until the 5th space
			// this is the cron expression
			return line.split(" ").slice(0, 5).join(" ");
		});

	const cmd = lines
		.filter((line) => {
			return (/^\d/.test(line) || line.startsWith("*")) && line.length > 10;
		})
		.map((line) => {
			// get substring after the 5th space
			// this is the cron command
			return line.split(" ").slice(5).join(" ");
		});

	const output = [];
	for (let i = 0; i < time.length; i++) {
		output.push([time[i], cmd[i]]);
	}

	return output;
}
