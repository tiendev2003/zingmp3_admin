import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./main.scss";

function Main({ children, containerName }) {
    return (
        <main className="main">
            <Sidebar />
            <Navbar />
            <div className={`main-container ${containerName}`}>
                <div className="sub_container">
                    {children}
                </div>
                <Footer />
            </div>
        </main >
    )
}

export default Main;

/*

import Main from "../../utils/main/Main";
 
<Main containerName="home">

</Main>

*/
