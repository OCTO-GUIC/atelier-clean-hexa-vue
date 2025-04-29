import type { WeaponsRepository } from '../ports/weapons.repository'
import { Weapons } from '../getAllWeapons.usecase'

export class WeaponsRepositoryInMemory implements WeaponsRepository {
  getAllWeapons(): Promise<Weapons[]> {
    return Promise.resolve<Weapons[]>([
      new Weapons('arc', 'Arc en bois pas ouf', 'arc.png', 100),
      new Weapons('sword', 'Epée de boisaille', 'epee.png', 300),
      new Weapons('masse', 'Massue gneu gneu taper', 'massue.png', 1200),
    ])
  }
}
