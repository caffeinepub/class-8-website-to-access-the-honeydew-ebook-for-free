# Specification

## Summary
**Goal:** Let users open a book PDF directly in the browser, and stabilize book/PDF loading so the app stops repeatedly failing/refetching on initial load.

**Planned changes:**
- Add an "Open PDF" control on the Reader page that opens the current book’s PDF in a new tab/window using the existing `assetPath`, without forcing download.
- Keep the existing "Download PDF" behavior unchanged.
- Prevent repeated/looping failures when fetching the books list by adjusting the books query behavior (e.g., limit retries and disable automatic refetch on focus/reconnect for this query) and showing a stable error state on the Landing page.
- On the Reader page, add explicit handling for books-loading failure (clear English error message plus a user action such as Retry and/or Back to Library).
- Make the embedded PDF iframe resilient: show a deterministic “Loading PDF…” state until iframe load, show an error fallback on iframe failure with a recovery action (retry and/or “Open PDF”), and avoid any automatic rapid iframe reload loops.

**User-visible outcome:** Users can open the current book PDF directly in a new tab from the Reader, still download it as before, and the app no longer appears to endlessly fail/reload when books or PDFs fail to load—showing clear loading and error states with recovery actions instead.
