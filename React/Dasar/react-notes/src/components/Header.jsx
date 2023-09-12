import { BiArchive } from "react-icons/bi";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
    return (
        <header className="fixed left-0 px-5 top-0 z-50 w-full shadow-sm">
            <div className="container flex justify-between items-center flex-wrap lg:flex-nowrap h-28 lg:h-16">
                <h1 href="#" className="text-xl font-semibold">
                    NOTES
                </h1>
                <Search />
                <div className="flex items-center gap-x-4">
                    <div className="inline-flex items-center gap-x-1 border shadow-sm cursor-pointer hover:text-green-500 rounded-md px-3 py-2 hover:border-green-500">
                        <BiArchive />
                        Archive
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
