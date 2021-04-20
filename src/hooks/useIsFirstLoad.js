export const useIsFirstLoad = (keyName = "isFirstVisit") => {
  if (!window.localStorage) {
    return false;
  }

  if (!localStorage[keyName]) {
    localStorage.setItem(keyName, true);
    return true;
  }

  return false;
};
