# Tempurature Conversion Microservice

Test microservice to convert tempature between the three major scales.

Exposes simple single endpoint:

```
    HTTP GET request to /convert with a number tempature suffixed with a scale (C/F/K) as query 'temp'.

    Example: /convert?temp=68F
    Response example(200): {
        "F": 68,
        "C": 22,
        "K": 295
    }

    Error codes:
    400 - Bad request (missing or invalid scale, not a valid number)
```

## Installation


```bash
nvm use
npm install
```

## Usage

```bash
nvm use
npm run
```

## Testing

Tests are run with Jest.

```bash
nvm use
npm test
```

Sample output:

```
> jest

 PASS  __tests__/conversion.js
  [UNIT] parseInput
    Valid Inputs
      ✓ Lowercase positive input (2 ms)
      ✓ Uppercase positive input
      ✓ Negative input
    Invalid Inputs
      ✓ Bad scale
      ✓ Missing scale (1 ms)
      ✓ No number (1 ms)
      ✓ Bad number
      ✓ Empty input
      ✓ Missing input
  [UNIT] round
    ✓ correctly returns 1 decimal
  [UNIT] convert
    ✓ correct response from K (1 ms)
    ✓ correct response from C (1 ms)
    ✓ correct response from F

Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        0.249 s, estimated 1 s
Ran all test suites.
```

## Options

```bash
PORT=[default: 3001]
```

