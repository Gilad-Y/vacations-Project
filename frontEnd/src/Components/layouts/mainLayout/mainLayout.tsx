import MainRoute from "../../Routes/mainRoute/mainRoute";
import Footer from "../footer/footer";
import Header from "../header/header";
import Menu from "../menu/menu";
import "./mainLayout.css";

function MainLayout(): JSX.Element {
  return (
    <div className="mainLayout">
      <header>
        <Header />
      </header>
      <aside>
        <Menu />
      </aside>
      <main>
        <MainRoute />
      </main>
      {/* <footer>
                <Footer/>
            </footer> */}
    </div>
  );
}

export default MainLayout;
