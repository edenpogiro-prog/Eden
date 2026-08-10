"use client";

import { useEffect, useRef, useState } from "react";
import { Accessibility, Contrast, Minus, Plus, RotateCcw, X } from "lucide-react";

const FONT_SCALE_KEY = "a11y-font-scale";
const CONTRAST_KEY = "a11y-contrast";

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [contrast, setContrast] = useState(false);
  const [ready, setReady] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Load saved preferences on mount (a blocking script in <head> already
  // applied them to <html> before paint — this just syncs React state).
  useEffect(() => {
    const savedScale = Number(localStorage.getItem(FONT_SCALE_KEY) ?? "1");
    setFontScale([1, 2, 3].includes(savedScale) ? savedScale : 1);
    setContrast(localStorage.getItem(CONTRAST_KEY) === "true");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.setAttribute("data-a11y-font-scale", String(fontScale));
    localStorage.setItem(FONT_SCALE_KEY, String(fontScale));
  }, [fontScale, ready]);

  useEffect(() => {
    if (!ready) return;
    if (contrast) {
      document.documentElement.setAttribute("data-a11y-contrast", "true");
    } else {
      document.documentElement.removeAttribute("data-a11y-contrast");
    }
    localStorage.setItem(CONTRAST_KEY, String(contrast));
  }, [contrast, ready]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("button, a[href]")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        ref={toggleRef}
        onClick={() => setOpen((v) => !v)}
        aria-label="הגדרות נגישות"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="a11y-panel"
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-[10px] bg-abyss-900 text-white shadow-pop flex items-center justify-center hover:bg-ember-600 transition-colors duration-200"
      >
        <Accessibility className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {open && (
        <div
          id="a11y-panel"
          ref={panelRef}
          role="region"
          aria-label="הגדרות נגישות"
          className="fixed bottom-20 right-6 z-40 w-72 max-w-[calc(100vw-3rem)] rounded-[14px] bg-white border border-line shadow-pop p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-ink text-base">הגדרות נגישות</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגור הגדרות נגישות"
              className="p-1 text-mauve hover:text-ink transition-colors duration-150"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="mb-4">
            <span className="block text-sm font-semibold text-ink mb-2">גודל טקסט</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFontScale((s) => Math.max(1, s - 1))}
                disabled={fontScale <= 1}
                aria-label="הקטן טקסט"
                className="w-9 h-9 rounded-[8px] border border-line flex items-center justify-center text-ink disabled:opacity-40 hover:border-ember-600 transition-colors duration-150"
              >
                <Minus className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => setFontScale(1)}
                aria-label="אפס גודל טקסט לברירת המחדל"
                className="w-9 h-9 rounded-[8px] border border-line flex items-center justify-center text-ink hover:border-ember-600 transition-colors duration-150"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => setFontScale((s) => Math.min(3, s + 1))}
                disabled={fontScale >= 3}
                aria-label="הגדל טקסט"
                className="w-9 h-9 rounded-[8px] border border-line flex items-center justify-center text-ink disabled:opacity-40 hover:border-ember-600 transition-colors duration-150"
              >
                <Plus className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setContrast((c) => !c)}
            aria-pressed={contrast}
            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-[8px] border border-line text-ink text-sm font-semibold hover:border-ember-600 transition-colors duration-150"
          >
            <span className="flex items-center gap-2">
              <Contrast className="w-4 h-4" strokeWidth={1.5} />
              ניגודיות גבוהה
            </span>
            <span
              aria-hidden="true"
              className={`w-9 h-5 rounded-full relative transition-colors duration-150 ${
                contrast ? "bg-ember-600" : "bg-line"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-150 ${
                  contrast ? "left-0.5" : "right-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      )}
    </>
  );
}
