import type { WeaponsRepository } from '@/domains/weapons/ports/weapons.repository.ts'
import { Weapons } from '@/domains/weapons/getAllWeapons.usecase.ts'

export class WeaponsRepositoryInMemory implements WeaponsRepository {
  getAllWeapons(): Promise<Weapons[]> {
    return Promise.resolve<Weapons[]>([
      new Weapons('sword_pas_ouf', 'Épée en bois pas ouf', 'communsword.png', 100, 10),
      new Weapons('sword', 'Epée de boisaille', 'epicsword.png', 300, 50),
      new Weapons('epic_sword', 'Épée epic gneu taper', 'uniquesword.png', 600, 100),
    ])
  }
}
