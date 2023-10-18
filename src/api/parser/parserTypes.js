export class dataFormat {
	//? Intermediate Conversion Array, a 2D array with the following structure:
	//? [ [time, cmd, username], [time, cmd, username], ... ]
	//? Used as an intermediate format for converting between input and output formats
	static ICA = "ICA";

	static CRON = "CRON";
	static JSON = "JSON";
	static ICS = "ICS";

	static URL_CRON = "URL_CRON";
	static URL_JSON = "URL_JSON";
	static URL_ICS = "URL_ICS";
}

export class dataObj {
	/**
	 * @param {dataFormat} format
	 */
	constructor(format, data = null) {
		this.format = format;
		this.data = data;
	}
}
