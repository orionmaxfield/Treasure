# Treasure Valley Mental Health — website

Static HTML site, no build step. Hosts on GitHub Pages as-is.

## Pages
- `index.html` — home, with the appointment form in the hero
- `services.html` — what we treat
- `team.html` — therapist bios
- `fees.html` — insurance, sliding scale, reduced-rate sessions, Good Faith Estimate line
- `contact.html` — form, map, crisis resources
- `privacy.html`
- `styles.css`, `site.js` — shared

## Before launch (three things)

1. **Connect the form.** Create a free form at formspree.io, set the recipient to admin@tvmhtherapy.com (add a second recipient as backup), then replace `YOUR_FORM_ID` in `index.html` and `contact.html` with the ID Formspree gives you. Test it once.
2. **Host the images locally.** Team photos and the footer logo currently point at the old Wix site's image URLs so the pitch works today. Download them into `/images/` and update the `src` paths before the Wix site is taken down.
3. **Confirm the roster.** Bios are for Joe, Jennifer, and Charlene, carried over from the current site. Add or remove a person by copying one `<div class="bio">` block in `team.html` and one `<div class="person">` block in `index.html`.

## Deploy to GitHub Pages
1. Create a repo and push these files to the `main` branch.
2. Settings → Pages → Source: Deploy from branch → `main` / root.
3. To use treasurevalleymentalhealth.com: add a file named `CNAME` containing the domain, then point the domain's DNS at GitHub Pages (A records to GitHub's IPs, or a CNAME for www). Also redirect tvmhtherapy.com if it's owned.

## Common edits
- **Hide "Now accepting new clients":** delete the single `<div class="accepting">` line in `index.html`.
- **Hours, address, phone:** appear in the header, footer, and JSON-LD block in `index.html`. Keep them identical to the Google Business Profile.
- **Crisis bar:** the `<div class="crisis">` at the top of every page.
- **Colors:** the `:root` variables at the top of `styles.css`.

## Phase two ideas (not built)
- One page per specialty (anxiety, depression, trauma, couples) for search.
- Google Ads landing page: copy `contact.html`, strip the nav, keep the form.
- Real office and team photos.
- Spanish-language page if a bilingual clinician is confirmed.
