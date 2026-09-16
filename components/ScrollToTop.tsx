"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="חזרה למעלה"
      className="fab-float fixed bottom-6 left-6 z-40 w-11 h-11 rounded-[10px] bg-abyss-900 text-white shadow-pop flex items-center justify-center hover:bg-ember-600 transition-colors duration-200"
    >
      <ArrowUp className="w-5 h-5" strokeWidth={1.5} />
    </button>
  );
}
