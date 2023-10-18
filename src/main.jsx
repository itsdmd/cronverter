import React from "react";
import ReactDOM from "react-dom/client";
import * as input from "./components/input.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<input.plainTextInput />
		<input.urlInput />
	</React.StrictMode>
);
