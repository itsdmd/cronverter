class inputFormat {
	static cron = new inputFormat("cron");
	static json = new inputFormat("json");
	static ics = new inputFormat("ics");

	constructor(format) {
		this.format = format;
	}
}

class outputFormat {
	static cron = new outputFormat("cron");
	static json = new outputFormat("json");
	static ics = new outputFormat("ics");

	constructor(format) {
		this.format = format;
	}
}

export { inputFormat, outputFormat };
