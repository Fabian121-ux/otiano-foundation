# Homepage and content refinement

Review branch: `improve/homepage-content-refinement`  
Base: main at `93090c922a3ea2397591fd678597dbc8ee05eeb0`

## Homepage

- Four image-backed hero slides use the exact supplied headlines, descriptions, button labels, and destinations. The Community Impact CTA scrolls to `#activities`.
- Existing education and healthcare photographs are used as **illustrative imagery**, with visible captions. The same healthcare image appears with different positioning on the general and healthcare slides; existing Africa artwork supports Community Impact. These are not presented as documentary photographs of OFD programmes.
- Images come from `src/assets/homepage/education.jpeg`, `health.jpeg`, and `thirdimage.webp`. No new external image service, photograph, or production dependency was introduced.
- The slider crossfades every seven seconds and offers pagination, previous/next controls on larger screens, and pause/play. Keyboard focus and manual selection pause rotation. Hover, hidden tabs, off-screen visibility, and reduced-motion settings also suspend automatic rotation. Reduced motion retains manual slide selection.
- Grid-stacked slide content reserves room for the longest slide to avoid layout jumps. A compact short-phone variant keeps the main action immediately useful.
- The introduction is shortened to two paragraphs. Four consistent programme cards retain Education, Healthcare, Economic Empowerment, and Social Welfare.
- A new Activities & Updates section supports photograph, date, title, location, summary, and an optional existing-route link. It currently shows an honest empty state and a contact action.

## Activity publishing

`src/data/documentedActivities.js` is intentionally empty. No verified activity photo set with dates, locations, and source records was available in the repository. To publish an entry, editorially confirm the record and photograph, then provide:

```js
// Fields, not an example event or invented public record:
{
  id,
  title,
  date,       // YYYY-MM-DD
  location,
  summary,
  image,      // approved photograph import or URL
  imageAlt,
  source,     // editorial record/reference; not displayed publicly
  href,       // optional existing /news/:id or /events/:id route
}
```

This reviewed list keeps documentary activities separate from illustrative hero imagery. It does not change the PHP database or admin publishing flows. Existing News and Events still display their API records. Those existing server records require editorial verification by the Foundation; this change does not alter or certify database content.

## Content credibility

Unverified static achievement claims are rewritten as areas of focus, intended work, or plans:

| Area | Examples removed or softened | Final direction |
| --- | --- | --- |
| Education | Thousands of students annually; 25% enrolment increase; hundreds of volunteers; improved school outcomes; assumed scholarship/device delivery | Learning materials, school engagement, digital literacy, teacher support, and community involvement as priorities |
| Healthcare | 10,000 people annually; improved outcomes for thousands; reduced disease prevalence; assumed kits, equipment, counselling, and response teams | Awareness, access, needs identification, and intended collaboration with qualified professionals |
| Economic Empowerment | 40% savings increase; hundreds placed in employment; assumed seed funding and market linkages | Skills, financial literacy, career guidance, and intended livelihood support |
| Social Welfare | Thousands of children protected; assumed micro-grants, hotlines, legal aid, and counselling services | Dignity, inclusion, protection awareness, and future programme development |
| Our Story / Our Role / Values / Strategic Plan | Unrecorded partnerships, donor-confidence gains, disease reductions, scaled outcomes, and operational services | Clear principles, programme intentions, and documented progress |
| Legacy templates | Ten unverified news stories, five events with unverified venues/speakers, unrelated business/tax consulting text, unsupported quotation attribution | Empty legacy datasets and shared reviewed OFD content |

The approved founder biography is the source for its specific historical and professional statements. Its 2023 award, January 2026 role, qualifications, and community work are retained as supplied.

## Founder and trustees

- `src/data/founderProfile.js` contains the approved full name, role, and **all six biography paragraphs verbatim**.
- The existing `/about/founders-message` route becomes the founder profile, with three readable subsections and the original portrait.
- The same approved full name and role appear on the trustees page.
- Trustee portraits use a consistent 4:5 area with contain sizing to preserve faces and clothing. Original image files are unchanged.
- Other board members use the existing membership designation, Trustee. No additional offices or biographies were invented.
- Five missing biographies display “Profile details to be updated.” The card supports an expandable biography when one is supplied; the founder links to his approved profile.

