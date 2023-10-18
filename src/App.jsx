import { useState } from "react";
import { dataObj } from "./api/parser/parserTypes";
import { parseFactory } from "./api/parser/parser";

function App() {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		try {
			const inputObj = new dataObj(dataObj.CRON, inputValue);
			let outputObj = new dataObj(dataObj.ICA);
			parseFactory(inputObj, outputObj);
			console.log(outputObj.data);
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
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default App;
