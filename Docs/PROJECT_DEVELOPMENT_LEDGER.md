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

## 2026-11-10 — FlyFootball Myket store link and pending public APK

**Status**: official publisher-supplied Myket link implemented in the public website source; external deployment/browser verification pending. Direct APK not uploaded or enabled.

**Store URL**: https://myket.ir/app/com.playfreeverse.flyfootball; Android package: `com.playfreeverse.flyfootball`.

**Changed files and architectural rationale**:
- `games/flyfootball.html` and `en/games/flyfootball.html`: convert exactly the FlyFootball Myket button from a disabled span to an accessible external official-store anchor, while leaving website checkout and direct-download disabled. Correct explanatory copy without claiming a public APK.
- `index.html` and `en/index.html`: convert exactly the FlyFootball summary card Myket element to an external link without changing existing three-column layout or other games; cache-bust Persian hero JS v12.
- `assets/playfreeverse-home-final.js`: reuse the original hero slide and platform authority. Change dynamic Myket action only for FlyFootball and ChainTrace, remove href for all other slides. No parallel hero controller.
- `Docs/OFFICIAL_PRODUCT_LINKS.md`: official URL record and future direct APK hosting/verification plan.
- `Docs/PROJECT_DEVELOPMENT_LEDGER.md`: durable change and rollback record.

**APK dependency**: publisher local filename `FlyFootball_V1.0.0.apk` known but binary is only on user's Windows PC, unavailable to this tool. A local filesystem path cannot be used as a web download link. The intended public host is a GitHub Release asset on the PUBLIC website repository, not the PRIVATE FlyFootball code repo. Upload and verify actual bytes before changing website links. No file checksum, content length, package inspection or download test yet.

**Verification and rollback**: scoped exact-string checks, single parent commit and expected-ref update. Public deployment, mobile clickthrough and external store accessibility unverified; preserve all other websites/game code. Revert this scoped commit for rollback; no Unity/Game repository state changed.


## 2026-11-10 - ChainTrace site APK GitHub Release and bilingual UI templates
- Applied paths: games/chaintrace.html, en/games/chaintrace.html, assets/games/chaintrace/bilingual-templates/*.webp.
- Release asset: https://github.com/playfreeverse6770/playfreeverse.github.io/releases/download/chaintrace-v1.0.2-direct/ChainTrace_v1.0.2.apk
- Asset SHA256 (local): 600353270EAC62C8B641D5F92C50FC83835026D515D6644DBE452958598566F5.
- Architecture: website provides link to GitHub Release binary; does not put APK into Git history. Existing game runtime and locally dirty website checkout are not modified.
- Verification: local APK hash, release asset presence, six image hashes, scoped git status. Browser download and Unity UI wiring remain manual pending tests.
- Rollback: revert this scoped site commit; release asset remains independently published and can be managed in GitHub Releases.
