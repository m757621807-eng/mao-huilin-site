// A CSS-only fade so the entrance mask always resolves to transparent even
// if JS hydration is slow, errors, or the tab loads in the background (a
// requestAnimationFrame-driven fade can get stuck fully opaque in that case,
// permanently hiding everything behind it — including AmbientLight).
export default function PageEntrance() {
  return (
    <div
      aria-hidden
      className="page-entrance pointer-events-none fixed inset-0 z-50 bg-background"
    />
  );
}
