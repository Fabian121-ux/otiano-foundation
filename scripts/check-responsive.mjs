import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

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
      if (['/', '/education', '/about/founders-message', '/about/trustees'].includes(route)) {
        await page.screenshot({ path: output + '/' + width + '-' + (route === '/' ? 'home' : route.replaceAll('/', '-')) + '.png', fullPage: true })
      }
    }
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
  // Verify that reduced-motion preferences keep all controls usable.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await page.getByRole('button', { name: 'Close navigation menu' }).click()
  await waitFor(() => page.locator('#mobile-navigation').evaluate((el) => !el.open), 'Reduced-motion close failed')
  assert.deepEqual(runtimeErrors, [], 'Browser runtime errors')
} finally {
  await browser.close()
}
