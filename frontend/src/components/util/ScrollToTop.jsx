import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 🛠️ Reset scroll to top on every navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "instant" to prevent a slow scrolling look
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
