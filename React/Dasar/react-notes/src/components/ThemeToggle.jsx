import { useEffect, useState } from "react";
import { BiSun, BiMoon } from "react-icons/bi";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList[isDark ? "add" : "remove"]("dark");
    }, [isDark]);
    return (
        <div onClick={() => setIsDark(!isDark)}>
            {!isDark ? <BiMoon /> : <BiSun />}
        </div>
    );
};

export default ThemeToggle;
