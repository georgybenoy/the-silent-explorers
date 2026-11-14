---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance across accessibility, focus states, forms, animations, typography, performance, and interaction. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check site against best practices".
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review code and components for strict compliance with modern Web Interface Guidelines, covering accessibility, focus management, semantic HTML, animation hygiene, responsive typography, and interaction patterns.

## When to Apply

Use this skill when:
- Reviewing UI components or layout code (`review my UI`, `audit design`, `review UX`)
- Checking accessibility (`check a11y`, `verify WCAG compliance`)
- Auditing micro-interactions, animations, and focus rings
- Checking that new UI code adheres to production-grade web guidelines

## Execution Procedure

1. Read the target files or components specified by the user.
2. Cross-reference the code against the [Web Guidelines Reference](./references/guidelines.md).
3. If an internet connection is active, optionally fetch the latest updates from:
   `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
4. Report findings in concise, high-signal `file:line` format:

```text
## src/components/Navigation.tsx
src/components/Navigation.tsx:42 - Icon-only button missing aria-label
src/components/Navigation.tsx:55 - CSS transition: all detected; specify animated properties
src/components/Navigation.tsx:78 - Missing prefers-reduced-motion media query check

## src/components/Hero.tsx
✓ pass
```

## Core Rule Checklist

- **Accessibility**: Semantic elements (`<button>`, `<a>`, `<label>`), `aria-label` on icon buttons, keyboard triggers, `aria-live` for dynamic changes.
- **Focus States**: Visible focus indicator on `:focus-visible`, no unstyled `outline: none`, `:focus-within` for composite elements.
- **Animations**: Compositor-only properties (`transform`, `opacity`), explicit transition properties (never `all`), respect `prefers-reduced-motion`.
- **Typography & Content**: Real typographic symbols (`…`, curly quotes), tabular numbers for numerical readouts, text overflow handling (`truncate` / `min-w-0`).
- **Media & Images**: Explicit `width` and `height` to eliminate CLS, `loading="lazy"` on below-the-fold media, `fetchpriority="high"` for hero visuals.
- **Interaction**: `touch-action: manipulation`, no paste blocking, accessible hit targets (minimum 44x44px).
