'use client'
import { Provider } from "react-redux";

export function Providers({ children }) {
    return <Provider>
        {children}
    </Provider>
}