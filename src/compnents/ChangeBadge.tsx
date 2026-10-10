import { formatPercent, toBn } from "@/lib/bangla";

export default function ChangeBadge({
    value,
    className = "",
}: {
    value: number;
    className?: string;
}) {
    const base =
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap";

    if (value > 0)
        return (
            <span className={`${base} bg-green-100 text-up ${className}`}>
                ▲ {formatPercent(value)}
            </span>
        );
    if (value < 0)
        return (
            <span className={`${base} bg-red-100 text-down ${className}`}>
                ▼ {formatPercent(value)}
            </span>
        );
    return (
        <span className={`${base} bg-gray-100 text-gray-500 ${className}`}>
            —{toBn("0.0")}%
        </span>
    );
}