## Dead ends and consistency

- Footer social icons pointing to `#` are removed because no verified OFD account URLs were found.
- Volunteer participation now offers a direct email expression of interest and the existing Contact route.
- Advocacy, youth, and ambassador pages offer contact next steps without promises of unspecified roles.
- News and event empty states point to current enquiries; API reads, registration, and feedback submission are retained.
- Shared section, readable-width, card, button, and heading classes build on the existing red/white Tailwind tokens.
- Mobile body text is smaller and paragraphs are shorter. Repeated section spacing is reduced and public page headers share the same sizing system.
- Real Inter regular, semibold, and bold Latin font files replace the all-language regular-only import.
- Organization-name spelling is corrected in public metadata. No public or admin routes are removed.

## Validation

The existing frontend-only GitHub Actions workflow runs `npm install`, `npm run build`, and `npm run lint`. This environment has GitHub tools without a local terminal/browser; runtime checks are performed in CI.

`scripts/check-responsive.mjs` retains the existing 20-route checks at **320, 375, 390, 430, 768, 1024, 1280, and 1440 px**. It also checks:

- All four hero slides and CTA destinations, pagination state, hidden-slide accessibility, and overflow.
- Automatic rotation, pause/resume, keyboard selection, and reduced motion.
- The 320×568 first-screen CTA and consistent header/logo containment.
- Footer dead-link removal, volunteer contact, trustee placeholders, and exact founder biography rendering.
- Empty news/event screens, plus the existing navigation and registration checks.

API responses are intercepted with synthetic QA fixtures. No test records are published or written to the live backend. Screenshots are uploaded to the workflow artifact.

CI results are recorded in the PR description once the run completes. Static inspection confirms exact-case relative imports resolve. No changes touch `dist/`, PHP, the database, authentication, environment files, package versions, or the main-only production build/deployment workflow.

## Remaining limitations

- The referenced inspiration screenshots were not attached in this conversation; the hero follows the written direction.
- Hero photographs remain illustrative repository assets. Approved OFD photographs and original image rights/provenance should be supplied for a documentary image-led hero.
- Documentary activity entries and five trustee biographies still require approved content.
- Existing backend-published news/events and dependency audit findings require their own review.
- Binary portrait compression and physical-device/staging verification are outside the available runtime here. Original portraits are preserved.
- No production deployment is performed.

## Files modified

- `scripts/check-responsive.mjs`
- `src/Components/About/FoundersMessage.jsx`
- `src/Components/Contact/Contact.jsx`
- `src/Components/GeneralComponents/EmptyState.jsx`
- `src/Components/GeneralComponents/Footer.jsx`
- `src/Components/GeneralComponents/Navbar.jsx`
- `src/Components/GetInvolved/AdvocacyCampaign.jsx`
- `src/Components/GetInvolved/AmbassadorProgram.jsx`
- `src/Components/GetInvolved/VolunteerOpportunities.jsx`
- `src/Components/GetInvolved/YouthProgram.jsx`
- `src/Components/HomeComponents/ActivityUpdates.jsx`
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
- `src/Pages/contact.jsx`
- `src/Pages/events.jsx`
- `src/Pages/homepage.jsx`
- `src/Pages/latest-news.jsx`
- `src/Pages/our-role.jsx`
- `src/Pages/our-story.jsx`
- `src/Pages/our-values.jsx`
- `src/Pages/strategic-plan.jsx`
- `src/Pages/trustees.jsx`
- `src/Pages/what-we-do.jsx`
- `src/data/documentedActivities.js`
- `src/data/eventsData.js`
- `src/data/founderProfile.js`
- `src/data/newsData.js`
- `src/index.css`
- `src/main.jsx`
- `docs/homepage-content-refinement.md`
