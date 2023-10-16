import { useState } from "react";
import { parseCron, parseToCron } from "./api/parser/parseCron";
// import { inputFormat, outputFormat } from "./api/parser/parserTypes";

function App() {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		try {
			const expressions = parseCron(inputValue);
			if (expressions === undefined) {
				throw new Error("expressions is undefined");
			}
			console.log(expressions);
			console.log(parseToCron(expressions));
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
