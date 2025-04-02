import Footer from "./Footer";
import Navbar from "./NavBar";

interface Props {
    children: React.ReactNode;
}

const MainLayout = ({children}: Props) => {
    return (
        <>
            <Navbar />
                <div className="flex flex-col min-h-screen flex-grow bg-primary" >
                    { children }
                </div>
            <Footer />
        </>
    )
};

export default MainLayout;