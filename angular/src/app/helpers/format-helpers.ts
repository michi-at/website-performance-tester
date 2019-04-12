export function GetRound(precision) {
    const roundValue = Math.pow(10, precision);
    return (x: number | string) => {
        return Math.round((typeof x === 'string' ? parseFloat(x) : x) * roundValue) / roundValue;
    };
}
