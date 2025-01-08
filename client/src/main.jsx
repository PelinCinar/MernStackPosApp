import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
//scrit modedan kaynaklı konsol tarafında ikinci defa render etmesinin sebebi
import { Provider } from "react-redux";
import store from "./redux/store.js";
createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <App />
    </Provider>

);
