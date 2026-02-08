# Specification

## Summary
**Goal:** Provide a simple, student-friendly Class 8 website to access the “Honeydew” ebook for free, with an in-browser reader and download.

**Planned changes:**
- Create and apply a consistent student-friendly visual theme across pages/components (avoid a blue/purple primary palette).
- Build a responsive landing page that lists the free ebook “Honeydew” and includes a prominent “Read now” action.
- Add an ebook reading view that embeds the Honeydew PDF in-browser and provides a download button/link, with no login.
- Add a minimal backend catalog endpoint returning the single ebook entry (title + asset URL/path).
- Add the Honeydew PDF under `frontend/public` (use a placeholder if needed) and wire the catalog entry to a stable path that can be swapped by replacing the PDF file only.
- Include generated static brand assets (logo + hero illustration) under `frontend/public/assets/generated` and render them on the landing page.

**User-visible outcome:** Students can open the site, see “Honeydew” on the landing page with branding, click to read the ebook in the browser, and optionally download the PDF—no authentication required.
