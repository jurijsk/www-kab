# Copilot / AI Agent Instructions for this repo

This is a small Nuxt 4 single-page portfolio site (static target). Keep guidance compact and specific to discovered patterns.

- **Big picture:** Nuxt 4 app using `@nuxt/content` and `@nuxt/fonts`. The repo is structured under `app/` (pages, components). Page text content lives in Nuxt Content Markdown (MDC) under `content/` — there is no `@nuxtjs/i18n` and no `nuxt-studio` (both were removed; content is edited locally and pushed).
- **Primary intent:** single-page, multilingual static site (host on GitHub Pages). Prefer static generation via `npm run generate` unless asked to change hosting model.

- **Key files / locations:**
  - `nuxt.config.ts` — module list, `i18n` configuration and compatibility/experimental flags.
  - `package.json` — scripts: `dev`, `build`, `generate`, `preview`, `postinstall` (`nuxt prepare`). Use these scripts for local workflows.
  - `app/` — entry: `app/app.vue`, pages in `app/pages`, components in `app/components`.
  - `content/` — Nuxt Content collections (see `content.config.ts`). `content/en/home.md` is the home page authored as MDC blocks (`::hero`, `::contact-banner`, `::intro`, `::site-header`, `::site-footer`); services live under `content/services/`.
  - `public/` — static assets and `robots.txt`.

- **Developer workflows (explicit):**
  - Start dev server: `npm run dev` (hot reload + devtools enabled in config).
  - Build for production: `npm run build`.
  - Generate static site: `npm run generate` — use this when preparing artifacts for GitHub Pages.
  - Preview generated site: `npm run preview`.

- **Dev server port (strict):**
  - The dev server port is pinned in `nuxt.config.ts` via `devServer: { port: 3005 }`. Only ever run the dev server on **that** port; never start it on a different/alternative port.
  - You may **stop and start only** the process on the `devServer` port (3005). Do **not** kill, scan-and-kill, or otherwise touch processes on any other port — other ports may belong to the user's other apps. When freeing the port before a restart, target 3005 specifically (e.g. only the PID listening on `:3005`).

- **Content & localization convention:**
  - Page text is managed via `@nuxt/content` as MDC Markdown under `content/`, NOT via translation keys. Components bind to content through props and slots.
  - The home page (`app/pages/index.vue`) queries the `home` collection and renders `content/en/home.md` with `<ContentRenderer>`. Section components live in `app/components/content/` so MDC `::block` tags resolve (e.g. `::hero` → `app/components/content/Hero.vue`, `::service-grid` → `ServiceGrid.vue`, `::testimonials` → `Testimonials.vue`, `::contact` → `Contact.vue`).
  - Structured lists are arrays of typed objects in MDC block frontmatter (e.g. Hero `locations: [{ kind, label }]`), or dedicated content collections for larger lists (e.g. services). Define schemas with `z` (re-exported from `@nuxt/content`) in `content.config.ts`.
  - Localization is planned as one content file per locale (`content/<locale>/…`), selected by a `useState('locale')` switch (see `Hero.vue`) — currently English only. Do not reintroduce `@nuxtjs/i18n` without discussion.
  - Do not introduce new content backends without justification; prefer `@nuxt/content`.

- **Patterns & small examples:**
  - Pages are single-file Vue components in `app/pages/*.vue` (e.g. `app/pages/index.vue`). Components live in `app/components` (e.g. `AppAlert.vue`). Keep components small and focused.
  - Global shell and routing are via `app/app.vue` using `<NuxtPage />`.
  - Auto-imports: Components placed in `components/` (project root) are auto-imported by Nuxt/Vue — do not add explicit `import` statements for those. If you add components under `app/components/`, either import them explicitly or configure `nuxt.config.ts` to include that folder for auto-imports.

**Commenting guideline for AI agents:**
- Avoid adding comments that merely restate what the code already shows (e.g., "// imports Header component" next to an import). Do not add comments that are obvious from reading the code or are standard framework behaviors documented by Nuxt/Vue. Add comments only when they provide value: rationale, non-obvious implementation notes, or references to external design tokens or Figma frame IDs.

- **Nuxt config notes:**
  - Keep `compatibilityDate` and `future.experimental` settings intact unless there is a clear migration reason.
  - Devtools are enabled in the config to assist local debugging — safe to use.

- **Styling:**
  - Use modern, plain CSS for all styling. Do not add CSS frameworks (Tailwind, Bootstrap, etc.) unless you have explicit approval.
  - Prefer component-scoped `<style>` blocks in files under `app/components` and place global styles in `app/assets` or `app/styles`.
  - Follow simple, maintainable conventions (CSS variables, logical class names). The README and Figma designs are the ground truth for visual decisions.
  - CSS custom properties: use underscores to separate words (example: `--custom_property`). Always keep the leading `--` when declaring variables.
  - **CSS class naming:** Do not use BEM-style `parent__child` naming. Instead, use CSS nesting to scope styles and choose semantic class names that describe what the element *is* or *does*, not its location in the DOM hierarchy. Example: use `.hero { .headline { ... } }` instead of `.hero__headline { ... }`.

- **Responsive design:**
  - **Fluid typography:** The base font size (`----type_ramp_base`) uses `clamp()` to scale smoothly from 16px at 375px viewport to 22px at 2000px+. All `rem`-based sizes scale automatically.
  - **Container queries:** Use `@container page (max-width: Xrem)` for layout changes instead of viewport-based `@media` queries. This responds to content width (max 2000px) rather than screen size.
  - **Fallback pattern:** Always include a fallback for older browsers:
    ```css
    @container page (max-width: 50rem) { /* modern browsers */ }
    @supports not (container-type: inline-size) {
      @media (max-width: 900px) { /* fallback */ }
    }
    ```
  - **Full-bleed sections:** Sections always span full viewport width (for backgrounds). Inside, use `.content` wrapper to constrain content:
    ```html
    <section class="my_section">
      <div class="content">
        <!-- content constrained to max-width -->
      </div>
    </section>
    ```
    For special cases like Hero (two columns with different backgrounds), handle layout directly in the section without `.content`.
  - **Fluid spacing:** `--page_side_spacing` and `--section_block_spacing` also use `clamp()` for proportional margins.

- **When an AI agent should modify code:**
  - If adding a locale: add a content file per locale (e.g. `content/<code>/home.md`) and wire the `useState('locale')` switch in `Hero.vue` to select it. Do not reintroduce `@nuxtjs/i18n`.
  - If adding pages/components: place them under `app/pages` or `app/components` respectively and avoid changing global layout unless requested.
  - If adding new npm packages: require an explicit justification in the git message; prefer existing modules.

- **Do not assume:**
  - No test harness was found — avoid creating tests without asking the repo owner.

If anything is unclear or you want more detail about a specific area (i18n, content, deploy steps), tell me which section to expand.
