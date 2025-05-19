import type { WeaponsRepository } from '../ports/weapons.repository'
import { Weapons } from '../getAllWeapons.usecase'

export class WeaponsRepositoryInMemory implements WeaponsRepository {
  getAllWeapons(): Promise<Weapons[]> {
    return Promise.resolve<Weapons[]>([
      new Weapons('arc', 'Arc en bois pas ouf', 'communsword.png', 100, 10),
      new Weapons('sword', 'Epée de boisaille', 'epicsword.png', 300, 50),
      new Weapons('masse', 'Massue  gneu taper', 'uniquesword.png', 1200, 100),
    ])
  }
}
