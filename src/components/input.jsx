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

export function fileInput() {
	const [fileData, setFileData] = useState(null);

	const handleDrop = (event) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			setFileData({ name: file.name, data: event.target.result });
		};
		reader.readAsText(file);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleAdd = (event) => {
		event.preventDefault();
		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.onchange = (event) => {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onload = (event) => {
				setFileData({ name: file.name, data: event.target.result });
			};
			reader.readAsText(file);
		};
		fileInput.click();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const inputObj = new dataObj(dataFormat.CRON, fileData.data);
			const outputObj = new dataObj(dataFormat.ICA);
			await parseFactory(inputObj, outputObj);
			console.log(outputObj);
		} catch (err) {
			console.error(`${err}`);
		}
	};

	const handleClear = (event) => {
		event.preventDefault();
		setFileData(null);
	};

	return (
		<div
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			style={{ width: "100%", height: "100%", border: "1px solid black" }}
		>
			{fileData ? (
				<div>
					<button onClick={handleSubmit}>Submit</button>
					<button onClick={handleClear}>Clear</button>
					<h3>File Name: {fileData.name}</h3>
					<h3>File Data: </h3>
					<pre>{fileData.data}</pre>
				</div>
			) : (
				<div>
					<h3>Drop a file here</h3>
					<button onClick={handleAdd}>Add</button>
				</div>
			)}
		</div>
	);
}
