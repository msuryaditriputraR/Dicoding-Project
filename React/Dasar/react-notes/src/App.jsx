import { useState } from "react";
import { Content } from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    const [isArchivePage, setIsArchivePage] = useState(false);

    const handleSwitchPage = () => setIsArchivePage(!isArchivePage);
    return (
        <>
            <Header
                handleSwitchPage={handleSwitchPage}
                isArchivePage={isArchivePage}
            />
            <main className="mt-28 lg:mt-16">
                <Content isArchivePage={isArchivePage} />
            </main>
            <Footer />
        </>
    );
}

export default App;
