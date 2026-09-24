# Treasure Valley Mental Health — website

Static HTML site, no build step. Hosts on GitHub Pages as-is.

**URL structure:** every page except the home page lives in its own folder as `index.html`, so the public address has no `.html` on the end (`/team/`, `/anxiety-therapy-boise/`). Link between pages with `../name/` from inside a folder, or `name/` from the home page.

**Staging notice:** every page currently carries `<meta name="robots" content="noindex, nofollow">` so the github.io copy never gets indexed under the wrong domain. **Delete that line from every page at domain cutover** (see the checklist below).

## Pages
- `index.html` — home, with the appointment form in the hero
- `services/` — what we treat
- `team/` — therapist bios
- `joe-arzola/`, `jennifer-arzola/`, `charlene-holloway/`, `leann-vaterlaus/`, `katie-aston/`, `kaisa/`, `cathy-adolph/` — one page per clinician (these are the links to put on Psychology Today and social profiles)
- `anxiety-therapy-boise/`, `depression-therapy-boise/`, `trauma-therapy-boise/`, `couples-therapy-boise/`, `child-therapy-boise/`, `grief-counseling-boise/`, `anger-management-boise/` — one page per specialty
- `sitemap.xml`, `robots.txt` — for search engines. Run `python3 build_sitemap.py` after adding or removing a page.
- `faq/`, `online-therapy-idaho/`, `faith-based-counseling-boise/`, `cbrs-boise/`, `adhd-therapy-boise/`, `reunification-therapy-boise/` — FAQ and additional specialty pages
- `_redirects` — old Wix URL → new URL map (only works behind Cloudflare or Netlify)
- `fees/` — insurance, sliding scale, reduced-rate sessions, Good Faith Estimate line
- `contact/` — form, map, crisis resources
- `privacy/`
- `styles.css`, `site.js` — shared

## Before launch (three things)

1. **The form is connected.** Both forms post to Formspree form `mjykvdzr`. Submissions go to the recipient set in the Formspree dashboard (formspree.io, sign in with the account that created the form). To change who receives them, change it there, not in the HTML.
   - Every submission includes the "Who would you like to see?" answer, and `site.js` puts that name in the email subject ("Appointment request for Leann Vaterlaus (website)"). Set up a filter in the receiving inbox to forward each subject to that therapist, or forward by hand.
   - Formspree's free plan sends to one inbox and allows 50 submissions a month. Sending directly to each therapist needs a paid Formspree plan (routing rules) or a Zapier/Make step. The subject-line filter above does the same job for free.
2. **Add the photos.** Save each headshot into `images/` with exactly these names (JPEG, portrait orientation, roughly 3:4):
   - `images/joe.jpg`, `images/jennifer.jpg`, `images/charlene.jpg`, `images/leann.jpg`, `images/katie.jpg`, `images/kaisa.jpg`
   - `images/team.jpg` for the group photo shown at the top of `team/` (landscape, roughly 3:2)
   - `images/logo.png` for the footer logo, then update the footer `src` on every page
   - `images/forest.jpg` is the soft foliage background used behind the home hero, inner page headers, and the closing band. Replace it with any wide (about 4:1) tree or landscape photo to change the mood sitewide.
   - `images/hero.jpg` (optional): if present, it replaces `forest.jpg` behind the home page hero only.
   Until a file is there, `site.js` falls back to the old Wix photo for Joe, Jennifer, and Charlene, shows an initials block for Leann, Katie, and Kaisa, and hides the group photo. Do this before the Wix site is taken down.
3. **Confirm the roster.** Bios are for Joe, Jennifer, Charlene, Leann, Katie, counseling intern Kaisa, and CBRS intern Cathy Adolph. Joe, Jennifer, and Charlene were carried over from the current site with photos. All six photos are loaded from `images/` (see step 2). Check Kaisa's name spelling and credentials, and Katie's credential (listed as LMSW), against what the practice uses. Add or remove a person by copying one `<div class="bio">` block in `team/`, one `<a class="person">` block in `index.html`, and one `<option>` in the "Who would you like to see?" select in `index.html` and `contact/`.

## Domain cutover checklist

Do these in order the day treasurevalleymentalhealth.com moves to this site.

1. Remove the staging noindex tag from every page: `grep -rl 'STAGING ONLY' --include=index.html . | xargs sed -i '/STAGING ONLY/d'` then commit.
2. Add a file named `CNAME` at the repo root containing `www.treasurevalleymentalhealth.com`. In Settings → Pages, set the custom domain and turn on "Enforce HTTPS" once the certificate is issued.
3. DNS: point `www` at GitHub Pages (CNAME to `orionmaxfield.github.io`) and the bare domain at GitHub's A records. If you want the old Wix URLs to redirect (see `_redirects`), put Cloudflare in front of the domain, or host on Cloudflare Pages instead, since GitHub Pages can't serve redirects.
4. Run `python3 build_sitemap.py`, commit, then submit `https://www.treasurevalleymentalhealth.com/sitemap.xml` in Google Search Console.
5. Update the website field on every Psychology Today profile and the Google Business Profile to the new therapist and home page URLs.
6. Replace the footer logo: save it as `images/logo.png`. Until then the site falls back to the Wix copy, then to text.

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
- Google Ads landing page: copy `contact/`, strip the nav, keep the form.
- Real office and team photos.
- Spanish-language page if a bilingual clinician is confirmed.
