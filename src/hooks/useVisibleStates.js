import { useState, useCallback } from "react";

/**
 *
 * @param {boolean} status
 */
export default function useVisibleState(status = false) {
  const [isVisible, setIsVisible] = useState(status);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  return {
    visible: isVisible,
    show,
    hide,
    toggle,
  };
}
