import { useState } from "react";
import { Content } from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    const [isArchivePage, setIsArchivePage] = useState(false);
    const [keyword, setKeyword] = useState("");

    const handleSearch = (value) => setKeyword(value);

    const handleSwitchPage = () => setIsArchivePage(!isArchivePage);
    return (
        <>
            <Header
                handleSwitchPage={handleSwitchPage}
                isArchivePage={isArchivePage}
                keyword={keyword}
                handleSearch={handleSearch}
            />
            <main className="mt-28 lg:mt-16">
                <Content isArchivePage={isArchivePage} />
            </main>
            <Footer />
        </>
    );
}

export default App;
