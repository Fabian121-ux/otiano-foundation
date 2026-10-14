# Otiano Foundation frontend improvements

Review branch: `improve/responsive-branding`, based on main at `7861eb643eeb3d5d8014751c73b8b6963a874342`.

## Scope and implementation

- Existing public routes, copy, section order, programme descriptions, PHP backend, database, authentication, and administrator access are preserved.
- Navigation retains all five categories and all 16 submenu destinations. A native modal dialog supplies focus containment and background inertness. Its header remains outside the independently scrolling menu. The menu closes on links, Escape, the close control, route changes, and desktop resizing. Body positioning prevents mobile background scrolling and restores the prior scroll position. Animations respect reduced-motion preferences.
- Desktop navigation uses explicit disclosure buttons with click, Enter/Space, ArrowDown, Escape, focus-out, and outside-click support. Active routes are highlighted. The existing logo appears on a white header with red controls and safe spacing.
- Tailwind defines the red brand, hover shade, light tints, card radius, and card shadow. Shared CSS uses these tokens. White sections, neutral typography, red accents, and light backgrounds retain visual balance.
- Fixed-height stock-photo headers become flexible white/red branded headers. Their original headings and copy remain. This avoids text clipping at narrow widths and misrepresenting stock scenes as foundation activities.
- Newsletter and event form labels are associated with inputs; feedback messages are announced. The existing registration flow uses a native scrollable dialog with an always-available close control and Escape handling. Contact email destinations now match the displayed Otiano addresses.
- The optional home news carousel now displays one, two, or four cards according to viewport width and has labelled arrow controls.
- Exact-case trustee imports are fixed for `zanang Awan.jpeg` and `lucy simon.jpeg`. Trustee images use contain sizing to preserve heads and clothing; below-fold images load lazily.
- Missing news/event images use a lightweight local SVG rather than an unresolved production `/src/assets/` path. Existing uploaded images remain in use; the image helper now preserves fully qualified image URLs.

## Imagery decisions and sources

All replacement visuals are original, locally rendered red/white illustrations or CSS decoration, not photographs or depictions of foundation activities. `BrandVisual.jsx` uses the already installed `react-icons` package to illustrate education, healthcare, livelihoods, protection, and partnerships. No new production dependency was added.

- 17 Unsplash page-header backgrounds were replaced with branded header decoration across About, programme pages, Media, Contact, Get Involved, and the retained What We Do component.
- Programme sections replace 17 imported illustrations whose mappings were inconsistent or whose provenance could not be verified. Examples: Child Protection was imported for Career Development and Teacher Support; Vocational Training was imported for Emergency Response; Access to Education was imported for Environmental Resilience.
- Strategic Plan replaces five stock photos with topic-specific branded illustrations.
- The optional home Core Areas component replaces four stock/template images with corresponding illustrations. The unused CoreValues template replaces its two business stock illustrations while preserving its existing content.
- The home hero replaces the unverified `odba.png` background with restrained charcoal/red decoration; its original copy, layout, and Learn more behavior are retained.
- News/events fallback and static sample-data image paths now reference `public/images/ofd-placeholder.svg`. Fallback alternative text explicitly identifies the branded illustration.
- The organization's existing red logo and all original image files are preserved. No new photographs were invented.

### Original image inventory

The connected GitHub interface was used to audit all frontend image references and asset filenames. Small education/healthcare stock assets and the logo were visually inspected. Full-resolution files over the GitHub contents limit could not be retrieved for visual inspection; their authenticity is not inferred from filenames.

