// https://stackoverflow.com/questions/55075604/react-hooks-useeffect-only-on-update
import { useEffect, useRef } from "react";

export const useUpdateEffect = (effect, dependencies = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};
