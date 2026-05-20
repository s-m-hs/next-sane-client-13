'use client'

import SearchComp from '@/components/templatess/Search/SearchComp'
import React from 'react'

export default function SearchResult({ params }) {
    const { id } = params
    const convertAllNumbersToEnglish = (str) => {
        const numberMap = {
            // فارسی
            '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
            '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
            // عربی
            '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
            '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
        };
        return str.replace(/[۰-۹٠-٩]/g, (char) => numberMap[char] || char);
    }

    let decodedId = decodeURIComponent(id)
    decodedId = convertAllNumbersToEnglish(decodedId)
    return (
        <SearchComp param={decodedId} />
    )
}
