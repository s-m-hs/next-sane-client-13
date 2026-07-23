"use client";

import { product, system } from "@/utils/DataStore";
import { CiShare2 } from "react-icons/ci";

export default function ShareButton({ productId, productName, type }) {

    const handleShare = async () => {
        const url = type == product ? `https://sanecomputer.com/product/${productId}` :
            type == system ?
                `https://sanecomputer.com/computers/${productId}` : ''
            ;

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