import React from "react";
import ReactDOM from "react-dom/client";
import * as input from "./components/input.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<input.PlainTextInput />
		<input.UrlInput />
		<input.FileInput />
	</React.StrictMode>
);
