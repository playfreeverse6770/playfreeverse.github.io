# PlayFreeverse Website — Project Development Ledger

## 2026-11-08 — Official ChainTrace Myket publication link

**Status:** Applied to the GitHub website repository. Public GitHub Pages deployment and device clickthrough need manual verification.

**Publisher-supplied source URL:** https://myket.ir/app/com.playfreeverse.chaintrace

**Existing UI owners modified and why:**
- `games/chaintrace.html` and `en/games/chaintrace.html`: replace unavailable Myket buttons and out-of-date "preparing release" text with real, accessible store links. Direct download/site-store remain disabled.
- `index.html` and `en/index.html`: make only ChainTrace's Myket summary card a genuine hyperlink. Keep other titles as coming soon. Refresh CSS/JS cache keys on pages that use changed assets.
- `assets/playfreeverse-home-final.js`: activate the shared hero Myket control only when the ChainTrace slide is selected; remove `href` when another slide is selected, so unavailable titles cannot open the wrong store.
- `studio-v4.css`: ensure accessible anchor store cards preserve the existing grid geometry and visible focus state.
- `assets/playfreeverse-home-final.css`: add the hover/focus state for the existing hero card.
- `Docs/OFFICIAL_PRODUCT_LINKS.md`: version-controlled canonical reference for cross-project Other Products usage.

**Authority and dependencies:** Existing site card hierarchy, existing hero presentation JS, existing styles. No new runtime service or duplicate download controller.

**Verification:** Exact-string source replacements and unique-target checks were performed before each GitHub commit; remaining verification includes public GitHub Pages deployment, mobile viewport, external-store opening and manual click tests.

**Risks / rollback:** The live public link originates from the publisher; this tool cannot verify content behind Myket's access restrictions. Git commit history records each scoped change. Revert only specific file changes if needed; do not reset unrelated site history.

**No Unity game source or Myket APK modified in this website update.**
