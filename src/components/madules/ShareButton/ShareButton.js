"use client";

import { CiShare2 } from "react-icons/ci";

export default function ShareButton({ productId, productName }) {

    const handleShare = async () => {
        const url = `https://sanecomputer.com/product/${productId}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: productName,
                    text: `مشاهده این محصول`,
                    url,
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            await navigator.clipboard.writeText(url);
            alert("لینک کپی شد.");
        }
    };

    return (
        <span onClick={handleShare}>
            <CiShare2 size={20} weight="thin" color="var(--them)" />
        </span>
    );
}