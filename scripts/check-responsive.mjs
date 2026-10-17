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
        const image = page.locator('.founders-message-hero-image')
        assert.equal(await image.count(), 1, 'Founder’s Message should display its new hero photo')
        assert.ok((await image.getAttribute('src')).includes('trustees-hero-'), 'Founder’s Message should use the former Trustees photo')
        assert.equal(await page.locator('.founders-message-hero figure').count(), 0, 'Previous Founder’s Message portrait should no longer appear in its hero')
      }
      if (route === '/about/trustees') {
        const image = page.locator('.trustees-hero-image')
        assert.equal(await image.count(), 1, 'Trustees page must display a hero photograph')
        assert.ok((await image.getAttribute('src')).includes('trustees-hero-'), 'Trustees should reuse the unchanged Founder’s Message background')
        assert.equal(await page.getByRole('heading', { level: 1, name: 'Meet Our Board of Trustees' }).count(), 1)
        assert.equal(await page.locator('.trustee-card').count(), 7, 'Seven board members should be displayed')
      }
      if (['/', '/education', '/about/founders-message', '/about/trustees'].includes(route)) {
        await page.screenshot({ path: output + '/' + width + '-' + (route === '/' ? 'home' : route.replaceAll('/', '-')) + '.png', fullPage: true })
      }
    }
    await page.goto(baseUrl, { waitUntil: 'networkidle' })
    // Every slide keeps its approved copy, link, accessible state, and layout.
    const hero = page.getByRole('region', { name: 'Otiano Foundation highlights' })
    const heroSlides = [
      ['Opportunity for All • Possibility Everywhere', 'Read Our Story', '/about/our-story'],
      ['Education', 'Explore Education', '/education'],
      ['Healthcare', 'Explore Healthcare', '/healthcare'],
      ['Community Impact', 'View Activities', '#activities'],
    ]
    for (let index = 0; index < heroSlides.length; index++) {
      const [title, button, href] = heroSlides[index]
      await hero.getByRole('button', { name: 'Show slide ' + (index + 1) + ': ' + title, exact: true }).click()
      assert.equal(await hero.getByRole('heading', { level: 1 }).textContent(), title)
      assert.equal(await hero.getByRole('link', { name: button, exact: false }).getAttribute('href'), href)
      assert.equal(await hero.getByRole('group', { name: 'Choose a highlight' }).locator('[aria-current="true"]').count(), 1)
      assert.equal(await hero.getByRole('link').count(), 1, 'Inactive slide links remained accessible')
      assert.equal(await page.locator('.landing-slide:visible').count(), 1, 'Carousel displayed overlapping slide text')
      assert.equal(await hero.locator('.landing-caption').count(), 0, 'Illustrative caption should not appear')
      await assertNoOverflow(width + 'px slide ' + (index + 1))
      await page.screenshot({ path: output + '/' + width + '-slide-' + (index + 1) + '.png' })
    }
    const messageCta = page.getByRole('link', { name: "Founder's Message" })
    assert.equal(await messageCta.getAttribute('href'), '/about/founders-message', 'Founder CTA should open the original Founder’s Message')
    await messageCta.click()
    await page.waitForURL('**/about/founders-message')
    await page.getByRole('heading', { level: 1, name: "Founder's Message" }).waitFor()
    await page.goto(baseUrl, { waitUntil: 'networkidle' })
    await hero.getByRole('button', { name: 'Show slide 4: Community Impact', exact: true }).click()
    const pillarButtons = page.locator('#our-work a.ofd-button')
    assert.equal(await pillarButtons.count(), 4)
    for (const button of await pillarButtons.all()) {
      assert.ok((await button.textContent()).trim().startsWith('Explore'), 'Pillar button should be labeled Explore')
    }
    await hero.getByRole('link', { name: 'View Activities' }).click()
    assert.equal(await page.evaluate(() => location.hash), '#activities')
    assert.equal(await page.locator('#activities').count(), 1)
    assert.equal(await page.locator('#activities').getByRole('heading', { name: 'Documented activity updates' }).count(), 1)
    assert.equal(await page.locator('footer a[href="#"]').count(), 0)
    await page.goto(baseUrl + '/about/trustees', { waitUntil: 'networkidle' })
    assert.equal(await page.locator('.trustee-card').count(), 7)
    assert.equal(await page.locator('.trustee-profile-button').count(), 7, 'Every board card needs a View Profile button')
    if (width <= 430) {
      const label = await page.locator('.trustees-board-label').boundingBox()
      const hero = await page.locator('.trustees-hero').boundingBox()
      const photo = await page.locator('.trustee-photo-frame').first().boundingBox()
      assert.ok(hero && hero.height >= 700, 'Mobile hero should occupy the first screen')
      assert.ok(label && label.height >= 255, 'Board of Trustees introduction must have a padded gray panel')
      assert.ok(label.y >= hero.y + hero.height + 35, 'Gray introduction must have breathing space below the hero')
      assert.ok(photo && photo.y >= 800, 'Trustee photos must be below the first mobile screen')
      assert.ok(photo.y >= label.y + label.height + 35, 'Cards must start below the gray board panel')
      await page.screenshot({ path: output + '/' + width + '-trustees-tall-label.png' })
    }

    const modal = page.locator('dialog.trustee-profile-dialog')
    const zanangCard = page.locator('.trustee-card').filter({ has: page.getByRole('heading', { name: 'Miss Zanang Diana Awan', exact: true }) })
    assert.equal(await zanangCard.getByText('Trustee', { exact: true }).count(), 1)
    const zanangButton = zanangCard.getByRole('button', { name: 'View Profile: Miss Zanang Diana Awan' })
    await zanangButton.click()
    await modal.waitFor({ state: 'visible' })
    assert.equal(await modal.getByRole('heading', { name: 'Miss Zanang Diana Awan' }).count(), 1)
    assert.equal(await modal.locator('.trustee-dialog-bio p').count(), 2)
    assert.ok((await modal.locator('.trustee-dialog-bio').innerText()).includes('American University of Nigeria'))
    assert.ok((await modal.locator('.trustee-dialog-bio').innerText()).includes('stronger, more resilient communities.'))
    assert.deepEqual(
      await modal.locator('.trustee-dialog-bio').evaluate((node) => [...node.children].map((el) => el.tagName)),
      ['P', 'IMG', 'P'],
      'Biography must lead with text, followed by the approved photo and the remaining copy'
    )
    assert.ok(await modal.locator('.trustee-dialog-portrait').evaluate((img) => img.complete && img.naturalWidth > 0), 'Approved portrait missing from pop-up')
    const compactButton = await zanangButton.boundingBox()
    assert.ok(compactButton && compactButton.width <= 155, 'View Profile button is not compact')
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
    assert.deepEqual(await modal.locator('.trustee-dialog-bio p').allTextContents(), founderProfile.bio, 'Approved Chairman bio changed')
    await modal.getByRole('button', { name: 'Close trustee profile' }).click()
    await modal.waitFor({ state: 'hidden' })

    const pendingProfile = page.locator('.trustee-card').filter({ hasText: 'David Achugbu' })
    await pendingProfile.getByRole('button', { name: 'View Profile: David Achugbu' }).click()
    await modal.waitFor({ state: 'visible' })
    await modal.getByText('A full biography will be added once approved by the Foundation.').waitFor()
    await page.keyboard.press('Escape')
    await modal.waitFor({ state: 'hidden' })
    await waitFor(() => page.evaluate(() => document.body.style.overflow === ''), 'Background scroll remains locked after closing the popup')
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
  await heroPage.clock.fastForward(7100)
  assert.equal(await rotatingHero.getByRole('heading', { level: 1 }).textContent(), 'Education', 'Slideshow did not auto-rotate')
  await rotatingHero.getByRole('button', { name: 'Pause slideshow' }).click()
  await heroPage.mouse.move(0, 0)
  await heroPage.clock.fastForward(15000)
  assert.equal(await rotatingHero.getByRole('heading', { level: 1 }).textContent(), 'Education', 'Paused slideshow advanced')
  await rotatingHero.getByRole('button', { name: 'Start slideshow' }).click()
  await heroPage.mouse.move(0, 0)
  await heroPage.clock.fastForward(7100)
  assert.equal(await rotatingHero.getByRole('heading', { level: 1 }).textContent(), 'Healthcare', 'Slideshow did not resume')
  await rotatingHero.getByRole('button', { name: 'Show slide 1: Opportunity for All • Possibility Everywhere' }).focus()
  await heroPage.keyboard.press('ArrowRight')
  assert.equal(await rotatingHero.getByRole('heading', { level: 1 }).textContent(), 'Community Impact')
  await heroPage.close()

  // Short phones keep the lead call to action visible immediately.
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  const leadAction = await page.getByRole('region', { name: 'Otiano Foundation highlights' }).getByRole('link', { name: 'Read Our Story', exact: false }).boundingBox()
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
  await page.getByRole('button', { name: 'Show slide 2: Education', exact: true }).click()
  assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Education')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await page.getByRole('button', { name: 'Close navigation menu' }).click()
  await waitFor(() => page.locator('#mobile-navigation').evaluate((el) => !el.open), 'Reduced-motion close failed')
  assert.deepEqual(runtimeErrors, [], 'Browser runtime errors')
} finally {
  await browser.close()
}
