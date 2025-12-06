# Project Plan: SARZ TV Customization

## Background and Motivation
The project "CCI TV" has been successfully rebranded and customized into "SARZ TV", a streaming platform for the Nigerian artiste/producer Sarz. The changes include a full rebrand of the UI, updated content structure (Sermons -> Music Videos, etc.), and placeholder data relevant to a music artist.

## High-level Task Breakdown

### Phase 1: Rebranding & Content Updates (Completed)
- [x] Update Global Metadata & Branding (Title, Description, Logo text)
- [x] Update Navigation & Footer (Links, Labels)
- [x] Refactor Homepage Content (`app/page.tsx`)
    - [x] Change Hero text/imagery placeholders
    - [x] Rename Categories (Worship -> Studio Sessions, Sermons -> Music Videos, etc.)
    - [x] Update Placeholder Data to reflect Sarz's content
- [x] Update "Ministry Hub" to "Sarz Store" in UI (`app/products/page.tsx`)
- [x] Update "Live Services" to "Live Sessions" (`app/streams/page.tsx`)
- [x] Update "Video Library" to "Videos" (`app/videos/page.tsx`)
- [x] Update Admin Dashboard Dropdowns (`components/admin/video-upload-form.tsx`)

### Phase 2: Design & Theming (Completed)
- [x] Updated `globals.css` comment
- [x] Retained premium dark/gold theme which fits the "Producer/Artist" vibe.

### Phase 3: Verification (Pending User Review)
- [ ] Verify all links work
- [ ] Verify no "Ministry" text remains visible
- [ ] Ensure placeholder data looks realistic for a music producer

## Current Status / Progress Tracking
- [x] Project Initialized
- [x] Analysis Complete
- [x] Planning Phase
- [x] Execution Phase Complete
- [ ] Final Verification

## Executor's Feedback or Assistance Requests
- The database schema (categories) remains as 'worship', 'sermon', etc. The UI maps these to new labels. A database migration would be needed to fully rename these values in the backend, but the frontend abstraction handles it for now.
