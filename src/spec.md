# Specification

## Summary
**Goal:** Build a Kisan Kart MVP marketplace where farmers can sign in, create and manage listings, and everyone can browse and view listing details.

**Planned changes:**
- Create the core frontend structure with navigation and pages: Home, Browse Listings, Create Listing, My Listings, About/Help (all text in English).
- Apply a consistent visual theme across the app (not primarily blue/purple) and ensure responsive usability on mobile/desktop.
- Implement a backend (single Motoko actor) data model and CRUD APIs for listings (including optional images, contact text, status, timestamps, and owner principal with owner-only update/deactivate).
- Connect frontend to backend with end-to-end flows using React Query (loading/error states): create listing, browse listings, listing details, and my listings (edit/deactivate).
- Add browse utilities: keyword search (title/description), category filter, and sorting (newest, price low/high).
- Implement Internet Identity authentication to gate Create Listing and My Listings and to determine listing ownership.
- Add client-side and backend-side validation (required fields, price >= 0, length limits) with clear inline errors.
- Add dev-only seed/sample data so Browse Listings can show example listings locally.
- Add generated static brand assets (logo + hero banner) under `frontend/public/assets/generated` and use them in the header and Home page.

**User-visible outcome:** Users can browse marketplace listings with search/filter/sort, open a listing detail page (including optional contact info), and—after signing in with Internet Identity—create, edit, and deactivate their own listings with validation and clear loading/error feedback.
