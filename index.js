const express = require('express');
const app = express();

const { convert, parseInput } = require('./conversion');

const PORT = process.env.PORT || 3001;

const INSTRUCTIONS = `
    HTTP GET request to /convert with a number tempature suffixed with a scale (C/F/K) as query 'temp'.
    Example: /convert?temp=68F
    Response example: {
        "F": 68,
        "C": 22,
        "K": 295
    }

    Error codes:
    400 - Bad request (missing or invalid scale, not a valid number)
`;

app.route('/').get((req, res) => {
    res.send(INSTRUCTIONS);
});

app.route('/convert').get((req, res) => {
    const { temp: userSubmittedUnparsedTemp } = req.query;

    const {
        errors,
        scale,
        temp,
    } = parseInput(userSubmittedUnparsedTemp);
    
    if (errors.length) {
        return res.status(400).send(errors.join(' '));
    }
    
    res.json(convert(scale, temp));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})