import { describe, expect, it, vi } from 'vitest'
import { GetSoldierUsecase, Soldier } from '@/domains/soldier/getSoldier.usecase.ts'
import type { SoldierRepository } from '@/domains/soldier/ports/soldier.repository.ts'
import { SoldierPresenterImpl } from '@/domains/soldier/adapters/soldier.presenter.impl.ts'

describe('GetSoldierUsecase', () => {
  it('should get a soldier from repository and present it', () => {
    // Arrange
    const soldier = new Soldier(100, 10)
    const mockRepository: SoldierRepository = {
      getSoldier: vi.fn().mockReturnValue(soldier)
    }
    const callback = vi.fn()
    const presenter = new SoldierPresenterImpl(callback)
    const usecase = new GetSoldierUsecase(mockRepository)

    // Act
    usecase.execute(presenter)

    // Assert
    expect(mockRepository.getSoldier).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith({
      gold: 100,
      strength: 10
    })
  })
})

