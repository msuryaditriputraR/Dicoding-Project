import PageButton from "./PageButton";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";

const Header = ({ handleSwitchPage, isArchivePage, keyword, handleSearch }) => {
    return (
        <header className="fixed bg-white left-0 px-5 top-0 z-40 w-full shadow-sm">
            <div className="container flex justify-between items-center flex-wrap lg:flex-nowrap h-28 lg:h-16">
                <h1 href="#" className="text-xl font-semibold">
                    NOTES
                </h1>
                <Search
                    placeholder={isArchivePage ? "Archive" : "Notes"}
                    keyword={keyword}
                    handleSearch={handleSearch}
                />
                <div className="flex items-center gap-x-4">
                    <PageButton
                        handleSwitchPage={handleSwitchPage}
                        isArchivePage={isArchivePage}
                    />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
