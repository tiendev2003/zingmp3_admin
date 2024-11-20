import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { SidebarContextProvider } from "./context/SidebarContext.jsx";
import "./index.scss";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <SidebarContextProvider>
          <AuthProvider>
            <App />
            <ToastContainer />
          </AuthProvider>
        </SidebarContextProvider>
      </DarkModeProvider>
    </Provider>
  </React.StrictMode>
);

 