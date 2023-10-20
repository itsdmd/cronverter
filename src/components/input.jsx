import { useState } from "react";
import { dataType, dataObj } from "../api/parser/parserTypes";
import { converter } from "../api/parser/converter";

export function PlainTextInput() {
	const [inputValue, setInputValue] = useState("");
	const [inputType, setInputType] = useState(dataType.CRON);
	const [outputType, setOutputType] = useState(dataType.JSON);
	const [downloadLink, setDownloadLink] = useState(null);
	const [showToast, setShowToast] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		try {
			const inputObj = new dataObj(inputType, inputValue);
			const outputObj = new dataObj(outputType);
			converter(inputObj, outputObj);
			console.log(outputObj);

			navigator.clipboard.writeText(outputObj.data);

			const blob = new Blob([outputObj.data], { type: "text/plain" });
			const url = URL.createObjectURL(blob);
			setDownloadLink(url);

			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		} catch (err) {
			console.error(`${err}`);
		}
	};

	const handleInputValueChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleInputTypeSelectChange = (event) => {
		setInputType(event.target.value);
	};

	const handleOutputTypeSelectChange = (event) => {
		setOutputType(event.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					From:
					<select
						value={inputType}
						onChange={handleInputTypeSelectChange}
					>
						<option value={dataType.CRON}>CRON</option>
						<option value={dataType.JSON}>JSON</option>
						<option value={dataType.ICS}>ICS / ICAL</option>
					</select>
				</label>
				<label>
					To:
					<select
						value={outputType}
						onChange={handleOutputTypeSelectChange}
					>
						<option value={dataType.CRON}>CRON</option>
						<option value={dataType.JSON}>JSON</option>
						<option value={dataType.ICS}>ICS / ICAL</option>
					</select>
				</label>
				<label>
					Input Value:
					<textarea
						value={inputValue}
						onChange={handleInputValueChange}
						placeholder="0 0 1 1 * sh ~/somecmd.sh"
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
			{downloadLink && (
				<div>
					<a
						href={downloadLink}
						download="output.txt"
					>
						Download
					</a>
				</div>
			)}
			{showToast && <div>Output copied to clipboard!</div>}
		</div>
	);
}

export function UrlInput() {
	const [inputValue, setInputValue] = useState("");
	const [inputType, setInputType] = useState(dataType.URL_CRON);
	const [outputType, setOutputType] = useState(dataType.JSON);
	const [downloadLink, setDownloadLink] = useState(null);
	const [showToast, setShowToast] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const inputObj = new dataObj(inputType, inputValue);
			const outputObj = new dataObj(outputType);
			await converter(inputObj, outputObj);
			console.log(outputObj);

			navigator.clipboard.writeText(outputObj.data);

			const blob = new Blob([outputObj.data], { type: "text/plain" });
			const url = URL.createObjectURL(blob);
			setDownloadLink(url);

			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		} catch (err) {
			console.error(`${err}`);
		}
	};

	const handleInputValueChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleInputTypeSelectChange = (event) => {
		setInputType(event.target.value);
	};

	const handleOutputTypeSelectChange = (event) => {
		setOutputType(event.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					From:
					<select
						value={inputType}
						onChange={handleInputTypeSelectChange}
					>
						<option value={dataType.URL_CRON}>CRON</option>
						<option value={dataType.URL_JSON}>JSON</option>
						<option value={dataType.URL_ICS}>ICS / ICAL</option>
					</select>
				</label>
				<label>
					To:
					<select
						value={outputType}
						onChange={handleOutputTypeSelectChange}
					>
						<option value={dataType.CRON}>CRON</option>
						<option value={dataType.JSON}>JSON</option>
						<option value={dataType.ICS}>ICS / ICAL</option>
					</select>
				</label>
				<label>
					Input Value:
					<input
						value={inputValue}
						onChange={handleInputValueChange}
						placeholder="https://example.com/cron.txt"
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
			{downloadLink && (
				<div>
					<a
						href={downloadLink}
						download="output.txt"
					>
						Download
					</a>
				</div>
			)}
			{showToast && <div>Output copied to clipboard!</div>}
		</div>
	);
}

export function FileInput() {
	const [fileData, setFileData] = useState(null);
	const [inputType, setInputType] = useState(dataType.CRON);
	const [outputType, setOutputType] = useState(dataType.JSON);
	const [downloadLink, setDownloadLink] = useState(null);
	const [showToast, setShowToast] = useState(false);

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

	const handleInputTypeSelectChange = (event) => {
		setInputType(event.target.value);
	};

	const handleOutputTypeSelectChange = (event) => {
		setOutputType(event.target.value);
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
			const inputObj = new dataObj(inputType, fileData.data);
			const outputObj = new dataObj(outputType);
			converter(inputObj, outputObj);
			console.log(outputObj);

			navigator.clipboard.writeText(outputObj.data);

			const blob = new Blob([outputObj.data], { type: "text/plain" });
			const url = URL.createObjectURL(blob);
			setDownloadLink(url);

			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
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
					{/* <h3>File Data: </h3>
					<pre>{fileData.data}</pre> */}
					{downloadLink && (
						<div>
							<a
								href={downloadLink}
								download="output.txt"
							>
								Download
							</a>
						</div>
					)}
					{showToast && <div>Output copied to clipboard!</div>}
				</div>
			) : (
				<div>
					<label>
						From:
						<select
							value={inputType}
							onChange={handleInputTypeSelectChange}
						>
							<option value={dataType.CRON}>CRON</option>
							<option value={dataType.JSON}>JSON</option>
							<option value={dataType.ICS}>ICS / ICAL</option>
						</select>
					</label>
					<label>
						To:
						<select
							value={outputType}
							onChange={handleOutputTypeSelectChange}
						>
							<option value={dataType.CRON}>CRON</option>
							<option value={dataType.JSON}>JSON</option>
							<option value={dataType.ICS}>ICS / ICAL</option>
						</select>
					</label>
					<h3>Drop a file here</h3>
					<button onClick={handleAdd}>Add</button>
				</div>
			)}
		</div>
	);
}
