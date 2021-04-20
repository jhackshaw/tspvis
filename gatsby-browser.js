import React from "react";
import { Provider } from "react-redux";
import store from "./src/store/store";
import "react-vis/dist/style.css";
import "prismjs/themes/prism-tomorrow.css";
import "typeface-roboto";
import { ThemeContextProvider } from "./src/context";

export const wrapRootElement = ({ element }) => (
  <ThemeContextProvider>
    <Provider store={store}>{element}</Provider>
  </ThemeContextProvider>
);

export const onServiceWorkerUpdateReady = () => {
  window.location.reload();
};
