"use client";

import { forwardRef } from "react";

// A video cropped to its frame so the piece sits a little above the centre. `focus` is where
// the diamond is in the video (0–1 from the left / top); `zoom` crops in a little further.
// The crop is done by the browser (object-position + a scale about a computed origin), so the
// file keeps its full resolution. Without `focus` it simply covers the frame.

export type VideoFocus = { x: number; y: number };

// Where the diamond should land in the frame: centred, a little above the middle.
const TARGET = { x: 0.5, y: 0.42 };
const DEFAULT_ZOOM = 1.2;

export function focusStyle(focus?: VideoFocus, zoom = DEFAULT_ZOOM): React.CSSProperties {
  if (!focus) return {};
  // object-position puts the focus point at the same fraction of the frame; scaling by `zoom`
  // about origin O then moves it to TARGET when O = (zoom·focus − TARGET) / (zoom − 1).
  // O stays inside the frame so the scaled video still covers it edge to edge.
  const origin = (f: number, t: number) => Math.min(1, Math.max(0, (zoom * f - t) / (zoom - 1)));
  return {
    objectPosition: `${focus.x * 100}% ${focus.y * 100}%`,
    transform: zoom > 1 ? `scale(${zoom})` : undefined,
    transformOrigin: zoom > 1 ? `${origin(focus.x, TARGET.x) * 100}% ${origin(focus.y, TARGET.y) * 100}%` : undefined,
  };
}

const FocusVideo = forwardRef<
  HTMLVideoElement,
  React.VideoHTMLAttributes<HTMLVideoElement> & { focus?: VideoFocus; zoom?: number }
>(function FocusVideo({ focus, zoom, className = "", style, ...props }, ref) {
  return (
    <video
      ref={ref}
      {...props}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ ...focusStyle(focus, zoom), ...style }}
    />
  );
});

export default FocusVideo;
