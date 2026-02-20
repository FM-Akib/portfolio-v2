"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const SCROLL_THRESHOLD = 400;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 z-30 h-11 w-11 rounded-full border-border bg-background/95 shadow-md backdrop-blur md:bottom-6 md:right-6 md:h-12 md:w-12"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5 md:h-6 md:w-6" />
    </Button>
  );
}
