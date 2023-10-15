import React, { useState } from "react";
import { parseCron } from "./api/parser/parseCron";
import * as parserTypes from "./api/parser/parserTypes";

function App() {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const expressions = await parseCron(parserTypes.outputFormat.cron, inputValue);
			if (expressions === undefined) {
				throw new Error("expressions is undefined");
			}
			console.log(expressions);
		} catch (err) {
			console.error(`${err}`);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Enter the URL to your cron file:&nbsp;
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
				/>
			</label>
			<button type="submit">Submit</button>
		</form>
	);
}

export default App;
