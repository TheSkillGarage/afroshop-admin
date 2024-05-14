import { useEffect, useState } from "react";

const OutSideClick = (ref) => {
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.addEventListener("mousedown", handleClickOutside);
    }
  }, [ref]);
  return isClicked;
};

export default OutSideClick;
