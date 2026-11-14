# Web Interface Guidelines & Rules Reference

Review UI code for compliance with Web Interface Guidelines across accessibility, focus states, animation, typography, and interaction.

## 1. Accessibility
- Icon-only buttons need `aria-label`.
- Form controls need `<label>` or `aria-label`.
- Interactive elements need keyboard handlers (`onKeyDown`/`onKeyUp`).
- `<button>` for actions, `<a>`/`<Link>` for navigation (not `<div onClick>`).
- Images need `alt` (or `alt=""` if decorative).
- Decorative icons need `aria-hidden="true"`.
- Async updates (toasts, validation) need `aria-live="polite"`.
- Use semantic HTML (`<button>`, `<a>`, `<label>`, `<table>`) before ARIA.
- Headings hierarchical `<h1>`–`<h6>`; include skip link for main content.
- `scroll-margin-top` on heading anchors.
- Meaningful media needs captions, transcripts, or descriptions as applicable.
- Media controls need keyboard support; decorative media needs assistive-tech hiding.

## 2. Focus States
- Interactive elements need visible focus: `focus-visible:ring-*` or equivalent.
- Never `outline-none` / `outline: none` without focus replacement.
- Use `:focus-visible` over `:focus` (avoid focus ring on click).
- Group focus with `:focus-within` for compound controls.
- Sticky headers/footers/overlays must not cover the focused element.

## 3. Forms
- Inputs need `autocomplete` and meaningful `name`.
- Use correct `type` (`email`, `tel`, `url`, `number`) and `inputmode`.
- Never block paste (`onPaste` + `preventDefault`).
- Labels clickable (`htmlFor` or wrapping control).
- Disable spellcheck on emails, codes, usernames (`spellCheck={false}`).
- Checkboxes/radios: label + control share single hit target (no dead zones).
- Submit button stays enabled until request starts; spinner during request.
- Errors inline next to fields; focus first error on submit.
- Placeholders end with `…` and show example pattern.
- `autocomplete="off"` on non-auth fields to avoid password manager triggers.
- Warn before navigation with unsaved changes (`beforeunload` or router guard).

## 4. Animation
- Honor `prefers-reduced-motion` (provide reduced variant or disable).
- Animate `transform`/`opacity` only (compositor-friendly).
- Never `transition: all`—list properties explicitly.
- Set correct `transform-origin`.
- SVG: transforms on `<g>` wrapper with `transform-box: fill-box; transform-origin: center`.
- Animations interruptible—respond to user input mid-animation.
- Autoplay motion >5 seconds alongside other content needs pause, stop, or hide controls.
- Muted decorative loops must stop under `prefers-reduced-motion`.

## 5. Typography
- `…` not `...`.
- Curly quotes `“` `”` not straight `"`.
- Non-breaking spaces: `10&nbsp;MB`, `⌘&nbsp;K`, brand names.
- Loading states end with `…`: `"Loading…"`, `"Saving…"`.
- `font-variant-numeric: tabular-nums` for number columns/comparisons.
- Use `text-wrap: balance` or `text-pretty` on headings (prevents widows).

## 6. Content Handling
- Text containers handle long content: `truncate`, `line-clamp-*`, or `break-words`.
- Flex children need `min-w-0` to allow text truncation.
- Handle empty states—don't render broken UI for empty strings/arrays.
- User-generated content: anticipate short, average, and very long inputs.

## 7. Images & Media
- `<img>` needs explicit `width` and `height` (prevents CLS).
- Below-fold images: `loading="lazy"`.
- Above-fold critical images: `priority` or `fetchpriority="high"`.
- Prefer `<video autoplay muted loop playsinline>` over animated GIF; provide a still alternative.
- Short non-essential loops: Safari H.264 MP4 `<picture>` source, `prefers-reduced-motion` media condition, and still fallback.

## 8. Performance
- Large lists (>50 items): virtualize (`content-visibility: auto` or windowing).
- No layout reads in render (`getBoundingClientRect`, `offsetHeight`, `offsetWidth`, `scrollTop`).
- Batch DOM reads/writes; avoid interleaving.
- Prefer uncontrolled inputs; controlled inputs must be cheap per keystroke.
- Add `<link rel="preconnect">` for CDN/asset domains.
- Critical fonts: `<link rel="preload" as="font">` with `font-display: swap`.

## 9. Navigation & State
- URL reflects state—filters, tabs, pagination, expanded panels in query params.
- Links use `<a>`/`<Link>` (Cmd/Ctrl+click, middle-click support).
- Deep-link all stateful UI (if uses `useState`, consider URL sync).
- Destructive actions need confirmation modal or undo window—never immediate.

## 10. Touch & Interaction
- `touch-action: manipulation` (prevents double-tap zoom delay).
- `-webkit-tap-highlight-color` set intentionally.
- `overscroll-behavior: contain` in modals/drawers/sheets.
- Page rubber-band suppression: `overscroll-behavior: none` on `<html>` inside `@media (pointer: fine)`.
- During drag: disable text selection, `inert` on dragged elements.
- Drag/swipe/pinch/path gestures need tap/click and keyboard alternatives unless essential.
- `autoFocus` sparingly—desktop only, single primary input; avoid on mobile.

## 11. Safe Areas & Layout
- Full-bleed layouts need `env(safe-area-inset-*)` for notches.
- Avoid unwanted scrollbars: `overflow-x-hidden` on containers, fix content overflow.
- Flex/grid over JS measurement for layout.

## 12. Dark Mode & Theming
- `color-scheme: dark` on `<html>` for dark themes (fixes scrollbar, inputs).
- `<meta name="theme-color">` matches page background.
- Native `<select>`: explicit `background-color` and `color` (Windows dark mode).

## 13. Locale & i18n
- Dates/times: use `Intl.DateTimeFormat` not hardcoded formats.
- Numbers/currency: use `Intl.NumberFormat` not hardcoded formats.
- Detect language via `Accept-Language` / `navigator.languages`, not IP.
- Brand names, code tokens, identifiers: wrap with `translate="no"`.

## 14. Anti-Patterns to Flag
- `user-scalable=no` or `maximum-scale=1` disabling zoom.
- `onPaste` with `preventDefault`.
- `transition: all`.
- `outline-none` without focus-visible replacement.
- Inline `onClick` navigation without `<a>`.
- `<div>` or `<span>` with click handlers (should be `<button>`).
- Images without dimensions.
- Large arrays `.map()` without virtualization.
- Form inputs without labels.
- Icon buttons without `aria-label`.
- Hardcoded date/number formats (use `Intl.*`).
- `autoFocus` without clear justification.
- Gesture-only action without tap/click and keyboard alternative.
