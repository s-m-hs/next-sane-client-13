"use client";

import { useState } from "react";
import { CopyIcon, CheckBadgeIcon } from "../madules/p-user/Order/Icons";

export default function CopyableCode({ label, value }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch (e) {
            // در صورت عدم دسترسی به کلیپ‌بورد، بی‌صدا رد می‌شویم
        }
    }

    return (
        <div className="sane-code-chip">
            <div className="text-truncate">
                <div className="small sane-text-sub">{label}</div>
                <div className="fw-bold  text-truncate" dir="ltr">
                    {value}
                </div>
            </div>
            <button type="button" onClick={handleCopy} className="sane-code-copy-btn" aria-label={`کپی ${label}`}>
                {copied ? <CheckBadgeIcon size={15} /> : <CopyIcon size={15} />}
            </button>
        </div>
    );
}
