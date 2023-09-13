import { Content } from "./components/Content";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header />
            <main className="mt-28 lg:mt-16">
                <Content />
            </main>
        </>
    );
}

export default App;
