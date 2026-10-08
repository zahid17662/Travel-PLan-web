# Travel Plan — project rules

- Stack: Vite, React, TypeScript (strict, no `any`), Tailwind CSS, React Router,
  TanStack Query, Zustand, React Hook Form + Zod, dnd-kit, react-leaflet,
  Recharts, lucide-react.
- The visual source of truth is the Paper design file. Match layout, spacing,
  typography and color exactly. Primary color is #bce784 (light lime): use
  dark text on primary fills, never white.
- Never hardcode colors or font sizes in components; use Tailwind theme tokens
  defined in src/styles/index.css.
- Components: function components, named exports, props typed with interfaces,
  one component per file, max ~150 lines (split if longer).
- Pages are thin; logic lives in features/, hooks/ and services/.
- All data comes through src/services (mock, async, typed). Components never
  import from src/data directly.
- Every screen needs: loading (skeleton), empty, and error states.
- Responsive mobile-first (390px, 768px, 1024px, 1440px breakpoints).
- Accessibility: semantic HTML, labels, focus rings, keyboard support for
  modals/tabs/dropdowns, alt text, aria-live for toasts.
- After each task: run `npm run build` and `npm run lint`, and fix all errors.
