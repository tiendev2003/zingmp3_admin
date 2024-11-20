import { createContext, useEffect, useState, useContext } from "react";

export const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('dark-mode');
        return storedTheme ? JSON.parse(storedTheme) : false;
    });

    useEffect(function () {
        localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));

        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isDarkMode])

    function toggleDarkMode() {
        setIsDarkMode((isDark) => !isDark);
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

function useDarkMode() {
    const context = useContext(DarkModeContext);

    if (context === undefined)
        throw new Error("DarkModeContext was used outside of DarkModeProvider");
    return context;
}

export { DarkModeProvider, useDarkMode }