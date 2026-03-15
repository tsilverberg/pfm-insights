# Figma BDS Libraries — MCP Integration Guide

## BDS File IDs

| Library | File ID | Use When |
|---|---|---|
| Design Tokens 2.0 | `ulkxigZpLlG77lOkdkKS0k` | Always — query first for all tokens |
| Web Components & Patterns | `OfCMgWHu0KelJCPkDYfpAb` | All web UI |
| Community Components & Patterns | `CoYuKks8e8rAdYMilk2j35` | Shared / cross-platform patterns |
| Templates (WIP) | `iwM9GqeyT60GleAeFbmBJR` | Full page layouts and journey flows |
| Data Visualization | `MtYZ0mw9gKFkLH7lEMBjnj` | Charts, graphs, dashboards |
| iOS Components & Patterns | `qBjs900rV1dYOsrv6m6snk` | iOS / SwiftUI output only |
| Android Components & Patterns | `Wp5iI1RmJQfpzzRl0eYt7k` | Android / Jetpack Compose only |

---

## Figma MCP Tools

All tools require `nodeId` and `fileKey`. For web output, always pass:
- `clientLanguages`: `"typescript,html,scss"`
- `clientFrameworks`: `"angular"`

### get_metadata
Browse file structure. Returns node IDs, layer types, names, positions, sizes in XML.
Use `nodeId: "0:1"` to get the top-level page listing.

**When to use:** Discovering what's available, finding node IDs for components or pages.

### get_design_context
Primary design-to-code tool. Returns reference code, screenshot, and contextual metadata (Code Connect snippets, documentation links, design annotations, token references).

**When to use:** Getting the full picture of a component — visual appearance, code reference, and token usage.

Response includes:
- Reference code (React+Tailwind by default — **adapt to Angular/vanilla HTML**)
- Screenshot of the node
- Code Connect snippets (if configured)
- Component documentation links
- Design annotations
- Design tokens as CSS variables — map to `--bb-*` token system

### get_variable_defs
Extract design token / variable definitions for a node. Returns variable names mapped to resolved values.

**When to use:** Looking up specific token values for a component or page.

### get_screenshot
Generate a screenshot of a node. Visual reference only.

**When to use:** Quick visual check, comparing design to output, validating layout.

---

## Query Sequences

### Finding a Component (e.g., Button)
1. `get_metadata(fileKey: "OfCMgWHu0KelJCPkDYfpAb", nodeId: "0:1")` — list pages
2. Identify the page containing the component
3. `get_metadata(fileKey: "OfCMgWHu0KelJCPkDYfpAb", nodeId: "<page-id>")` — drill in
4. `get_design_context(fileKey: "OfCMgWHu0KelJCPkDYfpAb", nodeId: "<component-node-id>")` — full details
5. `get_variable_defs(fileKey: "ulkxigZpLlG77lOkdkKS0k", nodeId: "<token-node>")` — token values

### Looking Up Design Tokens
1. `get_metadata(fileKey: "ulkxigZpLlG77lOkdkKS0k", nodeId: "0:1")` — list token pages
2. Identify the relevant token category page
3. `get_variable_defs(fileKey: "ulkxigZpLlG77lOkdkKS0k", nodeId: "<category-node-id>")` — extract definitions

### Known Node IDs (verified)
| Component | File | Node ID |
|---|---|---|
| Design Tokens Welcome | `ulkxigZpLlG77lOkdkKS0k` | `305:0` |
| Token color ellipses | `ulkxigZpLlG77lOkdkKS0k` | `9017:5339` |
| Token text frames | `ulkxigZpLlG77lOkdkKS0k` | `9017:5346` |
| Token info frames | `ulkxigZpLlG77lOkdkKS0k` | `16728:8899` |
| Button | `OfCMgWHu0KelJCPkDYfpAb` | `16034:5356` |
| Notification | `OfCMgWHu0KelJCPkDYfpAb` | `16034:5360` |
| Payment Card | `OfCMgWHu0KelJCPkDYfpAb` | `16034:5380` |

---

## URL Parsing

Extract `fileKey` and `nodeId` from Figma URLs:
- `figma.com/design/:fileKey/:fileName?node-id=1-2` → `fileKey` = `:fileKey`, `nodeId` = `1:2` (convert `-` to `:`)
- `figma.com/design/:fileKey/branch/:branchKey/:fileName` → use `branchKey` as `fileKey`
- `figma.com/board/:fileKey/:fileName` → FigJam file, use `get_figjam` tool

---

## Adapting Figma MCP Output

The `get_design_context` response is a **reference**, not final code. Always:

1. Check for **Code Connect snippets** — use the mapped codebase component directly
2. Follow **component documentation links** for usage guidelines
3. Respect **design annotations** — notes, constraints, instructions from designer
4. Map **design tokens** to BDS `--bb-*` custom properties
5. Adapt to **Angular + `@backbase/ui-ang`** (CODE mode) or **vanilla HTML** (PROTOTYPE mode)
6. Reuse existing project components and tokens instead of generating from scratch

---

## Icons & Illustrations — Export Limitations & Workaround

**Known issues with Figma MCP `get_design_context` asset export:**

| Issue | Impact |
|-------|--------|
| **Tight cropping** | SVGs are cropped to inner vector bounds, not the component export frame. A 42×42 icon frame exports as tight stroke bounds → layout/alignment breaks. |
| **Export frame not preserved** | MCP output differs from "Export as SVG" in the Figma UI, which preserves full canvas + padding. |
| **Image crop ignored** | Cropped fills (Fill/Fit/Crop/Tile) may export uncropped. |
| **Layout references only** | Some exports return layout/refs rather than clean vector path data. |

**Recommended workflow (do not rely on MCP asset URLs for icons):**

1. **Use `get_screenshot` as visual reference** — Use it to see the exact icon design, then hand-code a clean inline SVG or use a manual export.
2. **Manual export for critical icons** — Right-click the icon in Figma → Export → SVG. Place in `assets/` or inline the SVG in your component.
3. **Hand-code from reference** — For simple icons (bell, cards, grid, etc.): use the screenshot + design spec to write minimal inline SVGs with correct `viewBox`, `fill`/`stroke`, and token-based colors (`var(--pfm-text-primary)`). Keep them simple and maintainable.
4. **Prefer semantic icons** — Match the icon from the design (e.g. two overlapping squares = cards, 2×2 grid = menu). Don't substitute different icons (e.g. insights, QR) without design approval.
5. **Figma REST API for programmatic export** — If automation is required, use `GET /v1/images/:file_key` with `format=svg` and explicit `ids` — but verify output quality (same cropping issues may apply).

**In practice:** When implementing icons from Figma, treat the screenshot as the source of truth and write clean inline SVGs. Avoid trusting MCP-returned asset URLs for layout-critical or multi-icon UIs.

---

## Important Limitations

- Tokens are stored as **Figma Variables**, not on canvas pages — `get_variable_defs` extracts them from nodes that reference them
- Only the Welcome page (`305:0`) exists as a canvas in the Design Tokens file
- The MCP has no "list pages" capability — you must know or discover node IDs
- For the full variable set, the Figma REST API (`/v1/files/:key/variables/local`) would be needed
