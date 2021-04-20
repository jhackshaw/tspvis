import React from "react";
import { Switch } from "@material-ui/core";
import { useThemeContext } from "../context";

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useThemeContext();

  return (
    <Switch
      checked={colorMode === "dark"}
      onChange={toggleColorMode}
      color="secondary"
    />
  );
};
