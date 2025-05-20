import { test, expect } from '@playwright/test'

test.describe('Game Flow', () => {
  test('should update gold and strength after weapon purchase', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('header')

    const initialGold = parseInt(await page.locator('header div').first().innerText())
    const initialStrength = parseInt(await page.locator('header div').nth(1).innerText())

    const shopCard = page.locator('.shopCard').first()
    await shopCard.waitFor()
    await shopCard.locator('button').click()

    const newGold = parseInt(await page.locator('header div').first().innerText())
    const newStrength = parseInt(await page.locator('#app > header > div > div:nth-child(2)').innerText())

    expect(newGold).toEqual(900)
    expect(newStrength).toEqual(10)
  })

  test('should disable buy button for expensive weapons', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('div:has-text("Chargement en cours ...")'))
      .not.toBeVisible({ timeout: 5000 })
    await page.waitForSelector('.shopCard')

    const gold = parseInt(await page.locator('header div').first().innerText())
    const cards = await page.locator('.shopCard').all()

    for (const card of cards) {
      const priceText = await card.locator('.shopCard__price').innerText()
      const price = parseInt(priceText.replace(/\D/g, ''))
      const button = card.locator('button')

      if (price > gold) {
        await expect(button).toBeDisabled()
      } else {
        await expect(button).toBeEnabled()
      }
    }
  })

  test('should handle battle with enemies', async ({ page }) => {
    await page.goto('/')

    // D'abord acheter une arme
    await page.waitForSelector('.shopCard')
    const shopCard = page.locator('.shopCard').first()
    await shopCard.waitFor()
    await shopCard.locator('button').click()

    // Ensuite aller au combat
    await page.getByText('Battle').click()

    await page.waitForSelector('.ennemy')
    const enemy = page.locator('.ennemy').first()
    await enemy.waitFor({ state: 'visible' })

    const healthBadge = enemy.locator('.badge').first()
    await healthBadge.waitFor()


    const attackButton = enemy.getByText('Attaquer')
    await attackButton.click()
    await expect(page.locator('#app > main > div > div > div:nth-child(1) > div.container > button')).toHaveText('Mort')

  })
})
