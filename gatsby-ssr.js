import React from "react";
import { ThemeContextProvider, PreSetTheme } from "./src/context";
import { Provider } from "react-redux";
import store from "./src/store/store";
import "react-vis/dist/style.css";

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeContextProvider>
      <Provider store={store}>{element}</Provider>
    </ThemeContextProvider>
  );
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<PreSetTheme key="prerender-theme" />]);
};
