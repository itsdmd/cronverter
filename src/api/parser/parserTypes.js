export class dataObj {
	//? Intermediate Conversion Array, a 2D array with the following structure:
	//? [ [time, cmd, username], [time, cmd, username], ... ]
	//? Used as an intermediate format for converting between input and output formats
	static ICA = new dataObj("ICA");
	static CRON = new dataObj("CRON");
	static JSON = new dataObj("JSON");
	static ICS = new dataObj("ICS");

	constructor(format, data = null) {
		this.format = format;
		this.data = data;
	}
}
