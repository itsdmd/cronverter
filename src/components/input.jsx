import { useState } from "react";
import { dataFormat, dataObj } from "../api/parser/parserTypes";
import { parseFactory } from "../api/parser/parser";

export function plainTextInput() {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		try {
			const inputObj = new dataObj(dataFormat.CRON, inputValue);
			let outputObj = new dataObj(dataFormat.ICA);
			parseFactory(inputObj, outputObj);
			console.log(outputObj);
		} catch (err) {
			console.error(`${err}`);
		}
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Input:
					<textarea
						value={inputValue}
						onChange={handleInputChange}
						placeholder="0 0 1 1 * sh ~/somecmd.sh"
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export function urlInput() {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const inputObj = new dataObj(dataFormat.URL_CRON, inputValue);
			const outputObj = new dataObj(dataFormat.ICA);
			await parseFactory(inputObj, outputObj);
			console.log(outputObj);
		} catch (err) {
			console.error(`${err}`);
		}
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Input:
					<input
						value={inputValue}
						onChange={handleInputChange}
						placeholder="https://example.com/cron.txt"
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
