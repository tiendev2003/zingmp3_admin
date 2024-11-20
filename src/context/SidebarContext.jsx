import { createContext, useState, useEffect } from "react";
export const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [sidebarActive, setSidebarActive] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        // Attach event listener to window resize
        window.addEventListener('resize', handleResize);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        windowWidth > 768 ? setSidebarActive(true) : setSidebarActive(false)
    }, [windowWidth])

    return (
        <SidebarContext.Provider value={{ sidebarActive, setSidebarActive }}>
            {children}
        </SidebarContext.Provider>
    )
}