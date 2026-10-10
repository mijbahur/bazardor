const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export function toBn(value: number | string): string {
    return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

export function formatNumber(n: number): string {
    const hasFraction = Math.abs(n % 1) > 0.0001;
    const s = n.toLocaleString("en-US", {
        minimumFractionDigits: hasFraction ? 2 : 0,
        maximumFractionDigits: 2,
    });
    return toBn(s);
}

export function formatPercent(n: number): string {
    return `${toBn(Math.abs(n).toFixed(1))}%`;
}

export function formatTaka(n: number): string {
    return `${formatNumber(n)} টাকা`;
}
