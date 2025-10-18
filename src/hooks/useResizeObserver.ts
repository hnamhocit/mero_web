import { useEffect, useRef, useState } from "react";

export const useResizeObserver = () => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!ref.current) return;

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setHeight(entry.contentRect.height);
        }
      });

      observer.observe(ref.current);

      return () => observer.disconnect();
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return { height, ref };
};
