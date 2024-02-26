import "./App.css";
import RouterApp from "./routes";
import Footer from "./componentes/Footer";
import UserProvider from "./contexts/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import DominioProvider from "./contexts/dominio";
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <DominioProvider>
          <ToastContainer autoClose={3000} />
          <RouterApp />
          <Footer />
        </DominioProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