| Original asset | Size | Final direct reference | Decision |
| --- | --- | --- | --- |
| `public/SMTIcon.png` | 27 KB | No direct import in final frontend | Unused template asset; preserved |
| `public/favicon.png` | 116 KB | No direct import in final frontend | Preserved organization branding |
| `public/lastlogoss.png` | 116 KB | No direct import in final frontend | Preserved organization branding |
| `public/ofdlogo-red.png` | 57 KB | No direct import in final frontend | Preserved organization branding |
| `public/og-image.png` | 57 KB | No direct import in final frontend | Preserved organization branding |
| `src/assets/downloadedimages/Access to education.png` | 2765 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Career Development.png` | 2114 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Child Protection.png` | 2057 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Community Engagement in Education.png` | 2275 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Community Health Outreach.png` | 2418 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Community Support & Inclusion.png` | 2148 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Emergency Response Preparedness.png` | 2115 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Environmental and Social Resilience.png` | 2246 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Financial Literacy.png` | 2010 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Gender-Based Violence Prevention.png` | 2245 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Health System And Support.png` | 2075 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Leadership & Mentorship.png` | 2283 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Skills and Digital Literacy.png` | 2031 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Teacher and school support.png` | 2308 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/Vocational & Entrepreneurship Training.png` | 2062 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/commhealth.png` | 2261 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/downloadedimages/maternal and child health.png` | 2262 KB | No direct import in final frontend | Preserved asset; programme placements replaced with topic illustrations because provenance is unverified |
| `src/assets/favicoonn.png` | 132 KB | No direct import in final frontend | Preserved organization branding |
| `src/assets/homepage/background.png` | 2089 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/education.jpeg` | 38 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/first.webp` | 52 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/health.jpeg` | 47 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/secondimage.webp` | 70 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/thirdimage.webp` | 52 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/thumb-dx-02-en.webp` | 87 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/thumb-profile-adv-01.webp` | 42 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/thumb-profile-business-01.webp` | 103 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/thumb-profile-compliance_risk-management-01.webp` | 102 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/thumb-profile-governance-01.webp` | 67 KB | `src/Pages/Admin/events.jsx`, `src/Pages/Admin/news.jsx` | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/thumb-profile-office-01.webp` | 176 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/homepage/thumb-profile-profile-01.webp` | 493 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/lastlogo.png` | 173 KB | No direct import in final frontend | Preserved organization branding |
| `src/assets/lastlogoss.png` | 116 KB | No direct import in final frontend | Preserved organization branding |
| `src/assets/odba.png` | 2089 KB | No direct import in final frontend | Preserved asset; unverified template/stock imagery is no longer used as documentary imagery |
| `src/assets/ofdlogo-red.png` | 57 KB | `src/Components/GeneralComponents/Navbar.jsx` | Preserved organization branding |
| `src/assets/react.svg` | 4 KB | No direct import in final frontend | Unused template asset; preserved |
| `src/assets/trustees/Cheeka Onyeka.jpeg` | 276 KB | `src/Components/Trustees/Trustess.jsx` | Preserved original trustee photograph |
| `src/assets/trustees/David Achugbu.jpeg` | 45 KB | `src/Components/Trustees/Trustess.jsx` | Preserved original trustee photograph |
| `src/assets/trustees/Ekeoma Ogbu.JPG` | 3166 KB | `src/Components/Trustees/Trustess.jsx` | Preserved original trustee photograph |
| `src/assets/trustees/Kingsley Otiaba.png` | 1215 KB | `src/Components/About/FoundersMessage.jsx`, `src/Components/Trustees/Trustess.jsx` | Preserved original trustee photograph |
| `src/assets/trustees/Solomon Ogbu.JPG` | 3166 KB | No direct import in final frontend | Preserved original trustee photograph |
| `src/assets/trustees/lucy simon.jpeg` | 86 KB | `src/Components/Trustees/Trustess.jsx` | Preserved original trustee photograph |
| `src/assets/trustees/zanang Awan.jpeg` | 46 KB | `src/Components/Trustees/Trustess.jsx` | Preserved original trustee photograph |
| `src/assets/whitelogo.png` | 50 KB | No direct import in final frontend | Preserved organization branding |

## Founder portrait status — incomplete

The original `src/assets/trustees/Kingsley Otiaba.png` is preserved, and both Founder's Message and Trustees use that same original image. The Founder's Message now displays it as a separate portrait rather than a darkened full-width background.

The connected GitHub contents tool returned no binary contents for this 1.2 MB asset; the blob reader could not decode its binary data. This session has no filesystem or masking runtime to retrieve, inspect, edit, and verify a pixel-preserving cutout. Consequently **no background removal was performed and no edited portrait asset was created**. No CSS rectangle is claimed as background removal, and no generated recreation of the founder was substituted. A properly masked separate branded portrait is still needed to finish Task 3.

## Validation

A frontend-only GitHub Actions workflow is included to execute `npm install`, `npm run build`, and the existing `npm run lint`. A temporary Playwright installation is used only in CI; it is not added to package.json or committed dependencies. The workflow has read-only contents permissions and contains no deployment step.

`scripts/check-responsive.mjs` exercises all 20 active public routes at 320, 375, 390, 430, 768, 1024, 1280, and 1440 px. It checks horizontal overflow, image loading, browser exceptions, menu expansion/collapse, scroll locking/restoration, keyboard focus, Escape, link closure, desktop resizing, and registration on a short viewport. Screenshots are uploaded as the `responsive-qa` artifact. API responses are intercepted with clearly synthetic QA fixtures; the script does not write to the actual backend.

Local npm/build/lint/browser execution is unavailable in this session. CI results must be confirmed on the pull request before treating those checks as passed. Static inspection confirms that existing relative imports resolve with exact filename casing and that application routes are unchanged.

## Remaining review items

- Complete the founder background edit with an accurate mask and preserve the original source.
- Visually review the CI screenshots and inspect on physical iOS/Android devices, including landscape orientation.
- Verify live API integrations in a staging environment; browser QA uses fixtures and does not validate the PHP backend.
- Compress retained large trustee portraits once verified source images and an image-processing runtime are available. Responsive sizing and lazy loading are implemented; binary compression is not.
- Existing footer social links still use placeholder destinations. No organization URLs were guessed.
- `Ekeoma Ogbu.JPG` and `Solomon Ogbu.JPG` have identical Git blob SHAs; the unused Solomon asset and displayed Ekeoma portrait were preserved. Their identity mapping needs an owner check.
- Unused template components and sample-data copy remain preserved under the project's content restriction.

## Files changed

- `.github/workflows/frontend-quality.yml`
- `eslint.config.js`
- `public/images/ofd-placeholder.svg`
- `scripts/check-responsive.mjs`
- `src/Components/About/FoundersMessage.jsx`
- `src/Components/Contact/Contact.jsx`
- `src/Components/GeneralComponents/BrandVisual.jsx`
- `src/Components/GeneralComponents/Footer.jsx`
- `src/Components/GeneralComponents/Navbar.jsx`
- `src/Components/GetInvolved/AdvocacyCampaign.jsx`
- `src/Components/GetInvolved/AmbassadorProgram.jsx`
- `src/Components/GetInvolved/VolunteerOpportunities.jsx`
- `src/Components/GetInvolved/YouthProgram.jsx`
- `src/Components/HomeComponents/EconomicEmpowerment.jsx`
- `src/Components/HomeComponents/Education.jsx`
- `src/Components/HomeComponents/EnhancingOpportunities.jsx`
- `src/Components/HomeComponents/Exploits.jsx`
- `src/Components/HomeComponents/Healthcare.jsx`
- `src/Components/HomeComponents/Home.jsx`
- `src/Components/HomeComponents/News.jsx`
- `src/Components/HomeComponents/Newsletter.jsx`
- `src/Components/HomeComponents/OurWork.jsx`
- `src/Components/HomeComponents/Quote.jsx`
- `src/Components/HomeComponents/SocialWelfare.jsx`
- `src/Components/HomeComponents/WhatWeDo.jsx`
- `src/Components/News/Events.jsx`
- `src/Components/News/LatestNews.jsx`
- `src/Components/News/SingleEvent.jsx`
- `src/Components/News/SingleNews.jsx`
- `src/Components/OurRole/OurRole.jsx`
- `src/Components/OurRole/Quote.jsx`
- `src/Components/OurStory/OurStory.jsx`
- `src/Components/OurStory/Quote.jsx`
- `src/Components/OurValues/CoreValues.jsx`
- `src/Components/OurValues/OurValues.jsx`
- `src/Components/OurValues/Quote.jsx`
- `src/Components/StrategicPlan/StrategicPlan.jsx`
- `src/Components/Trustees/Trustess.jsx`
- `src/Components/WhatWeDo/WhatWeDo.jsx`
- `src/data/eventsData.js`
- `src/data/newsData.js`
- `src/index.css`
- `src/services/api.js`
- `tailwind.config.js`
- `docs/frontend-improvements.md`
