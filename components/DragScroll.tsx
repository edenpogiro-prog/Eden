"use client";

import { useRef } from "react";

// Native overflow-x-auto only responds to touch/trackpad swipe — a mouse
// click-drag does nothing by default. This adds real click-and-drag
// scrolling for desktop, on top of the existing native touch scrolling.
export default function DragScroll({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return; // touch/pen keep native scrolling
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  }

  function endDrag() {
    drag.current.active = false;
  }

  function onClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    // Swallow the click that follows a real drag so links inside don't fire.
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onClickCapture={onClickCapture}
      className={`cursor-grab active:cursor-grabbing ${className}`}
    >
      {children}
    </div>
  );
}
