/**
 * Available options: `ICA`, `CRON`, `JSON`, `ICS`.
 * @example dataFormat.ICA
 */
export class dataFormat {
	/**
	 * *Intermediate Conversion Array*, a 2D string array with the following structure:
	 * `[ [time, username, cmd], [time, username, cmd], ... ]`.
	 *
	 * Used as an intermediate format for converting between input and output formats. Note that only `/etc/crontab` and the files in `/etc/cron.d/` have a username field.
	 * @example [["* * * * *", null, "echo hello"], ["*\/2 * * * *", null, "echo goodbye"]
	 * @example [["* * * * *", su, "echo su says hello"], ["*\/2 * * * *", sudo, "echo goodbye from sudo"]
	 */
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
	 * An object containing the data and its format.
	 * @param {dataFormat} format
	 * @param {any} data
	 * @example new dataObj(dataFormat.ICA, [["* * * * *", "echo hello", null]])
	 * @example new dataObj(dataFormat.CRON, "* * * * * sh echo hello", true)
	 * @example new dataObj(dataFormat.URL_CRON, "https://example.com/cron.txt")
	 */
	constructor(format, data = null) {
		this.format = format;
		this.data = data;
	}
}
