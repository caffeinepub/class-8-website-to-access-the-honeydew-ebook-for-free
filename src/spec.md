# Specification

## Summary
**Goal:** Add the missing Honeydew book PDF assets and ensure the library catalog points to valid, accessible PDF paths.

**Planned changes:**
- Add the missing Honeydew book PDF files to the frontend static assets so all expected `/assets/*.pdf` URLs resolve without 404s.
- Verify the backend `getBooks()` catalog `Book.assetPath` values match the actual PDF filenames/paths added; update any mismatches so the Reader always loads an existing PDF.

**User-visible outcome:** From the Landing page, every book card opens a working PDF in the Reader (and via “Open PDF”) without missing-file/404 errors.
