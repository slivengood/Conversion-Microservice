const { convert, round, parseInput } = require('../conversion');
const ERRORS = require('../errors');

describe('[UNIT] parseInput', () => {
    describe('Valid Inputs', () => {
        test('Lowercase positive input', () => {
            const result = parseInput('1f');
            expect(result.scale).toBe('F');
            expect(result.temp).toBe(1);
            expect(result.errors.length).toBe(0);
        });
        test('Uppercase positive input', () => {
            const result = parseInput('56C');
            expect(result.scale).toBe('C');
            expect(result.temp).toBe(56);
            expect(result.errors.length).toBe(0);
        });
        test('Negative input', () => {
            const result = parseInput('-7K');
            expect(result.scale).toBe('K');
            expect(result.temp).toBe(-7);
            expect(result.errors.length).toBe(0);
        });
    });
    describe('Invalid Inputs', () => {
        test('Bad scale', () => {
            const result = parseInput('1d');
            expect(result.errors.length).toBeTruthy();
            expect(result.errors).toContain(ERRORS.MISSING_SCALE);
        });
        test('Missing scale', () => {
            const result = parseInput('56');
            expect(result.errors.length).toBeTruthy();
            expect(result.errors).toContain(ERRORS.MISSING_SCALE);
        });
        test('No number', () => {
            const result = parseInput('asdF');
            expect(result.errors.length).toBeTruthy();
            expect(result.errors).toContain(ERRORS.BAD_INPUT);
        });
        test('Bad number', () => {
            const result = parseInput('--5-6F');
            expect(result.errors.length).toBeTruthy();
            expect(result.errors).toContain(ERRORS.BAD_INPUT);
        });
        test('Empty input', () => {
            const result = parseInput('');
            expect(result.errors.length).toBeTruthy();
            expect(result.errors).toContain(ERRORS.BAD_INPUT);
        });
        test('Missing input', () => {
            const result = parseInput();
            expect(result.errors.length).toBeTruthy();
            expect(result.errors).toContain(ERRORS.BAD_INPUT);
        });
    });
});

describe('[UNIT] round', () => {
    test('correctly returns 1 decimal', () => {
        expect(round(5.71)).toBe(5.7);
    })
});

describe('[UNIT] convert', () => {
    test('correct response from K', () => {
        const result = convert('K', 1);
        expect(result).toStrictEqual({
            C: -272.1,
            F: -457.9,
            K: 1,
        });
    });
    test('correct response from C', () => {
        const result = convert('C', -272.1);
        expect(result).toStrictEqual({
            C: -272.1,
            F: -457.8,
            K: 1,
        });
    });
    test('correct response from F', () => {
        const result = convert('F', -457.9);
        expect(result).toStrictEqual({
            C: -272.2,
            F: -457.9,
            K: 1,
        });
    });
});
