import { test, expect } from '@playwright/test'

test.describe('Game Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
  })

  test('should update gold and strength after weapon purchase', async ({ page }) => {
    const headerDivs = page.locator('header div')
    await headerDivs.first().waitFor({ state: 'visible' })

    const initialGold = Number((await headerDivs.first().innerText()).trim())
    const initialStrength = Number((await headerDivs.nth(1).innerText()).trim())

    const weaponCard = page.locator('.shopCard').first()
    await weaponCard.waitFor({ state: 'visible' })

    const priceElement = weaponCard.locator('.shopCard__price')
    const weaponPrice = Number((await priceElement.innerText()).replace(/\D/g, ''))

    await weaponCard.locator('button').click()

    await expect(async () => {
      const newGold = Number((await headerDivs.first().innerText()).trim())
      return newGold === initialGold - weaponPrice
    }).toPass({ timeout: 5000 })

    const newStrength = Number((await headerDivs.nth(1).innerText()).trim())
    expect(newStrength).toBeGreaterThan(initialStrength)
  })

  test('should handle battle with enemies', async ({ page }) => {
    const battleButton = page.getByText('Battle')
    await battleButton.waitFor({ state: 'visible' })
    await battleButton.click()

    await page.waitForLoadState('networkidle')

    const enemy = page.locator('.ennemy').first()
    await expect(enemy).toBeVisible({ timeout: 10000 })

    // Sélection du premier badge contenant uniquement un nombre
    const healthBadge = enemy.locator('.badge').first()
    await expect(healthBadge).toBeVisible()
    const healthBefore = Number((await healthBadge.innerText()).trim())

    const attackButton = enemy.getByRole('button', { name: 'Attaquer' })
    await attackButton.click()

    await expect(async () => {
      const healthAfter = Number((await healthBadge.innerText()).trim())
      return healthAfter < healthBefore
    }).toPass({ timeout: 5000 })
  })

  test('should disable buy button for expensive weapons', async ({ page }) => {
    const headerGold = page.locator('header div').first()
    await headerGold.waitFor({ state: 'visible' })
    const currentGold = Number((await headerGold.innerText()).trim())

    const shopCards = page.locator('.shopCard')
    await shopCards.first().waitFor({ state: 'visible' })

    const allShopCards = await shopCards.all()
    for (const card of allShopCards) {
      const priceText = await card.locator('.shopCard__price').innerText()
      const price = Number(priceText.replace(/\D/g, ''))
      const buyButton = card.locator('button')

      if (price > currentGold) {
        await expect(buyButton).toBeDisabled()
      } else {
        await expect(buyButton).toBeEnabled()
      }
    }
  })
})
