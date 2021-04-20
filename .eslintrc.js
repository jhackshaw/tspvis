module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: "react-app",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    __PATH_PREFIX__: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"]
};
