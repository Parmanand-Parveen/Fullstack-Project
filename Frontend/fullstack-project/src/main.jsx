import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/Store.js";
import { ThemeProvider } from "./components/theme/theme-provider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ThemeProvider>
    <Provider store={store}>
       <App/>
    </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
