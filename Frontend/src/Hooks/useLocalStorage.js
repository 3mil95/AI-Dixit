import { useEffect, useState } from 'react';
const { v4: uuidv4 } = require('uuid');

const PRIEFIX = "AI-dixit-";

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PRIEFIX + key;

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) { 
            return JSON.parse(jsonValue);
        }
        return uuidv4();
        /*if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }*/
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}


