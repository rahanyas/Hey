import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar.compo";
import Footer from '../components/Footer.compo';
import '../styles/components/layout.compo.scss';
import ShowErrMsg from "../Pages/ErrorMsgPage/Msg.page";

const Layout = () => {

  return (
    <div className="layout">
      <Navbar />
      <main className="page-content">
        <ShowErrMsg />
        <Outlet /> {/* All routed pages appear here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;