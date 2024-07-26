import { useEffect, useState } from 'react';

export const useDebounceCustomHook = (value, delay) => {
    const [valueDebounce, setValueDebounce] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setValueDebounce(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return valueDebounce;
};
