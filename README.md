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

1. **The form is connected.** Both forms post to Formspree form `mjykvdzr`. Submissions go to the recipient set in the Formspree dashboard (formspree.io, sign in with the account that created the form). To change who receives them, change it there, not in the HTML.
   - Every submission includes the "Who would you like to see?" answer, and `site.js` puts that name in the email subject ("Appointment request for Leann Vaterlaus (website)"). Set up a filter in the receiving inbox to forward each subject to that therapist, or forward by hand.
   - Formspree's free plan sends to one inbox and allows 50 submissions a month. Sending directly to each therapist needs a paid Formspree plan (routing rules) or a Zapier/Make step. The subject-line filter above does the same job for free.
2. **Add the photos.** Save each headshot into `images/` with exactly these names (JPEG, portrait orientation, roughly 3:4):
   - `images/joe.jpg`, `images/jennifer.jpg`, `images/charlene.jpg`, `images/leann.jpg`, `images/katie.jpg`, `images/kaisa.jpg`
   - `images/team.jpg` for the group photo shown at the top of `team.html` (landscape, roughly 3:2)
   - `images/logo.png` for the footer logo, then update the footer `src` on every page
   Until a file is there, `site.js` falls back to the old Wix photo for Joe, Jennifer, and Charlene, shows an initials block for Leann, Katie, and Kaisa, and hides the group photo. Do this before the Wix site is taken down.
3. **Confirm the roster.** Bios are for Joe, Jennifer, Charlene, Leann, Katie, and the intern Kaisa. Joe, Jennifer, and Charlene were carried over from the current site with photos. All six photos are loaded from `images/` (see step 2). Check Kaisa's name spelling and credentials, and Katie's credential (listed as LMSW), against what the practice uses. Add or remove a person by copying one `<div class="bio">` block in `team.html`, one `<a class="person">` block in `index.html`, and one `<option>` in the "Who would you like to see?" select in `index.html` and `contact.html`.

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
