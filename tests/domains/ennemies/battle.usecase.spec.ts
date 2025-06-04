import { describe, expect, it, vi } from 'vitest'
import { Enemy } from '@/domains/enemies/getAllEnemies.usecase'
import { BattleUsecase } from '@/domains/enemies/battle.usecase'
import type { EnemiesRepository } from '@/domains/enemies/ports/enemies.repository'
import { EventBus } from '@/shell/eventBus.ts'
import type { EnemyEventMap } from '@/domains/enemies/enemy.eventBus'

class MockEnemyEventBus extends EventBus<EnemyEventMap> {
  publish = vi.fn()
  subscribe = vi.fn()
  protected eventSubscribers: Record<
    keyof EnemyEventMap,
    {
      subscriberName: string
      callback: (data: EnemyEventMap[keyof EnemyEventMap]) => void
    }[]
  > = {
    enemyBattle: [],
  }
}

describe('BattleUsecase', () => {
  it('should attack enemy and publish event when enemy dies', async () => {
    // GIVEN
    const enemy = new Enemy('Goblin', 'goblin.jpg', 50, 100, true)
    const mockEnemies = [enemy]

    const mockRepository: EnemiesRepository = {
      getAllEnnemies: vi.fn().mockResolvedValue(mockEnemies),
      saveEnemy: vi.fn(),
    }

    const mockEventBus: EventBus<EnemyEventMap> = new MockEnemyEventBus()

    const usecase = new BattleUsecase(mockRepository, mockEventBus)
    const soldierStrenght = 60

    // WHEN
    await usecase.execute('Goblin', soldierStrenght)

    // THEN
    expect(mockRepository.getAllEnnemies).toHaveBeenCalled()
    expect(mockRepository.saveEnemy).toHaveBeenCalledWith(
      new Enemy('Goblin', 'goblin.jpg', 50, 100, false),
    )
    expect(mockEventBus.publish).toHaveBeenCalledWith('enemyBattle')
  })

  it('should attack enemy and publish event when enemy survives', async () => {
    // GIVEN
    const enemy = new Enemy('Dragon', 'dragon.jpg', 100, 200, true)
    const mockEnemies = [enemy]

    const mockRepository: EnemiesRepository = {
      getAllEnnemies: vi.fn().mockResolvedValue(mockEnemies),
      saveEnemy: vi.fn(),
    }

    const mockEventBus: EventBus<EnemyEventMap> = new MockEnemyEventBus()

    const usecase = new BattleUsecase(mockRepository, mockEventBus)
    const soldierStrenght = 40

    // WHEN
    await usecase.execute('Dragon', soldierStrenght)

    // THEN
    expect(mockRepository.getAllEnnemies).toHaveBeenCalled()
    expect(mockRepository.saveEnemy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Dragon',
        alive: true,
      }),
    )
    expect(mockEventBus.publish).toHaveBeenCalledWith('enemyBattle')
  })

  it('should handle enemy not found', async () => {
    // GIVEN
    const mockRepository: EnemiesRepository = {
      getAllEnnemies: vi.fn().mockResolvedValue([]),
      saveEnemy: vi.fn(),
    }

    const mockEventBus: EventBus<EnemyEventMap> = new MockEnemyEventBus()

    const usecase = new BattleUsecase(mockRepository, mockEventBus)

    // WHEN / THEN
    await expect(usecase.execute('NonExistentEnemy', 50)).rejects.toThrow(TypeError)
    expect(mockEventBus.publish).not.toHaveBeenCalled()
  })
})
