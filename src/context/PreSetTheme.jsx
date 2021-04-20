import React from "react";

export const PreSetTheme = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      (function() {
        function getInitialMode() {
          const stored = window.localStorage.getItem('color-mode');
          if (stored && (stored === "dark" || stored === "light")) {
            return stored;
          }
          const mql = window.matchMedia('(prefers-color-scheme: dark)');
          return mql.matches ? 'dark' : 'light';
        }
    
        const mode = getInitialMode();
        localStorage.setItem('color-mode', mode);
      })();
    `
    }}
  />
);
