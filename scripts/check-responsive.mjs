import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'
import { founderProfile } from '../src/data/founderProfile.js'

// Only synthetic QA records are supplied here. No calls reach the production backend.
const baseUrl = 'http://127.0.0.1:4173'
const output = 'artifacts/responsive'
const routes = [
  '/', '/about/our-story', '/about/founders-message', '/about/our-role',
  '/about/our-values', '/about/strategic-plan', '/about/trustees',
  '/education', '/healthcare', '/economic-empowerment', '/social-welfare',
  '/latest-news', '/events', '/contact', '/volunteer-opportunities',
  '/advocacy-campaign', '/youth-program', '/ambassador-program',
  '/news/1', '/events/1',
]
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440]
const description = 'A synthetic record used only to verify responsive presentation and existing UI flows.'
const news = { id: 1, title: 'Responsive layout QA article', description, date: '2026-10-14', category: 'Updates', image: '' }
const event = { id: 1, title: 'Responsive layout QA event', description, date: '2026-10-14', time: '10:00', location: 'QA fixture', venue: 'QA fixture', status: 'upcoming', image: '', agenda: [{ time: '10:00', activity: 'Verify wrapping of a longer agenda description on a small phone.' }], speakers: [] }
const browser = await chromium.launch()
await mkdir(output, { recursive: true })
const context = await browser.newContext()
const page = await context.newPage()
const runtimeErrors = []
page.on('pageerror', (error) => runtimeErrors.push(error.message))
await context.route('**/api/*.php*', async (route) => {
  const url = new URL(route.request().url())
  const detail = url.searchParams.has('id')
  let data = []
  if (url.pathname.endsWith('news.php')) data = detail ? news : [news]
  if (url.pathname.endsWith('events.php')) data = detail ? event : [event]
  await route.fulfill({ json: { data, message: 'QA submission accepted' }, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' } })
})

const waitFor = async (check, message) => {
  const deadline = Date.now() + 10000
  while (Date.now() < deadline) {
    if (await check()) return
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
  throw new Error(message)
}
const assertNoOverflow = async (label) => {
  const size = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    page: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }))
  assert.ok(size.page <= size.viewport + 1 && size.body <= size.viewport + 1, label + ': horizontal overflow ' + JSON.stringify(size))
}

