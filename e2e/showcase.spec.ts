import { test, expect, type Page, type Response } from '@playwright/test'
import { profile } from '../src/content/profile'
import { showcasePageSeo } from '../src/content/seo'

async function gotoWithRetry(page: Page, url: string): Promise<Response | null> {
  const maxAttempts = 3

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 })
    } catch (error) {
      if (attempt === maxAttempts) throw error
      await page.waitForTimeout(500 * attempt)
    }
  }

  return null
}

async function gotoHomePage(page: Page) {
  await gotoWithRetry(page, '/')
  await expect(page.getByRole('navigation', { name: 'Footer' })).toBeVisible({ timeout: 30_000 })
}

async function gotoHomePageDesktop(page: Page) {
  await gotoHomePage(page)
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
}

async function gotoHomePageMobile(page: Page) {
  await gotoHomePage(page)
  await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeVisible()
}

async function gotoShowcasePage(page: Page) {
  const response = await gotoWithRetry(page, '/showcase')
  await expect(page.getByRole('heading', { level: 1, name: showcasePageSeo.title })).toBeVisible()
  return response
}

async function getFooterSnapshot(page: Page) {
  const footer = page.getByRole('contentinfo')
  await footer.scrollIntoViewIfNeeded()
  await expect(footer).toBeVisible()
  await expect(footer.getByText(profile.name, { exact: true })).toBeVisible()
  await expect(footer.getByText(profile.headline)).toBeVisible()
  await expect(footer.getByText(/All rights reserved/i)).toBeVisible()
  return footer.innerText()
}

test.describe('Showcase page route', () => {
  test('showcase page renders the same footer as the home page', async ({ page }) => {
    await gotoHomePage(page)
    const homeFooter = await getFooterSnapshot(page)

    await gotoShowcasePage(page)
    const showcaseFooter = await getFooterSnapshot(page)

    expect(showcaseFooter).toBe(homeFooter)
  })

  test('direct navigation returns 200 and renders accessible placeholder', async ({ page }) => {
    const response = await gotoShowcasePage(page)

    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL('/showcase')
    await expect(page.getByRole('heading', { level: 1, name: showcasePageSeo.title })).toBeVisible()
    await expect(page.getByText(showcasePageSeo.description)).toBeVisible()
    await expect(page.locator('section[aria-labelledby="showcase-heading"]')).toBeVisible()
    await expect(page).toHaveTitle(new RegExp(showcasePageSeo.title, 'i'))
    await expect(page.getByRole('navigation', { name: 'Footer' })).toBeVisible()
  })

  test('desktop primary nav links to showcase without full reload', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await gotoHomePageDesktop(page)

    const primaryNav = page.getByRole('navigation', { name: 'Primary' })
    const showcaseLink = primaryNav.getByRole('link', { name: 'Showcase' })

    await expect(showcaseLink).toBeVisible()
    await showcaseLink.click()

    await expect(page).toHaveURL('/showcase')
    await expect(page.getByRole('heading', { level: 1, name: showcasePageSeo.title })).toBeVisible()
    await expect(primaryNav.getByRole('link', { name: 'Showcase' })).toHaveAttribute('aria-current', 'page')
  })

  test('mobile navigation includes showcase link', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoHomePageMobile(page)

    await page.getByRole('button', { name: 'Open navigation menu' }).click()

    const mobileNav = page.getByRole('navigation', { name: 'Mobile' })
    const showcaseLink = mobileNav.getByRole('link', { name: 'Showcase' })

    await expect(showcaseLink).toBeVisible()
    await showcaseLink.click()

    await expect(page).toHaveURL('/showcase')
    await expect(page.getByRole('heading', { level: 1, name: showcasePageSeo.title })).toBeVisible()
  })

  test('footer showcase link navigates to bookmarkable route', async ({ page }) => {
    await gotoHomePage(page)

    const footer = page.getByRole('contentinfo')
    await footer.scrollIntoViewIfNeeded()
    await footer.getByRole('link', { name: 'Showcase' }).click()

    await expect(page).toHaveURL('/showcase')

    await page.reload({ waitUntil: 'domcontentloaded' })

    await expect(page).toHaveURL('/showcase')
    await expect(page.getByRole('heading', { level: 1, name: showcasePageSeo.title })).toBeVisible()
  })

  test('showcase link is reachable via keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await gotoHomePageDesktop(page)

    const showcaseLink = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', {
      name: 'Showcase',
    })

    await showcaseLink.focus()
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL('/showcase')
    await expect(page.getByRole('heading', { level: 1, name: showcasePageSeo.title })).toBeVisible()
  })
})
