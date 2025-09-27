import { useEffect } from "react";

const useDebounce = (callback, delay, deps) => {
  useEffect(() => {
    const handler = setTimeout(() => callback(), delay);
    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};

export default useDebounce;
