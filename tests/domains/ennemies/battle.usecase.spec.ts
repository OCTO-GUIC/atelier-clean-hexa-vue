import { describe, it, expect, vi } from 'vitest'
import { Enemy } from '@/domains/enemies/getAllEnemies.usecase'
import { BattleUsecase } from '@/domains/enemies/battle.usecase'
import type { EnemiesRepository } from '@/domains/enemies/ports/enemies.repository'
import type { EventBus } from '@/shell/eventBus'
import type { EnemyEventMap } from '@/domains/enemies/enemy.eventBus'

describe('BattleUsecase', () => {
  it('should attack enemy and publish event when enemy dies', async () => {
    // GIVEN
    const enemy = new Enemy('Goblin', 'goblin.jpg', 50, 100, true)
    const mockEnemies = [enemy]

    const mockRepository: EnemiesRepository = {
      getAllEnnemies: vi.fn().mockResolvedValue(mockEnemies),
      saveEnemy: vi.fn(),
    }

    const mockEventBus: EventBus<EnemyEventMap> = {
      publish: vi.fn(),
      subscribe: vi.fn(),
    }

    const usecase = new BattleUsecase(mockRepository, mockEventBus)
    const soldierStrenght = 60

    // WHEN
    await usecase.execute('Goblin', soldierStrenght)

    // THEN
    expect(mockRepository.getAllEnnemies).toHaveBeenCalled()
    expect(mockRepository.saveEnemy).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Goblin',
      alive: false,
    }))
    expect(mockEventBus.publish).toHaveBeenCalledWith('enemyBattle', '')
  })

  it('should attack enemy and publish event when enemy survives', async () => {
    // GIVEN
    const enemy = new Enemy('Dragon', 'dragon.jpg', 100, 200, true)
    const mockEnemies = [enemy]

    const mockRepository: EnemiesRepository = {
      getAllEnnemies: vi.fn().mockResolvedValue(mockEnemies),
      saveEnemy: vi.fn(),
    }

    const mockEventBus: EventBus<EnemyEventMap> = {
      publish: vi.fn(),
      subscribe: vi.fn(),
    }

    const usecase = new BattleUsecase(mockRepository, mockEventBus)
    const soldierStrenght = 40

    // WHEN
    await usecase.execute('Dragon', soldierStrenght)

    // THEN
    expect(mockRepository.getAllEnnemies).toHaveBeenCalled()
    expect(mockRepository.saveEnemy).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Dragon',
      alive: true,
    }))
    expect(mockEventBus.publish).toHaveBeenCalledWith('enemyBattle', '')
  })

  it('should handle enemy not found', async () => {
    // GIVEN
    const mockRepository: EnemiesRepository = {
      getAllEnnemies: vi.fn().mockResolvedValue([]),
      saveEnemy: vi.fn(),
    }

    const mockEventBus: EventBus<EnemyEventMap> = {
      publish: vi.fn(),
      subscribe: vi.fn(),
    }

    const usecase = new BattleUsecase(mockRepository, mockEventBus)

    // WHEN / THEN
    await expect(usecase.execute('NonExistentEnemy', 50))
      .rejects.toThrow(TypeError)
    expect(mockEventBus.publish).not.toHaveBeenCalled()
  })
})
