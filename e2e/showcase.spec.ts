import { test, expect } from '@playwright/test'
import { showcasePageSeo } from '../src/content/seo'

test.describe('Showcase page route', () => {
  test('direct navigation returns 200 and renders accessible placeholder', async ({ page }) => {
    const response = await page.goto('/showcase')

    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL('/showcase')
    await expect(page.getByRole('heading', { level: 1, name: showcasePageSeo.title })).toBeVisible()
    await expect(page.getByText(showcasePageSeo.description)).toBeVisible()
    await expect(page.locator('section[aria-labelledby="showcase-heading"]')).toBeVisible()
    await expect(page).toHaveTitle(new RegExp(showcasePageSeo.title, 'i'))
  })

  test('desktop primary nav links to showcase without full reload', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

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
    await page.goto('/')

    await page.getByRole('button', { name: 'Open navigation menu' }).click()

    const mobileNav = page.getByRole('navigation', { name: 'Mobile' })
    const showcaseLink = mobileNav.getByRole('link', { name: 'Showcase' })

    await expect(showcaseLink).toBeVisible()
    await showcaseLink.click()

    await expect(page).toHaveURL('/showcase')
    await expect(page.getByRole('heading', { level: 1, name: showcasePageSeo.title })).toBeVisible()
  })

  test('footer showcase link navigates to bookmarkable route', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('navigation', { name: 'Footer' }).getByRole('link', { name: 'Showcase' }).click()

    await expect(page).toHaveURL('/showcase')

    await page.reload()

    await expect(page).toHaveURL('/showcase')
    await expect(page.getByRole('heading', { level: 1, name: showcasePageSeo.title })).toBeVisible()
  })

  test('showcase link is reachable via keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    const showcaseLink = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', {
      name: 'Showcase',
    })

    await showcaseLink.focus()
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL('/showcase')
    await expect(page.getByRole('heading', { level: 1, name: showcasePageSeo.title })).toBeVisible()
  })
})
