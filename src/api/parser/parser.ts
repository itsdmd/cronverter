import { inputFormat, outputFormat } from "./parserTypes";
import { parseCron } from "./parseCron";
import { parseJson } from "./parseJson";
import { parseIcs } from "./parseIcs";


class parseInput {
    dataUrl: string;
    inputFormat: inputFormat;
    outputFormat: outputFormat;
    
    constructor(dataUrl: string, inputFormat: inputFormat, outputFormat: outputFormat) {
        this.dataUrl = dataUrl;
        this.inputFormat = inputFormat;
        this.outputFormat = outputFormat;
    }
    
    parse() {
        parseFactory(this.inputFormat, this.outputFormat, this.dataUrl);
    }
}

function parseFactory(iF: inputFormat, oF: outputFormat, dataUrl: string) {
    switch(iF) {
        case inputFormat.cron:
            return parseCron(oF, dataUrl);
        case inputFormat.json:
            return parseJson(oF, dataUrl);
        case inputFormat.ics:
            return parseIcs(oF, dataUrl);
    }
}

export { parseInput, inputFormat, outputFormat };