
const ERRORS = require('./errors');

const SCALES = ['F', 'C', 'K'];

const parseInput = (userSubmittedUnparsedTemp) => {
    // Todo, refactor with TS and create this type
    const result = {
        errors: [],
        scale: null,
        temp: null
    }

    // No valid input could be less than 2 chars (number and scale)
    if (!userSubmittedUnparsedTemp || userSubmittedUnparsedTemp.length < 2) {
        result.errors.push(ERRORS.BAD_INPUT)
        return result;
    }

    result.scale = userSubmittedUnparsedTemp[userSubmittedUnparsedTemp.length-1].toUpperCase()
    if (!SCALES.includes(result.scale)) {
        result.errors.push(ERRORS.MISSING_SCALE);
    }

    result.temp = +userSubmittedUnparsedTemp.substring(0,userSubmittedUnparsedTemp.length-1); // Get number from string, cast to int with +
    if (isNaN(result.temp)) {
        result.errors.push(ERRORS.BAD_INPUT);
    }

    return result;
}

const round = (number) => Math.round(number*10)/10;

const convert = (scale, temp) => {
    switch(scale) {
        case 'C':
            return {
                F: round(temp*1.8+32),
                C: round(temp),
                K: round(temp+273.15),
            };
        case 'F':
            return {
                F: round(temp),
                C: round((temp-32)*.5556),
                K: round(273.15+(temp-32)*.5556),
            };
        case 'K':
            return {
                F: round((temp-273.15)*1.8+32),
                C: round(temp-273.15),
                K: round(temp),
            };
    }
}

module.exports = { convert, round, parseInput };
