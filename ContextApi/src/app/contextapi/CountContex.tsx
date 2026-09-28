import { createContext, ReactNode, useState } from 'react';

// create
// provide
// use

export const CountContext = createContext<{
    count: number;
    increment: () => void;
}>({
    count: 0,
    increment: () => { },
});

type CountProviderProps = {
    children: ReactNode;
};

const CountProvider = ({ children }: CountProviderProps) => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(count + 1);

    return (
        <CountContext.Provider value={{ count, increment }}>
            {children}
        </CountContext.Provider>
    );
};

export default CountProvider;