export interface ShopRepository {
  buyWeapon(price: number, strength: number): Promise<void>
}
