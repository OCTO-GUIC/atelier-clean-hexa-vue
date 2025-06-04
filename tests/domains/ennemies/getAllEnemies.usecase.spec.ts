import { describe, it, expect, vi } from 'vitest'
import { Enemy, GetAllEnnemies } from '@/domains/enemies/getAllEnemies.usecase'
import type { EnemiesRepository } from '@/domains/enemies/ports/enemies.repository'
import type { EnemiesPresenter } from '@/domains/enemies/ports/enemies.presenter'

describe('GetAllEnnemies', () => {
  it('should retrieve and present all enemies', async () => {
    // GIVEN
    const mockEnemies = [
      new Enemy('Goblin', 'goblin.jpg', 50, 100, true),
      new Enemy('Dragon', 'dragon.jpg', 100, 200, true),
    ]
    const strengthOfSoldier = 75

    const mockRepository: EnemiesRepository = {
      getAllEnnemies: vi.fn().mockResolvedValue(mockEnemies),
      saveEnemy: vi.fn(),
    }

    const mockPresenter: EnemiesPresenter = {
      present: vi.fn(),
    }

    const usecase = new GetAllEnnemies(mockRepository)

    // WHEN
    await usecase.execute(strengthOfSoldier, mockPresenter)

    // THEN
    expect(mockRepository.getAllEnnemies).toHaveBeenCalled()
    expect(mockPresenter.present).toHaveBeenCalledWith(mockEnemies, strengthOfSoldier)
  })

  it('should handle empty enemies list', async () => {
    // GIVEN
    const strengthOfSoldier = 50
    const mockRepository: EnemiesRepository = {
      getAllEnnemies: vi.fn().mockResolvedValue([]),
      saveEnemy: vi.fn(),
    }

    const mockPresenter: EnemiesPresenter = {
      present: vi.fn(),
    }

    const usecase = new GetAllEnnemies(mockRepository)

    // WHEN
    await usecase.execute(strengthOfSoldier, mockPresenter)

    // THEN
    expect(mockRepository.getAllEnnemies).toHaveBeenCalled()
    expect(mockPresenter.present).toHaveBeenCalledWith([], strengthOfSoldier)
  })

  it('should handle repository errors', async () => {
    // GIVEN
    const strengthOfSoldier = 100
    const mockRepository: EnemiesRepository = {
      getAllEnnemies: vi.fn().mockRejectedValue(new Error('Repository error')),
      saveEnemy: vi.fn(),
    }

    const mockPresenter: EnemiesPresenter = {
      present: vi.fn(),
    }

    const usecase = new GetAllEnnemies(mockRepository)

    // WHEN / THEN
    await expect(usecase.execute(strengthOfSoldier, mockPresenter)).rejects.toThrow('Repository error')
    expect(mockPresenter.present).not.toHaveBeenCalled()
  })
})