try {
  await waitFor(async () => { try { return (await fetch(baseUrl)).ok } catch { return false } }, 'Preview server did not start')
  for (const width of widths) {
    await page.setViewportSize({ width, height: 800 })
    for (const route of routes) {
      await page.goto(baseUrl + route, { waitUntil: 'networkidle' })
      await page.getByRole('heading', { level: 1 }).first().waitFor()
      await assertNoOverflow(width + 'px ' + route)
      assert.equal(await page.locator('.site-navbar').count(), 1, width + 'px ' + route + ': duplicate navbar')
      assert.equal(await page.locator('#mobile-navigation').count(), 1, width + 'px ' + route + ': duplicate navigation dialog')
      const logoInsideHeader = await page.locator('.site-navbar').evaluate((header) => {
        const bounds = header.getBoundingClientRect()
        const logo = header.querySelector('img').getBoundingClientRect()
        return logo.top >= bounds.top && logo.bottom <= bounds.bottom && logo.left >= bounds.left && logo.right <= bounds.right
      })
      assert.ok(logoInsideHeader, width + 'px ' + route + ': logo outside navbar')
      await page.locator('img').evaluateAll((images) => images.forEach((img) => { img.loading = 'eager' }))
      await waitFor(() => page.locator('img').evaluateAll((images) => images.every((img) => img.complete && img.naturalWidth > 0)), width + 'px ' + route + ': image did not load')
      const brokenImages = await page.locator('img').evaluateAll((images) => images.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src))
      assert.deepEqual(brokenImages, [], width + 'px ' + route + ': broken image')
      if (route === '/about/founders-message') {
        const hero = page.locator('.founders-message-hero')
        const image = hero.locator('.founders-message-hero-image')
        assert.equal(await image.count(), 1, 'Founder must appear in the original full-bleed background hero')
        assert.ok((await image.getAttribute('src')).includes('trustees-hero-'),
          'Preserve the original Founder’s Message background photo, not the trustees card portrait')
        assert.equal(await page.locator('.founders-feature').count(), 0,
          'Do not swap the original Founder’s Message hero for a portrait card')
        assert.equal(await image.evaluate(img => getComputedStyle(img).objectFit), 'cover',
          'Original photographic hero must remain full-bleed, not a contained portrait')
        assert.ok(await image.evaluate(img => img.complete && img.naturalWidth > 0),
          'The original founder hero image failed to load')
        const framing = await page.evaluate(() => {
          const hero = document.querySelector('.founders-message-hero').getBoundingClientRect()
          const image = document.querySelector('.founders-message-hero-image').getBoundingClientRect()
          const navbar = document.querySelector('.site-navbar').getBoundingClientRect()
          return { heroTop: hero.top, navBottom: navbar.bottom, imageTop: image.top,
            heroBottom: hero.bottom, imageBottom: image.bottom }
        })
        assert.ok(framing.heroTop >= framing.navBottom - 1,
          'Founder photograph must start below the fixed navigation, not be hidden by it')
        if (width < 640) {
          assert.ok(framing.imageTop - framing.heroTop >= 38,
            'Mobile original background photo must be shifted down at least 2.5rem for headroom')
          assert.ok(Math.abs(framing.imageBottom - framing.heroBottom) < 2,
            'Shift the image down while still filling the lower banner')
          await page.screenshot({ path: output + '/' + width + '-founders-message-framing.png' })
        }
      }
      if (route === '/about/trustees') {
        const image = page.locator('.trustees-hero-image')
        assert.equal(await image.count(), 1, 'Trustees page must display a hero photograph')
        assert.ok((await image.getAttribute('src')).includes('trustees-hero-'), 'Trustees should reuse the unchanged Founder’s Message background')
        assert.equal(await page.getByRole('heading', { level: 1, name: 'Meet Our Board of Trustees' }).count(), 1)
        assert.equal(await page.locator('.trustee-card').count(), 7, 'Seven board members should be displayed')
        const title = await page.locator('#trustees-heading').evaluate(el => ({
          fontSize: getComputedStyle(el).fontSize,
          fontWeight: getComputedStyle(el).fontWeight,
        }))
        assert.ok(parseFloat(title.fontSize) >= 36 && Number.parseInt(title.fontWeight, 10) >= 800,
          'Trustees hero headline must be large and bold at all requested widths')
        const introductionSize = await page.locator('.trustees-hero-description').evaluate(el => parseFloat(getComputedStyle(el).fontSize))
        assert.ok(introductionSize >= 16, 'Trustees hero description must have readable, larger typography')
      }
      if (['/', '/education', '/about/founders-message', '/about/trustees'].includes(route)) {
        await page.screenshot({ path: output + '/' + width + '-' + (route === '/' ? 'home' : route.replaceAll('/', '-')) + '.png', fullPage: true })
      }
    }
    await page.goto(baseUrl, { waitUntil: 'networkidle' })
    // Every slide keeps its approved copy, link, accessible state, and layout.
    const hero = page.getByRole('region', { name: 'Otiano Foundation highlights' })
    const heroSlides = [
      ['Opportunity for All. Possibility Everywhere.', 'Discover Our Story', '/about/our-story'],
      ['Development Starts With Listening', 'Explore Our Approach', '/about/our-role'],
      ['The Future Is Built Together', 'Get Involved', '/volunteer-opportunities'],
    ]
    for (let index = 0; index < heroSlides.length; index++) {
      const [title, button, href] = heroSlides[index]
      await hero.getByRole('button', { name: 'Show slide ' + (index + 1) + ': ' + title, exact: true }).click()
      assert.equal(await hero.getByRole('heading', { level: 1 }).textContent(), title)
      assert.equal(await hero.getByRole('link', { name: button, exact: false }).getAttribute('href'), href)
      assert.equal(await hero.getByRole('group', { name: 'Choose a highlight' }).locator('[aria-current="true"]').count(), 1)
      assert.equal(await hero.getByRole('link').count(), 1)
      assert.equal(await page.locator('.landing-slide:visible').count(), 1)
      assert.equal(await hero.locator('.landing-hero-images img').count(), 3)
      assert.equal(await hero.locator('.landing-healthcare-art').count(), 0)
      await assertNoOverflow(width + 'px slide ' + (index + 1))
      await page.screenshot({ path: output + '/' + width + '-slide-' + (index + 1) + '.png' })
    }
    assert.equal(await page.getByRole('heading', { name: 'Meaningful change starts with the right questions.' }).count(), 1)
    assert.equal(await page.locator('#activities').count(), 0)
    assert.equal(await page.locator('footer a[href="#"]').count(), 0)
    assert.equal(await page.locator('footer a[href*="facebook.com/61590448050659"]').count(), 1)
    assert.equal(await page.locator('footer .ofd-social-link.is-pending').count(), 2)
    const messageCta = page.getByRole('link', { name: "Founder's Message" })
    assert.equal(await messageCta.getAttribute('href'), '/about/founders-message', 'Founder CTA should open the original Founder’s Message')
    await messageCta.click()
    await page.waitForURL('**/about/founders-message')
    await page.getByRole('heading', { level: 1, name: "Founder's Message" }).waitFor()
    await page.goto(baseUrl, { waitUntil: 'networkidle' })
    const pillarButtons = page.locator('#our-work a.ofd-button')
    assert.equal(await pillarButtons.count(), 4)
    for (const button of await pillarButtons.all())
      assert.ok((await button.textContent()).trim().startsWith('Explore'))
    await page.goto(baseUrl + '/about/trustees', { waitUntil: 'networkidle' })
    assert.equal(await page.locator('.trustee-card').count(), 7)
    assert.equal(await page.locator('.trustee-profile-button').count(), 7, 'Every board card needs a View Profile button')
    if (width <= 430) {
      const landing = await page.locator('.trustees-hero').boundingBox()
      const label = await page.locator('.trustees-board-label').boundingBox()
      const photo = await page.locator('.trustee-photo-frame').first().boundingBox()
      assert.ok(landing && label && photo, 'Trustees hero, board panel or first portrait missing')
      assert.ok(label.height >= 270, 'Grey Board of Trustees panel must be sufficiently tall on small phones')
      assert.ok(Math.abs(label.y - (landing.y + landing.height)) <= 8,
        'The narrow grey Board of Trustees panel must begin at the top of its section, touching the hero')
      assert.ok(label.width <= width * 0.42, 'The vertical grey board tab must be narrow, like the reference')
      assert.ok(photo.y - (label.y + label.height) >= 40, 'Trustee portrait must sit below the grey board tab')
      assert.ok(photo.y >= 800, width + 'px: first profile photograph should be below the initial mobile viewport')
      const headingBox = await page.locator('#trustees-heading').boundingBox()
      assert.ok(headingBox && headingBox.y < landing.y + landing.height * 0.65,
        'Meet Our Board of Trustees must sit higher in the hero, not by its bottom edge')
      assert.equal(await page.locator('.trustees-hero-image').evaluate((img) => getComputedStyle(img).objectPosition),
        '65% 0%', 'Show the top of the approved background portrait on mobile so its head is not cropped')
      assert.equal(await page.locator('.trustees-board-label').evaluate((element) => getComputedStyle(element).backgroundColor), 'rgb(230, 230, 230)', 'Board of Trustees heading should remain inside a grey box')
      const profileButton = await page.locator('.trustee-profile-button').first().boundingBox()
      assert.ok(profileButton && profileButton.width <= 130 && profileButton.height >= 40,
        'View Profile should be smaller while retaining a 44px tap target')
      await page.screenshot({ path: output + '/' + width + '-trustees-tall-label.png' })
    }

    const heroTreatment = await page.locator('.trustees-hero').evaluate((element) => ({
      overlay: getComputedStyle(element, '::before').backgroundImage,
      photoFilter: getComputedStyle(element.querySelector('.trustees-hero-image')).filter,
    }))
    assert.ok(heroTreatment.overlay.includes('linear-gradient') && /67[, ]+8[, ]+22/.test(heroTreatment.overlay),
      'Trustee banner needs the balanced red-and-black gradient')
    assert.ok(heroTreatment.photoFilter.includes('brightness(0.88)'), 'Approved trustees photo should be visible, but softly dimmed')
    assert.ok(await page.locator('.trustees-hero-image').evaluate((img) => img.complete && img.naturalWidth > 0),
      'Approved trustees banner image must still load')
    assert.ok((await page.locator('.trustees-hero-description').innerText()).includes('strengthen accountability'),
      'Trustee introduction should include the approved modest additional explanation')
    const modal = page.locator('dialog.trustee-profile-dialog')
    const zanangCard = page.locator('.trustee-card').filter({ has: page.getByRole('heading', { name: 'Miss Zanang Diana Awan', exact: true }) })
    assert.equal(await zanangCard.getByText('Trustee', { exact: true }).count(), 0,
      'Hide generic Trustee label below member names')
    const zanangButton = zanangCard.getByRole('button', { name: 'View Profile: Miss Zanang Diana Awan' })
    await zanangButton.click()
    await modal.waitFor({ state: 'visible' })
    assert.equal(await modal.getByRole('heading', { name: 'Miss Zanang Diana Awan' }).count(), 1)
    assert.equal(await modal.locator('.trustee-dialog-role').count(), 0,
      'Do not repeat generic Trustee label in profile popups')
    const zanangLead = 'Zanang Diana Awan holds a BA in International Relations from the American University of Nigeria and an MA in Global Governance and Sustainable Development from Middlesex University London.'
    assert.equal(await modal.locator('.trustee-dialog-bio p').count(), 3, 'Zanang copy should split after exactly the first sentence')
    assert.equal(await modal.locator('.trustee-dialog-lede').textContent(), zanangLead)
    assert.ok((await modal.locator('.trustee-dialog-bio p').nth(1).textContent()).startsWith('She works in tax administration'))
    assert.ok((await modal.locator('.trustee-dialog-bio').innerText()).includes('stronger, more resilient communities.'))
    const zanangTitleAppearance = await modal.locator('#trustee-dialog-heading').evaluate((element) => ({
      color: getComputedStyle(element).color,
      weight: Number.parseInt(getComputedStyle(element).fontWeight, 10),
    }))
    assert.ok(zanangTitleAppearance.weight >= 700, 'Every profile name must be bold')
    assert.notEqual(zanangTitleAppearance.color, 'rgb(0, 0, 0)', 'Every profile name must have the red brand styling')
    assert.deepEqual(
      await modal.locator('.trustee-dialog-bio').evaluate((node) => [...node.children].map((element) => element.tagName)),
      ['P', 'IMG', 'P', 'P'],
      'Portrait follows only the first sentence, ahead of both remaining approved biography paragraphs'
    )
    assert.ok((await modal.locator('.trustee-dialog-portrait').getAttribute('src')).includes('zanang-diana-awan-'), 'Use the approved Zanang portrait')
    assert.ok(await modal.locator('.trustee-dialog-portrait').evaluate((img) => img.complete && img.naturalWidth > 0), 'Modal portrait not loaded')
    const portraitBox = await modal.locator('.trustee-dialog-portrait').boundingBox()
    const biographyBox = await modal.locator('.trustee-dialog-bio').boundingBox()
    assert.ok(portraitBox && biographyBox && Math.abs(portraitBox.x - biographyBox.x) <= 2 &&
      Math.abs(portraitBox.width - biographyBox.width) <= 2,
    'Profile portrait should be centered and align with both edges of the biography')
    assert.ok(await zanangCard.evaluate((el) => el.classList.contains('is-selected')), 'Clicked trustee not highlighted')
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden', 'Modal failed to lock background scrolling')
    await assertNoOverflow(width + 'px trustee popup')
    if (width === 320 || width === 390 || width === 1280) {
      await page.screenshot({ path: output + '/' + width + '-zanang-profile-popup.png' })
    }
    await page.keyboard.press('Escape')
    await modal.waitFor({ state: 'hidden' })
    assert.equal(await zanangButton.evaluate((el) => el === document.activeElement), true, 'Profile button focus not restored')

    const chairman = page.locator('#chairman-profile')
    await chairman.getByRole('heading', { name: founderProfile.name, level: 3 }).waitFor()
    await chairman.getByRole('button', { name: 'View Profile: ' + founderProfile.name }).click()
    await modal.waitFor({ state: 'visible' })
    assert.equal(await modal.getByText('Chairman', { exact: true }).count(), 1)
    const founderFirstParagraph = founderProfile.bio[0]
    const firstSentenceEnd = founderFirstParagraph.indexOf('. ') + 1
    const founderOpeningSentence = founderFirstParagraph.slice(0, firstSentenceEnd)
    const founderContinuation = founderFirstParagraph.slice(firstSentenceEnd).trim()
    assert.equal(await modal.locator('.trustee-dialog-lede').textContent(), founderOpeningSentence,
      'Chairman introduction must stop at the first period')
    assert.deepEqual(await modal.locator('.trustee-dialog-bio p').allTextContents(),
      [founderOpeningSentence, founderContinuation, ...founderProfile.bio.slice(1)],
      'Approved chairman biography should be preserved, with only the first sentence above the portrait')
    const chairmanTitle = await modal.locator('#trustee-dialog-heading').evaluate((element) => ({
      color: getComputedStyle(element).color,
      weight: Number.parseInt(getComputedStyle(element).fontWeight, 10),
    }))
    assert.deepEqual(chairmanTitle, zanangTitleAppearance, 'Chairman and other profile names must share the same bold red style')
    await modal.getByRole('button', { name: 'Close trustee profile' }).click()
    await modal.waitFor({ state: 'hidden' })

    for (const card of await page.locator('.trustee-card').all()) {
      const name = await card.locator('.trustee-card-name').textContent()
      if (!['David Achugbu', founderProfile.name].includes(name)) {
        assert.equal(await card.locator('.trustee-card-role').count(), 0,
          'Generic trustee roles should not appear beneath ' + name)
      }
    }
    const pendingProfile = page.locator('.trustee-card').filter({ hasText: 'David Achugbu' })
    assert.equal(await pendingProfile.getByText('Secretary', { exact: true }).count(), 1, 'Secretary role must not repeat Board of Trustees')
    await pendingProfile.getByRole('button', { name: 'View Profile: David Achugbu' }).click()
    await modal.waitFor({ state: 'visible' })
    assert.equal(await modal.getByText('Secretary', { exact: true }).count(), 1, 'Secretary role must be concise in the modal')
    assert.equal(await modal.getByText(/Selected Profile/i).count(), 0, 'Do not show the redundant selected profile label')
    assert.equal(await modal.locator('.trustee-dialog-lede').count(), 0, 'Do not invent an opening biography for unapproved profiles')
    const secretaryTitle = await modal.locator('#trustee-dialog-heading').evaluate((element) => ({
      color: getComputedStyle(element).color,
      weight: Number.parseInt(getComputedStyle(element).fontWeight, 10),
    }))
    assert.deepEqual(secretaryTitle, zanangTitleAppearance, 'Secretary heading must use the same bold red treatment')
    await modal.getByText('A full biography will be added once approved by the Foundation.').waitFor()
    await page.keyboard.press('Escape')
    await modal.waitFor({ state: 'hidden' })
    await waitFor(() => page.evaluate(() => document.body.style.overflow === ''), 'Background scroll remains locked after closing the popup')
    const newlyApprovedBios = [
      {
        name: 'Raphael Anyanwu',
        firstSentence: 'Raphael Anyanwu is a software engineer with over six years of experience building backend systems and cloud applications.',
        remaining: ['Media.Monks', 'Kaunas University of Technology', 'Nigerian state and local government data'],
        paragraphCount: 3,
      },
      {
        name: '‘Cheeka’ Onyeka Chika, Esq.',
        firstSentence: '‘Cheeka’ Onyeka Chika is a Nigerian-qualified lawyer who advises and represents businesses across various sectors of the Nigerian economy.',
        remaining: ['founder of EnergyGrid', 'Nasdaq Entrepreneurial Center’s Milestone Makers programme'],
        paragraphCount: 3,
      },
    ]
    for (const profile of newlyApprovedBios) {
      await page.getByRole('button', { name: 'View Profile: ' + profile.name }).click()
      await modal.waitFor({ state: 'visible' })
      assert.equal(await modal.locator('.trustee-dialog-lede').textContent(), profile.firstSentence,
        'Approved first sentence missing for ' + profile.name)
      assert.equal(await modal.locator('.trustee-dialog-bio p').count(), profile.paragraphCount,
        'Approved full biography paragraphs missing for ' + profile.name)
      const fullText = await modal.locator('.trustee-dialog-bio').innerText()
      for (const phrase of profile.remaining) assert.ok(fullText.includes(phrase), profile.name + ' missing approved detail: ' + phrase)
      await page.keyboard.press('Escape')
      await modal.waitFor({ state: 'hidden' })
    }
    await page.goto(baseUrl + '/about/founders-message', { waitUntil: 'networkidle' })
    await page.getByRole('heading', { name: "Founder's Message", level: 1 }).waitFor()
    assert.ok((await page.locator('main, section').allTextContents()).join(' ').includes('The future we envision is achievable.'))
    await page.goto(baseUrl + '/volunteer-opportunities', { waitUntil: 'networkidle' })
    assert.ok((await page.getByRole('link', { name: 'Email your interest' }).getAttribute('href')).startsWith('mailto:info@otianofoundation.org'))
    await page.goto(baseUrl, { waitUntil: 'networkidle' })
    if (width < 1024) {
      const trigger = page.getByRole('button', { name: 'Open navigation menu' })
      await page.evaluate(() => window.scrollTo(0, 200))
      await trigger.click()
      const dialog = page.getByRole('dialog', { name: 'Explore the Foundation' })
      await dialog.waitFor()
      assert.equal(await trigger.getAttribute('aria-expanded'), 'true')
      assert.equal(await page.evaluate(() => document.body.style.position), 'fixed')
      await page.keyboard.press('Tab')
      assert.equal(await dialog.evaluate((el) => el.contains(document.activeElement)), true)
      const about = dialog.getByRole('button', { name: 'About', exact: true })
      await about.click()
      await waitFor(async () => (await about.getAttribute('aria-expanded')) === 'true', 'About did not expand')
      await dialog.getByRole('link', { name: 'Our Trustees', exact: true }).waitFor({ state: 'visible' })
      await page.screenshot({ path: output + '/' + width + '-menu.png' })
      await about.click()
      assert.equal(await about.getAttribute('aria-expanded'), 'false')
      await dialog.getByRole('button', { name: 'Get Involved', exact: true }).click()
      await page.locator('.mobile-navigation-scroll').evaluate((el) => { el.scrollTop = el.scrollHeight })
      const close = dialog.getByRole('button', { name: 'Close navigation menu' })
      const bounds = await close.boundingBox()
      assert.ok(bounds && bounds.y >= 0 && bounds.y + bounds.height <= 800, 'Close control scrolled offscreen')
      await assertNoOverflow(width + 'px open menu')
      await page.keyboard.press('Escape')
      await waitFor(() => page.locator('#mobile-navigation').evaluate((el) => !el.open), 'Escape did not close menu')
      assert.equal(await trigger.evaluate((el) => el === document.activeElement), true)
      await waitFor(() => page.evaluate(() => document.body.style.position !== 'fixed'), 'Body scroll stayed locked')
      assert.ok(Math.abs(await page.evaluate(() => window.scrollY) - 200) <= 1, 'Scroll position was not restored')
      await trigger.click()
      await dialog.getByRole('button', { name: 'What We Do', exact: true }).click()
      await dialog.getByRole('link', { name: 'Education', exact: true }).click()
      await page.waitForURL('**/education')
      await waitFor(() => page.locator('#mobile-navigation').evaluate((el) => !el.open), 'Link did not close menu')
      await trigger.click()
      await page.setViewportSize({ width: 1280, height: 800 })
      await waitFor(() => page.locator('#mobile-navigation').evaluate((el) => !el.open), 'Resizing to desktop did not close menu')
      await page.setViewportSize({ width, height: 800 })
    } else {
      const primary = page.getByRole('navigation', { name: 'Primary navigation' })
      const about = primary.getByRole('button', { name: 'About', exact: true })
      await about.focus()
      await page.keyboard.press('Enter')
      assert.equal(await about.getAttribute('aria-expanded'), 'true')
      await page.keyboard.press('Tab')
      assert.equal(await primary.getByRole('link', { name: 'Our Story', exact: true }).evaluate((el) => el === document.activeElement), true)
      await page.keyboard.press('Escape')
      assert.equal(await about.getAttribute('aria-expanded'), 'false')
      assert.equal(await about.evaluate((el) => el === document.activeElement), true)
    }
    // Registration remains usable on a short viewport and closes with Escape.
    await page.setViewportSize({ width, height: 568 })
    await page.goto(baseUrl + '/events/1', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Register Now' }).click()
    const registration = page.getByRole('dialog', { name: 'Register for Responsive layout QA event' })
    await registration.waitFor()
    await assertNoOverflow(width + 'px registration')
    await registration.getByLabel('Email *', { exact: true }).fill('qa@example.invalid')
    await page.keyboard.press('Escape')
    await registration.waitFor({ state: 'hidden' })
    console.log('Passed responsive and navigation checks at ' + width + 'px')
  }
  // Autoplay, pause, resume, keyboard selection and reduced motion are behavior checks.
  const heroPage = await context.newPage()
  await heroPage.clock.install()
  await heroPage.goto(baseUrl, { waitUntil: 'networkidle' })
  const rotatingHero = heroPage.getByRole('region', { name: 'Otiano Foundation highlights' })
  await heroPage.clock.fastForward(4100)
  assert.equal(await rotatingHero.getByRole('heading', { level: 1 }).textContent(), 'Development Starts With Listening', 'Slideshow did not auto-rotate')
  await rotatingHero.getByRole('button', { name: 'Pause slideshow' }).click()
  await heroPage.mouse.move(0, 0)
  await heroPage.clock.fastForward(11000)
  assert.equal(await rotatingHero.getByRole('heading', { level: 1 }).textContent(), 'Development Starts With Listening', 'Paused slideshow advanced')
  await rotatingHero.getByRole('button', { name: 'Start slideshow' }).click()
  await heroPage.mouse.move(0, 0)
  await heroPage.clock.fastForward(4100)
  assert.equal(await rotatingHero.getByRole('heading', { level: 1 }).textContent(), 'The Future Is Built Together', 'Slideshow did not resume')
  await rotatingHero.getByRole('button', { name: 'Show slide 1: Opportunity for All. Possibility Everywhere.' }).focus()
  await heroPage.keyboard.press('ArrowRight')
  assert.equal(await rotatingHero.getByRole('heading', { level: 1 }).textContent(), 'Opportunity for All. Possibility Everywhere.')
  // Keyboard focus may have paused rotation depending on focus-visible mode.
  // Restart only when the explicit Play control is shown.
  const resumeAfterKeyboard = rotatingHero.getByRole('button', { name: 'Start slideshow' })
  if (await resumeAfterKeyboard.count()) await resumeAfterKeyboard.click()
  // Manually choosing a slide with a pointer must not silently disable autoplay.
  await rotatingHero.getByRole('button', { name: 'Show slide 1: Opportunity for All. Possibility Everywhere.' }).click()
  await heroPage.mouse.move(0, 0)
  assert.equal(await rotatingHero.getByRole('heading', { level: 1 }).textContent(), 'Opportunity for All. Possibility Everywhere.')
  await heroPage.clock.fastForward(4100)
  assert.equal(await rotatingHero.getByRole('heading', { level: 1 }).textContent(), 'Development Starts With Listening',
     'Homepage slideshow must keep auto-advancing after pointer selection')
  await heroPage.close()

  // Short phones keep the lead call to action visible immediately.
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  const leadAction = await page.getByRole('region', { name: 'Otiano Foundation highlights' }).getByRole('link', { name: 'Discover Our Story', exact: false }).boundingBox()
  assert.ok(leadAction && leadAction.y >= 80 && leadAction.y + leadAction.height <= 568, 'Lead hero CTA is below the first screen')
  await page.screenshot({ path: output + '/320-short-home.png' })

  // Empty news/event states offer a useful next step without invented records.
  const emptyPage = await context.newPage()
  await emptyPage.route('**/api/*.php*', (route) => route.fulfill({ json: { data: [] }, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' } }))
  for (const route of ['/latest-news', '/events']) {
    await emptyPage.goto(baseUrl + route, { waitUntil: 'networkidle' })
    assert.equal(await emptyPage.getByRole('link', { name: 'Contact the Foundation', exact: false }).count() > 0, true)
    const copy = await emptyPage.locator('body').innerText()
    assert.ok(!/coming soon|no past events yet/i.test(copy))
  }
  await emptyPage.close()

  // Verify that reduced-motion preferences keep all controls usable.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  assert.equal(await page.getByRole('button', { name: /slideshow/ }).count(), 0, 'Reduced motion still enables autoplay')
  await page.getByRole('button', { name: 'Show slide 2: Development Starts With Listening', exact: true }).click()
  assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Development Starts With Listening')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await page.getByRole('button', { name: 'Close navigation menu' }).click()
  await waitFor(() => page.locator('#mobile-navigation').evaluate((el) => !el.open), 'Reduced-motion close failed')
  assert.deepEqual(runtimeErrors, [], 'Browser runtime errors')
} finally {
  await browser.close()
}
