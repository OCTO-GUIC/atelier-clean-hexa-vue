export interface ShopRepository {
  buyWeapon(soldierId: string, weaponId:string, price: number, strength): Promise<void>;
}
